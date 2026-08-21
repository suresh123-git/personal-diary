import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SelectHouseDto } from './dto/select-house.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get profile details' })
  async getProfile(@GetUser('_id') userId: string) {
    return this.usersService.findById(userId.toString());
  }

  @Post('house')
  @ApiOperation({ summary: 'Select Hogwarts House during onboarding or settings' })
  async selectHouse(
    @GetUser('_id') userId: string,
    @Body() dto: SelectHouseDto,
  ) {
    return this.usersService.selectHouse(userId.toString(), dto);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update profile settings, theme, preferences' })
  async updateProfile(
    @GetUser('_id') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(userId.toString(), dto);
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Change password securely' })
  async changePassword(
    @GetUser('_id') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(userId.toString(), dto);
  }

  @Delete('account')
  @ApiOperation({ summary: 'Permanently delete user account' })
  async deleteAccount(@GetUser('_id') userId: string) {
    return this.usersService.deleteAccount(userId.toString());
  }
}
