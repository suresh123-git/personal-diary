import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument, HouseType } from '../../schemas/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SelectHouseDto } from './dto/select-house.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).select('-passwordHash -refreshTokenHash').exec();
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    return user;
  }

  async selectHouse(userId: string, selectHouseDto: SelectHouseDto): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { house: selectHouseDto.house },
      { new: true },
    ).select('-passwordHash -refreshTokenHash');

    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: dto },
      { new: true },
    ).select('-passwordHash -refreshTokenHash');

    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    return user;
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<{ message: string }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isMatch) {
      throw new BadRequestException('Current password does not match');
    }

    user.passwordHash = await bcrypt.hash(dto.newPassword, 12);
    user.refreshTokenHash = undefined; // Force re-login on other devices
    await user.save();

    return { message: 'Password updated successfully' };
  }

  async deleteAccount(userId: string): Promise<{ message: string }> {
    await this.userModel.findByIdAndDelete(userId);
    return { message: 'Account permanently deleted' };
  }
}
