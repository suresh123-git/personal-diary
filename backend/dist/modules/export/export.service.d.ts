import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { DiaryEntry, DiaryEntryDocument } from '../../schemas/diary-entry.schema';
import { MoodEntry, MoodEntryDocument } from '../../schemas/mood-entry.schema';
export declare class ExportService {
    private userModel;
    private diaryModel;
    private moodModel;
    constructor(userModel: Model<UserDocument>, diaryModel: Model<DiaryEntryDocument>, moodModel: Model<MoodEntryDocument>);
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
        diaryEntries: (import("mongoose").Document<unknown, {}, DiaryEntryDocument, {}, {}> & DiaryEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        moodEntries: (import("mongoose").Document<unknown, {}, MoodEntryDocument, {}, {}> & MoodEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    exportMarkdown(userId: string): Promise<string>;
}
