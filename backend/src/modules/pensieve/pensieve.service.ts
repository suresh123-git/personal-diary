import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiaryEntry, DiaryEntryDocument } from '../../schemas/diary-entry.schema';
import { AiConversation, AiConversationDocument } from '../../schemas/ai-conversation.schema';
import { AskPensieveDto } from './dto/ask-pensieve.dto';

@Injectable()
export class PensieveService {
  constructor(
    @InjectModel(DiaryEntry.name) private diaryModel: Model<DiaryEntryDocument>,
    @InjectModel(AiConversation.name) private conversationModel: Model<AiConversationDocument>,
  ) {}

  async exploreMemories(userId: string, dto: AskPensieveDto) {
    const { query, conversationId } = dto;

    // Retrieve relevant entries using MongoDB text / regex search
    const searchTerms = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const regexPattern = searchTerms.join('|') || query;

    const relevantEntries = await this.diaryModel
      .find({
        userId,
        isArchived: false,
        $or: [
          { title: { $regex: regexPattern, $options: 'i' } },
          { plainTextContent: { $regex: regexPattern, $options: 'i' } },
          { tags: { $in: [new RegExp(regexPattern, 'i')] } },
          { mood: { $regex: regexPattern, $options: 'i' } },
        ],
      })
      .sort({ date: -1 })
      .limit(6)
      .exec();

    // Prepare grounded answer & sources
    let answerText = '';
    const sources = relevantEntries.map((e) => ({
      entryId: e._id as any,
      title: e.title,
      date: e.date,
    }));

    if (relevantEntries.length === 0) {
      // Fallback if no entries found
      const recentCount = await this.diaryModel.countDocuments({ userId, isArchived: false });
      if (recentCount === 0) {
        answerText = "Your Pensieve is currently empty. Begin writing your diary entries, and I shall help you explore your memories here.";
      } else {
        answerText = `I searched your magical archives for "${query}", but found no matching diary entries. Try asking about a specific event, mood, or timeframe!`;
      }
    } else {
      // Synthesize grounded response using retrieved entries
      const snippets = relevantEntries.map(e => `• ${e.date} — "${e.title}": ${e.plainTextContent.substring(0, 140)}...`).join('\n');
      
      answerText = `Based on ${relevantEntries.length} memory ${relevantEntries.length === 1 ? 'record' : 'records'} in your magical diary:\n\n${snippets}\n\nThese entries reflect your thoughts and feelings regarding "${query}".`;
    }

    // Save conversation history
    let conversation: AiConversationDocument | null = null;
    if (conversationId) {
      conversation = await this.conversationModel.findOne({ _id: conversationId, userId });
    }

    if (!conversation) {
      conversation = new this.conversationModel({
        userId,
        title: `Query: ${query.substring(0, 30)}...`,
        messages: [],
      });
    }

    conversation.messages.push(
      { role: 'user', content: query, createdAt: new Date() },
      { role: 'assistant', content: answerText, sources, createdAt: new Date() },
    );

    await conversation.save();

    return {
      conversationId: conversation._id,
      answer: answerText,
      sources,
      relevantCount: relevantEntries.length,
    };
  }

  async getConversations(userId: string) {
    return this.conversationModel.find({ userId }).sort({ createdAt: -1 }).limit(20).exec();
  }

  async deleteConversation(userId: string, conversationId: string) {
    const res = await this.conversationModel.deleteOne({ _id: conversationId, userId });
    if (res.deletedCount === 0) {
      throw new NotFoundException('Conversation not found');
    }
    return { message: 'Pensieve conversation deleted' };
  }
}
