import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../../schemas/user.schema';
import { AuditLog, AuditLogDocument } from '../../schemas/audit-log.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(AuditLog.name) private auditLogModel: Model<AuditLogDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password, house } = registerDto;
    const existingUser = await this.userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new ConflictException('A magical user with this email address already exists.');
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
    delete (userObj as any).passwordHash;
    delete (userObj as any).refreshTokenHash;

    return {
      user: userObj,
      tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.lastLoginAt = new Date();
    await user.save();

    const tokens = await this.getTokens(user._id.toString(), user.email);
    await this.updateRefreshTokenHash(user._id.toString(), tokens.refreshToken);

    await this.logAudit(user._id.toString(), 'LOGIN', 'Successful login');

    const userObj = user.toObject();
    delete (userObj as any).passwordHash;
    delete (userObj as any).refreshTokenHash;

    return {
      user: userObj,
      tokens,
    };
  }

  async logout(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash: null });
    await this.logAudit(userId, 'LOGOUT', 'User logged out');
    return { message: 'Logged out successfully' };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId);
    if (!user || !user.refreshTokenHash) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user._id.toString(), user.email);
    await this.updateRefreshTokenHash(user._id.toString(), tokens.refreshToken);

    return tokens;
  }

  private async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash: hash });
  }

  private async getTokens(userId: string, email: string) {
    const jwtPayload = { sub: userId, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET') || 'lumos_magical_secret_key_2026_change_in_prod',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'alohomora_refresh_secret_key_2026',
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async logAudit(userId: string, action: string, detailsStr: string) {
    try {
      await this.auditLogModel.create({
        userId,
        action,
        details: { description: detailsStr },
      });
    } catch (e) {
      // Ignore logging failure silently to avoid blocking user flow
    }
  }
}
