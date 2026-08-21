import { Document, Schema as MongooseSchema } from 'mongoose';
export type AiConversationDocument = AiConversation & Document;
export declare class AiSource {
    entryId: MongooseSchema.Types.ObjectId;
    title: string;
    date: string;
}
export declare class AiMessage {
    role: 'user' | 'assistant';
    content: string;
    sources?: AiSource[];
    createdAt: Date;
}
export declare class AiConversation {
    userId: MongooseSchema.Types.ObjectId;
    title: string;
    messages: AiMessage[];
}
export declare const AiConversationSchema: MongooseSchema<AiConversation, import("mongoose").Model<AiConversation, any, any, any, Document<unknown, any, AiConversation, any, {}> & AiConversation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AiConversation, Document<unknown, {}, import("mongoose").FlatRecord<AiConversation>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<AiConversation> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
