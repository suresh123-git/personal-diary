import { Model } from 'mongoose';
import { MoodEntry, MoodEntryDocument } from '../../schemas/mood-entry.schema';
import { CreateMoodDto } from './dto/create-mood.dto';
export declare class MoodService {
    private moodModel;
    constructor(moodModel: Model<MoodEntryDocument>);
    createOrUpdate(userId: string, dto: CreateMoodDto): Promise<MoodEntryDocument>;
    findByRange(userId: string, startDate?: string, endDate?: string): Promise<(import("mongoose").Document<unknown, {}, MoodEntryDocument, {}, {}> & MoodEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getMoodTrends(userId: string): Promise<{
        recentHistory: (import("mongoose").Document<unknown, {}, MoodEntryDocument, {}, {}> & MoodEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        frequency: Record<string, number>;
        totalTracked: number;
    }>;
}
