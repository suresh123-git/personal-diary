import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { QueryDiaryEntryDto } from './dto/query-diary-entry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('Diary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new diary entry' })
  async create(
    @GetUser('_id') userId: string,
    @Body() createDto: CreateDiaryEntryDto,
  ) {
    return this.diaryService.create(userId.toString(), createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated diary entries with filters' })
  async findAll(
    @GetUser('_id') userId: string,
    @Query() queryDto: QueryDiaryEntryDto,
  ) {
    return this.diaryService.findAll(userId.toString(), queryDto);
  }

  @Get('stats/streak')
  @ApiOperation({ summary: 'Get user writing streak statistics' })
  async getStreakStats(@GetUser('_id') userId: string) {
    return this.diaryService.getStreakStats(userId.toString());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single diary entry by ID' })
  async findOne(
    @GetUser('_id') userId: string,
    @Param('id') id: string,
  ) {
    return this.diaryService.findOne(userId.toString(), id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update existing diary entry (Autosave endpoint)' })
  async update(
    @GetUser('_id') userId: string,
    @Param('id') id: string,
    @Body() updateDto: UpdateDiaryEntryDto,
  ) {
    return this.diaryService.update(userId.toString(), id, updateDto);
  }

  @Post(':id/favorite')
  @ApiOperation({ summary: 'Toggle favorite status of a diary entry' })
  async toggleFavorite(
    @GetUser('_id') userId: string,
    @Param('id') id: string,
  ) {
    return this.diaryService.toggleFavorite(userId.toString(), id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Archive/delete a diary entry' })
  async remove(
    @GetUser('_id') userId: string,
    @Param('id') id: string,
  ) {
    return this.diaryService.remove(userId.toString(), id);
  }
}
