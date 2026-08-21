"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const diary_entry_schema_1 = require("../../schemas/diary-entry.schema");
let DiaryService = class DiaryService {
    constructor(diaryModel) {
        this.diaryModel = diaryModel;
    }
    extractPlainText(html) {
        if (!html)
            return '';
        return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    }
    async create(userId, createDto) {
        const content = createDto.content || '<p></p>';
        const plainTextContent = createDto.plainTextContent || this.extractPlainText(content);
        const entry = new this.diaryModel({
            ...createDto,
            content,
            plainTextContent,
            userId,
        });
        return entry.save();
    }
    async findAll(userId, queryDto) {
        const { page = 1, limit = 10, search, tag, mood, date, startDate, endDate, isFavorite, isPrivate, sortBy = 'date', sortOrder = 'desc' } = queryDto;
        const filter = { userId, isArchived: false };
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { plainTextContent: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } },
            ];
        }
        if (tag) {
            filter.tags = tag;
        }
        if (mood) {
            filter.mood = mood;
        }
        if (date) {
            filter.date = date;
        }
        if (startDate || endDate) {
            filter.date = {};
            if (startDate)
                filter.date.$gte = startDate;
            if (endDate)
                filter.date.$lte = endDate;
        }
        if (typeof isFavorite === 'boolean') {
            filter.isFavorite = isFavorite;
        }
        if (typeof isPrivate === 'boolean') {
            filter.isPrivate = isPrivate;
        }
        const total = await this.diaryModel.countDocuments(filter);
        const pages = Math.ceil(total / limit);
        const sortOption = {};
        sortOption[sortBy] = sortOrder === 'asc' ? 1 : -1;
        const entries = await this.diaryModel
            .find(filter)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        return {
            items: entries,
            meta: {
                page,
                limit,
                total,
                pages,
            },
        };
    }
    async findOne(userId, id) {
        const entry = await this.diaryModel.findById(id).exec();
        if (!entry) {
            throw new common_1.NotFoundException('Diary entry not found');
        }
        if (entry.userId.toString() !== userId) {
            throw new common_1.ForbiddenException('You do not have access to this magical diary entry');
        }
        return entry;
    }
    async update(userId, id, updateDto) {
        const entry = await this.findOne(userId, id);
        if (updateDto.content && !updateDto.plainTextContent) {
            updateDto.plainTextContent = this.extractPlainText(updateDto.content);
        }
        Object.assign(entry, updateDto);
        return entry.save();
    }
    async remove(userId, id) {
        const entry = await this.findOne(userId, id);
        entry.isArchived = true;
        await entry.save();
        return { message: 'Diary entry moved to archive' };
    }
    async toggleFavorite(userId, id) {
        const entry = await this.findOne(userId, id);
        entry.isFavorite = !entry.isFavorite;
        return entry.save();
    }
    async getStreakStats(userId) {
        const entries = await this.diaryModel
            .find({ userId, isArchived: false })
            .select('date')
            .sort({ date: -1 })
            .exec();
        if (!entries.length) {
            return { currentStreak: 0, totalEntries: 0, distinctDays: 0 };
        }
        const uniqueDates = Array.from(new Set(entries.map((e) => e.date))).sort().reverse();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        let currentStreak = 0;
        let checkDate = uniqueDates.includes(today) ? today : uniqueDates.includes(yesterday) ? yesterday : null;
        if (checkDate) {
            let currentDate = new Date(checkDate);
            while (true) {
                const dateStr = currentDate.toISOString().split('T')[0];
                if (uniqueDates.includes(dateStr)) {
                    currentStreak++;
                    currentDate.setDate(currentDate.getDate() - 1);
                }
                else {
                    break;
                }
            }
        }
        return {
            currentStreak,
            totalEntries: entries.length,
            distinctDays: uniqueDates.length,
        };
    }
};
exports.DiaryService = DiaryService;
exports.DiaryService = DiaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(diary_entry_schema_1.DiaryEntry.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DiaryService);
//# sourceMappingURL=diary.service.js.map