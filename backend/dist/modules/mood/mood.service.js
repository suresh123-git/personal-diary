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
exports.MoodService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mood_entry_schema_1 = require("../../schemas/mood-entry.schema");
let MoodService = class MoodService {
    constructor(moodModel) {
        this.moodModel = moodModel;
    }
    async createOrUpdate(userId, dto) {
        return this.moodModel.findOneAndUpdate({ userId, date: dto.date }, { ...dto, userId }, { upsert: true, new: true });
    }
    async findByRange(userId, startDate, endDate) {
        const filter = { userId };
        if (startDate || endDate) {
            filter.date = {};
            if (startDate)
                filter.date.$gte = startDate;
            if (endDate)
                filter.date.$lte = endDate;
        }
        return this.moodModel.find(filter).sort({ date: -1 }).exec();
    }
    async getMoodTrends(userId) {
        const entries = await this.moodModel.find({ userId }).sort({ date: -1 }).limit(30).exec();
        const frequency = {};
        entries.forEach((e) => {
            frequency[e.mood] = (frequency[e.mood] || 0) + 1;
        });
        return {
            recentHistory: entries,
            frequency,
            totalTracked: entries.length,
        };
    }
};
exports.MoodService = MoodService;
exports.MoodService = MoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(mood_entry_schema_1.MoodEntry.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MoodService);
//# sourceMappingURL=mood.service.js.map