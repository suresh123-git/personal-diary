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
exports.DiaryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const diary_service_1 = require("./diary.service");
const create_diary_entry_dto_1 = require("./dto/create-diary-entry.dto");
const update_diary_entry_dto_1 = require("./dto/update-diary-entry.dto");
const query_diary_entry_dto_1 = require("./dto/query-diary-entry.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
let DiaryController = class DiaryController {
    constructor(diaryService) {
        this.diaryService = diaryService;
    }
    async create(userId, createDto) {
        return this.diaryService.create(userId.toString(), createDto);
    }
    async findAll(userId, queryDto) {
        return this.diaryService.findAll(userId.toString(), queryDto);
    }
    async getStreakStats(userId) {
        return this.diaryService.getStreakStats(userId.toString());
    }
    async findOne(userId, id) {
        return this.diaryService.findOne(userId.toString(), id);
    }
    async update(userId, id, updateDto) {
        return this.diaryService.update(userId.toString(), id, updateDto);
    }
    async toggleFavorite(userId, id) {
        return this.diaryService.toggleFavorite(userId.toString(), id);
    }
    async remove(userId, id) {
        return this.diaryService.remove(userId.toString(), id);
    }
};
exports.DiaryController = DiaryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new diary entry' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_diary_entry_dto_1.CreateDiaryEntryDto]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated diary entries with filters' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_diary_entry_dto_1.QueryDiaryEntryDto]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats/streak'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user writing streak statistics' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "getStreakStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single diary entry by ID' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update existing diary entry (Autosave endpoint)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_diary_entry_dto_1.UpdateDiaryEntryDto]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/favorite'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle favorite status of a diary entry' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "toggleFavorite", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Archive/delete a diary entry' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "remove", null);
exports.DiaryController = DiaryController = __decorate([
    (0, swagger_1.ApiTags)('Diary'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('diary'),
    __metadata("design:paramtypes", [diary_service_1.DiaryService])
], DiaryController);
//# sourceMappingURL=diary.controller.js.map