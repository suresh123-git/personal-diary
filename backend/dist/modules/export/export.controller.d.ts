import { Response } from 'express';
import { ExportService } from './export.service';
export declare class ExportController {
    private readonly exportService;
    constructor(exportService: ExportService);
    exportJson(userId: string): Promise<{
        exportMetadata: {
            exportedAt: string;
            appName: string;
            version: string;
        };
        user: {
            name: string;
            email: string;
            house: import("../../schemas/user.schema").HouseType;
            timezone: string;
        };
        diaryEntries: (import("mongoose").Document<unknown, {}, import("../../schemas/diary-entry.schema").DiaryEntryDocument, {}, {}> & import("../../schemas/diary-entry.schema").DiaryEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        moodEntries: (import("mongoose").Document<unknown, {}, import("../../schemas/mood-entry.schema").MoodEntryDocument, {}, {}> & import("../../schemas/mood-entry.schema").MoodEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    exportMarkdown(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
