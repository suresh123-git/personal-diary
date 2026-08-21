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
exports.PensieveController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pensieve_service_1 = require("./pensieve.service");
const ask_pensieve_dto_1 = require("./dto/ask-pensieve.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
let PensieveController = class PensieveController {
    constructor(pensieveService) {
        this.pensieveService = pensieveService;
    }
    async explore(userId, dto) {
        return this.pensieveService.exploreMemories(userId.toString(), dto);
    }
    async getConversations(userId) {
        return this.pensieveService.getConversations(userId.toString());
    }
    async deleteConversation(userId, id) {
        return this.pensieveService.deleteConversation(userId.toString(), id);
    }
};
exports.PensieveController = PensieveController;
__decorate([
    (0, common_1.Post)('explore'),
    (0, swagger_1.ApiOperation)({ summary: 'Ask Pensieve AI memory assistant' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ask_pensieve_dto_1.AskPensieveDto]),
    __metadata("design:returntype", Promise)
], PensieveController.prototype, "explore", null);
__decorate([
    (0, common_1.Get)('conversations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get history of Pensieve AI conversations' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PensieveController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Delete)('conversations/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Pensieve conversation' }),
    __param(0, (0, get_user_decorator_1.GetUser)('_id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PensieveController.prototype, "deleteConversation", null);
exports.PensieveController = PensieveController = __decorate([
    (0, swagger_1.ApiTags)('Pensieve'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('pensieve'),
    __metadata("design:paramtypes", [pensieve_service_1.PensieveService])
], PensieveController);
//# sourceMappingURL=pensieve.controller.js.map