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
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const diary_entry_schema_1 = require("../../schemas/diary-entry.schema");
const mood_entry_schema_1 = require("../../schemas/mood-entry.schema");
let ExportService = class ExportService {
    constructor(userModel, diaryModel, moodModel) {
        this.userModel = userModel;
        this.diaryModel = diaryModel;
        this.moodModel = moodModel;
    }
    async exportJson(userId) {
        const user = await this.userModel.findById(userId).select('-passwordHash -refreshTokenHash').exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const entries = await this.diaryModel.find({ userId, isArchived: false }).sort({ date: -1 }).exec();
        const moods = await this.moodModel.find({ userId }).sort({ date: -1 }).exec();
        return {
            exportMetadata: {
                exportedAt: new Date().toISOString(),
                appName: `${user.name}'s Personal Diary`,
                version: '1.0.0',
            },
            user: {
                name: user.name,
                email: user.email,
                house: user.house,
                timezone: user.timezone,
            },
            diaryEntries: entries,
            moodEntries: moods,
        };
    }
    async exportMarkdown(userId) {
        const user = await this.userModel.findById(userId).exec();
        const entries = await this.diaryModel.find({ userId, isArchived: false }).sort({ date: -1 }).exec();
        let md = `# 🪶 ${user?.name ? `${user.name}'s` : 'Personal'} Diary — Backup Export\n\n`;
        md += `**Owner**: ${user?.name || 'Magical User'}  \n`;
        md += `**House**: ${user?.house ? user.house.toUpperCase() : 'Unassigned'}  \n`;
        md += `**Export Date**: ${new Date().toLocaleDateString()}  \n`;
        md += `**Total Entries**: ${entries.length}  \n\n`;
        md += `---\n\n`;
        entries.forEach((entry, idx) => {
            md += `## ${idx + 1}. ${entry.title}\n\n`;
            md += `- **Date**: ${entry.date}\n`;
            md += `- **Mood**: ${entry.mood}\n`;
            if (entry.tags && entry.tags.length > 0) {
                md += `- **Tags**: ${entry.tags.join(', ')}\n`;
            }
            if (entry.location)
                md += `- **Location**: ${entry.location}\n`;
            md += `\n### Content\n\n${entry.plainTextContent || entry.content}\n\n`;
            md += `---\n\n`;
        });
        return md;
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(diary_entry_schema_1.DiaryEntry.name)),
    __param(2, (0, mongoose_1.InjectModel)(mood_entry_schema_1.MoodEntry.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ExportService);
//# sourceMappingURL=export.service.js.map