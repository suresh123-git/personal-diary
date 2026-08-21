import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { QueryDiaryEntryDto } from './dto/query-diary-entry.dto';
export declare class DiaryController {
    private readonly diaryService;
    constructor(diaryService: DiaryService);
    create(userId: string, createDto: CreateDiaryEntryDto): Promise<import("../../schemas/diary-entry.schema").DiaryEntryDocument>;
    findAll(userId: string, queryDto: QueryDiaryEntryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("../../schemas/diary-entry.schema").DiaryEntryDocument, {}, {}> & import("../../schemas/diary-entry.schema").DiaryEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getStreakStats(userId: string): Promise<{
        currentStreak: number;
        totalEntries: number;
        distinctDays: number;
    }>;
    findOne(userId: string, id: string): Promise<import("../../schemas/diary-entry.schema").DiaryEntryDocument>;
    update(userId: string, id: string, updateDto: UpdateDiaryEntryDto): Promise<import("../../schemas/diary-entry.schema").DiaryEntryDocument>;
    toggleFavorite(userId: string, id: string): Promise<import("../../schemas/diary-entry.schema").DiaryEntryDocument>;
    remove(userId: string, id: string): Promise<{
        message: string;
    }>;
}
