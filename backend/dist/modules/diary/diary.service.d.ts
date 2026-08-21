import { Model } from 'mongoose';
import { DiaryEntry, DiaryEntryDocument } from '../../schemas/diary-entry.schema';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { QueryDiaryEntryDto } from './dto/query-diary-entry.dto';
export declare class DiaryService {
    private diaryModel;
    constructor(diaryModel: Model<DiaryEntryDocument>);
    private extractPlainText;
    create(userId: string, createDto: CreateDiaryEntryDto): Promise<DiaryEntryDocument>;
    findAll(userId: string, queryDto: QueryDiaryEntryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, DiaryEntryDocument, {}, {}> & DiaryEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findOne(userId: string, id: string): Promise<DiaryEntryDocument>;
    update(userId: string, id: string, updateDto: UpdateDiaryEntryDto): Promise<DiaryEntryDocument>;
    remove(userId: string, id: string): Promise<{
        message: string;
    }>;
    toggleFavorite(userId: string, id: string): Promise<DiaryEntryDocument>;
    getStreakStats(userId: string): Promise<{
        currentStreak: number;
        totalEntries: number;
        distinctDays: number;
    }>;
}
