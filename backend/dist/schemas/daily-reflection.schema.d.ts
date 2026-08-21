import { Document, Schema as MongooseSchema } from 'mongoose';
export type DailyReflectionDocument = DailyReflection & Document;
export declare class DailyReflection {
    userId: MongooseSchema.Types.ObjectId;
    date: string;
    happyAbout: string;
    learned: string;
    challengedBy: string;
    gratefulFor: string;
    tomorrowGoals: string;
    generatedEntryId?: MongooseSchema.Types.ObjectId;
}
export declare const DailyReflectionSchema: MongooseSchema<DailyReflection, import("mongoose").Model<DailyReflection, any, any, any, Document<unknown, any, DailyReflection, any, {}> & DailyReflection & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DailyReflection, Document<unknown, {}, import("mongoose").FlatRecord<DailyReflection>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<DailyReflection> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
