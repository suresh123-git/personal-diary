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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const user_schema_1 = require("../../schemas/user.schema");
const audit_log_schema_1 = require("../../schemas/audit-log.schema");
let AuthService = class AuthService {
    constructor(userModel, auditLogModel, jwtService, configService) {
        this.userModel = userModel;
        this.auditLogModel = auditLogModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(registerDto) {
        const { name, email, password, house } = registerDto;
        const existingUser = await this.userModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new common_1.ConflictException('A magical user with this email address already exists.');
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const newUser = new this.userModel({
            name,
            email: email.toLowerCase(),
            passwordHash,
            house: house || 'unassigned',
            lastLoginAt: new Date(),
        });
        await newUser.save();
        const tokens = await this.getTokens(newUser._id.toString(), newUser.email);
        await this.updateRefreshTokenHash(newUser._id.toString(), tokens.refreshToken);
        await this.logAudit(newUser._id.toString(), 'REGISTER', 'User account created');
        const userObj = newUser.toObject();
        delete userObj.passwordHash;
        delete userObj.refreshTokenHash;
        return {
            user: userObj,
            tokens,
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        user.lastLoginAt = new Date();
        await user.save();
        const tokens = await this.getTokens(user._id.toString(), user.email);
        await this.updateRefreshTokenHash(user._id.toString(), tokens.refreshToken);
        await this.logAudit(user._id.toString(), 'LOGIN', 'Successful login');
        const userObj = user.toObject();
        delete userObj.passwordHash;
        delete userObj.refreshTokenHash;
        return {
            user: userObj,
            tokens,
        };
    }
    async logout(userId) {
        await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash: null });
        await this.logAudit(userId, 'LOGOUT', 'User logged out');
        return { message: 'Logged out successfully' };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.userModel.findById(userId);
        if (!user || !user.refreshTokenHash) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
        if (!refreshTokenMatches) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const tokens = await this.getTokens(user._id.toString(), user.email);
        await this.updateRefreshTokenHash(user._id.toString(), tokens.refreshToken);
        return tokens;
    }
    async updateRefreshTokenHash(userId, refreshToken) {
        const hash = await bcrypt.hash(refreshToken, 10);
        await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash: hash });
    }
    async getTokens(userId, email) {
        const jwtPayload = { sub: userId, email };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get('JWT_SECRET') || 'lumos_magical_secret_key_2026_change_in_prod',
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get('JWT_REFRESH_SECRET') || 'alohomora_refresh_secret_key_2026',
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async logAudit(userId, action, detailsStr) {
        try {
            await this.auditLogModel.create({
                userId,
                action,
                details: { description: detailsStr },
            });
        }
        catch (e) {
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(audit_log_schema_1.AuditLog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map