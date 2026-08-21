import { Document, Schema as MongooseSchema } from 'mongoose';
export type DiaryEntryDocument = DiaryEntry & Document;
export declare class DiaryEntry {
    userId: MongooseSchema.Types.ObjectId;
    title: string;
    content: string;
    plainTextContent: string;
    date: string;
    mood: string;
    tags: string[];
    location: string;
    weather: string;
    photos: string[];
    voiceNote: string;
    isFavorite: boolean;
    isPrivate: boolean;
    isArchived: boolean;
    embedding?: number[];
}
export declare const DiaryEntrySchema: MongooseSchema<DiaryEntry, import("mongoose").Model<DiaryEntry, any, any, any, Document<unknown, any, DiaryEntry, any, {}> & DiaryEntry & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DiaryEntry, Document<unknown, {}, import("mongoose").FlatRecord<DiaryEntry>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<DiaryEntry> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
