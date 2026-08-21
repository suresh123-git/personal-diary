import { Model } from 'mongoose';
import { DiaryEntryDocument } from '../../schemas/diary-entry.schema';
import { AiConversation, AiConversationDocument } from '../../schemas/ai-conversation.schema';
import { AskPensieveDto } from './dto/ask-pensieve.dto';
export declare class PensieveService {
    private diaryModel;
    private conversationModel;
    constructor(diaryModel: Model<DiaryEntryDocument>, conversationModel: Model<AiConversationDocument>);
    exploreMemories(userId: string, dto: AskPensieveDto): Promise<{
        conversationId: import("mongoose").Types.ObjectId;
        answer: string;
        sources: {
            entryId: any;
            title: string;
            date: string;
        }[];
        relevantCount: number;
    }>;
    getConversations(userId: string): Promise<(import("mongoose").Document<unknown, {}, AiConversationDocument, {}, {}> & AiConversation & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    deleteConversation(userId: string, conversationId: string): Promise<{
        message: string;
    }>;
}
