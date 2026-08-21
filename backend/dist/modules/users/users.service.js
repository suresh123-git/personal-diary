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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../../schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findById(userId) {
        const user = await this.userModel.findById(userId).select('-passwordHash -refreshTokenHash').exec();
        if (!user) {
            throw new common_1.NotFoundException('User profile not found');
        }
        return user;
    }
    async selectHouse(userId, selectHouseDto) {
        const user = await this.userModel.findByIdAndUpdate(userId, { house: selectHouseDto.house }, { new: true }).select('-passwordHash -refreshTokenHash');
        if (!user) {
            throw new common_1.NotFoundException('User profile not found');
        }
        return user;
    }
    async updateProfile(userId, dto) {
        const user = await this.userModel.findByIdAndUpdate(userId, { $set: dto }, { new: true }).select('-passwordHash -refreshTokenHash');
        if (!user) {
            throw new common_1.NotFoundException('User profile not found');
        }
        return user;
    }
    async changePassword(userId, dto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
        if (!isMatch) {
            throw new common_1.BadRequestException('Current password does not match');
        }
        user.passwordHash = await bcrypt.hash(dto.newPassword, 12);
        user.refreshTokenHash = undefined;
        await user.save();
        return { message: 'Password updated successfully' };
    }
    async deleteAccount(userId) {
        await this.userModel.findByIdAndDelete(userId);
        return { message: 'Account permanently deleted' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map