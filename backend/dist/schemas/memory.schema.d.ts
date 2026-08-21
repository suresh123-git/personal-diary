import { Document, Schema as MongooseSchema } from 'mongoose';
export type MemoryDocument = Memory & Document;
export declare class Memory {
    userId: MongooseSchema.Types.ObjectId;
    title: string;
    description: string;
    date: string;
    type: string;
    mediaUrls: string[];
    associatedEntryId?: MongooseSchema.Types.ObjectId;
    mood?: string;
}
export declare const MemorySchema: MongooseSchema<Memory, import("mongoose").Model<Memory, any, any, any, Document<unknown, any, Memory, any, {}> & Memory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Memory, Document<unknown, {}, import("mongoose").FlatRecord<Memory>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Memory> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
