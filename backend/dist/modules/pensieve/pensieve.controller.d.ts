import { PensieveService } from './pensieve.service';
import { AskPensieveDto } from './dto/ask-pensieve.dto';
export declare class PensieveController {
    private readonly pensieveService;
    constructor(pensieveService: PensieveService);
    explore(userId: string, dto: AskPensieveDto): Promise<{
        conversationId: import("mongoose").Types.ObjectId;
        answer: string;
        sources: {
            entryId: any;
            title: string;
            date: string;
        }[];
        relevantCount: number;
    }>;
    getConversations(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas/ai-conversation.schema").AiConversationDocument, {}, {}> & import("../../schemas/ai-conversation.schema").AiConversation & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    deleteConversation(userId: string, id: string): Promise<{
        message: string;
    }>;
}
