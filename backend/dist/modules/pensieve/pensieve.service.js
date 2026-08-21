"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PensieveService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const diary_entry_schema_1 = require("../../schemas/diary-entry.schema");
const ai_conversation_schema_1 = require("../../schemas/ai-conversation.schema");
let PensieveService = class PensieveService {
    constructor(diaryModel, conversationModel) {
        this.diaryModel = diaryModel;
        this.conversationModel = conversationModel;
    }
    async exploreMemories(userId, dto) {
        const { query, conversationId } = dto;
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
        let answerText = '';
        const sources = relevantEntries.map((e) => ({
            entryId: e._id,
            title: e.title,
            date: e.date,
        }));
        if (relevantEntries.length === 0) {
            const recentCount = await this.diaryModel.countDocuments({ userId, isArchived: false });
            if (recentCount === 0) {
                answerText = "Your Pensieve is currently empty. Begin writing your diary entries, and I shall help you explore your memories here.";
            }
            else {
                answerText = `I searched your magical archives for "${query}", but found no matching diary entries. Try asking about a specific event, mood, or timeframe!`;
            }
        }
        else {
            const snippets = relevantEntries.map(e => `• ${e.date} — "${e.title}": ${e.plainTextContent.substring(0, 140)}...`).join('\n');
            answerText = `Based on ${relevantEntries.length} memory ${relevantEntries.length === 1 ? 'record' : 'records'} in your magical diary:\n\n${snippets}\n\nThese entries reflect your thoughts and feelings regarding "${query}".`;
        }
        let conversation = null;
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
        conversation.messages.push({ role: 'user', content: query, createdAt: new Date() }, { role: 'assistant', content: answerText, sources, createdAt: new Date() });
        await conversation.save();
        return {
            conversationId: conversation._id,
            answer: answerText,
            sources,
            relevantCount: relevantEntries.length,
        };
    }
    async getConversations(userId) {
        return this.conversationModel.find({ userId }).sort({ createdAt: -1 }).limit(20).exec();
    }
    async deleteConversation(userId, conversationId) {
        const res = await this.conversationModel.deleteOne({ _id: conversationId, userId });
        if (res.deletedCount === 0) {
            throw new common_1.NotFoundException('Conversation not found');
        }
        return { message: 'Pensieve conversation deleted' };
    }
};
exports.PensieveService = PensieveService;
exports.PensieveService = PensieveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(diary_entry_schema_1.DiaryEntry.name)),
    __param(1, (0, mongoose_1.InjectModel)(ai_conversation_schema_1.AiConversation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PensieveService);
//# sourceMappingURL=pensieve.service.js.map