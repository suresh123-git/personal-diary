import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MoodService } from './mood.service';
import { CreateMoodDto } from './dto/create-mood.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('Mood')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('moods')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Post()
  @ApiOperation({ summary: 'Record or update daily mood entry' })
  async recordMood(
    @GetUser('_id') userId: string,
    @Body() dto: CreateMoodDto,
  ) {
    return this.moodService.createOrUpdate(userId.toString(), dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get mood entries by date range' })
  async getMoods(
    @GetUser('_id') userId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.moodService.findByRange(userId.toString(), startDate, endDate);
  }

  @Get('trends')
  @ApiOperation({ summary: 'Get mood analytics and frequency trends' })
  async getMoodTrends(@GetUser('_id') userId: string) {
    return this.moodService.getMoodTrends(userId.toString());
  }
}
