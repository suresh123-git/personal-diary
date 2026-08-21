import { MoodService } from './mood.service';
import { CreateMoodDto } from './dto/create-mood.dto';
export declare class MoodController {
    private readonly moodService;
    constructor(moodService: MoodService);
    recordMood(userId: string, dto: CreateMoodDto): Promise<import("../../schemas/mood-entry.schema").MoodEntryDocument>;
    getMoods(userId: string, startDate?: string, endDate?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas/mood-entry.schema").MoodEntryDocument, {}, {}> & import("../../schemas/mood-entry.schema").MoodEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getMoodTrends(userId: string): Promise<{
        recentHistory: (import("mongoose").Document<unknown, {}, import("../../schemas/mood-entry.schema").MoodEntryDocument, {}, {}> & import("../../schemas/mood-entry.schema").MoodEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        frequency: Record<string, number>;
        totalTracked: number;
    }>;
}
