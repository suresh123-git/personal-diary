import { Document, Schema as MongooseSchema } from 'mongoose';
export type MoodEntryDocument = MoodEntry & Document;
export declare class MoodEntry {
    userId: MongooseSchema.Types.ObjectId;
    date: string;
    mood: string;
    note: string;
    intensity: number;
}
export declare const MoodEntrySchema: MongooseSchema<MoodEntry, import("mongoose").Model<MoodEntry, any, any, any, Document<unknown, any, MoodEntry, any, {}> & MoodEntry & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MoodEntry, Document<unknown, {}, import("mongoose").FlatRecord<MoodEntry>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<MoodEntry> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
