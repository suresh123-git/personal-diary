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
exports.MoodController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mood_service_1 = require("./mood.service");
const create_mood_dto_1 = require("./dto/create-mood.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
let MoodController = class MoodController {
    constructor(moodService) {
        this.moodService = moodService;
    }
    async recordMood(userId, dto) {
        return this.moodService.createOrUpdate(userId.toString(), dto);
    }
    async getMoods(userId, startDate, endDate) {
        return this.moodService.findByRange(userId.toString(), startDate, endDate);
    }
    async getMoodTrends(userId) {
        return this.moodService.getMoodTrends(userId.toString());
    }
};
exports.MoodController = MoodController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Record or update daily mood entry' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_mood_dto_1.CreateMoodDto]),
    __metadata("design:returntype", Promise)
], MoodController.prototype, "recordMood", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get mood entries by date range' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MoodController.prototype, "getMoods", null);
__decorate([
    (0, common_1.Get)('trends'),
    (0, swagger_1.ApiOperation)({ summary: 'Get mood analytics and frequency trends' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoodController.prototype, "getMoodTrends", null);
exports.MoodController = MoodController = __decorate([
    (0, swagger_1.ApiTags)('Mood'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('moods'),
    __metadata("design:paramtypes", [mood_service_1.MoodService])
], MoodController);
//# sourceMappingURL=mood.controller.js.map