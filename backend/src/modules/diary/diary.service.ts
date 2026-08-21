import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { DiaryEntry, DiaryEntryDocument } from '../../schemas/diary-entry.schema';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { QueryDiaryEntryDto } from './dto/query-diary-entry.dto';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(DiaryEntry.name) private diaryModel: Model<DiaryEntryDocument>,
  ) {}

  private extractPlainText(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
  }

  async create(userId: string, createDto: CreateDiaryEntryDto): Promise<DiaryEntryDocument> {
    const content = createDto.content || '<p></p>';
    const plainTextContent = createDto.plainTextContent || this.extractPlainText(content);
    
    const entry = new this.diaryModel({
      ...createDto,
      content,
      plainTextContent,
      userId,
    });

    return entry.save();
  }

  async findAll(userId: string, queryDto: QueryDiaryEntryDto) {
    const { page = 1, limit = 10, search, tag, mood, date, startDate, endDate, isFavorite, isPrivate, sortBy = 'date', sortOrder = 'desc' } = queryDto;

    const filter: FilterQuery<DiaryEntryDocument> = { userId, isArchived: false };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { plainTextContent: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (tag) {
      filter.tags = tag;
    }

    if (mood) {
      filter.mood = mood;
    }

    if (date) {
      filter.date = date;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = startDate;
      if (endDate) filter.date.$lte = endDate;
    }

    if (typeof isFavorite === 'boolean') {
      filter.isFavorite = isFavorite;
    }

    if (typeof isPrivate === 'boolean') {
      filter.isPrivate = isPrivate;
    }

    const total = await this.diaryModel.countDocuments(filter);
    const pages = Math.ceil(total / limit);

    const sortOption: Record<string, 1 | -1> = {};
    sortOption[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const entries = await this.diaryModel
      .find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      items: entries,
      meta: {
        page,
        limit,
        total,
        pages,
      },
    };
  }

  async findOne(userId: string, id: string): Promise<DiaryEntryDocument> {
    const entry = await this.diaryModel.findById(id).exec();
    if (!entry) {
      throw new NotFoundException('Diary entry not found');
    }

    if (entry.userId.toString() !== userId) {
      throw new ForbiddenException('You do not have access to this magical diary entry');
    }

    return entry;
  }

  async update(userId: string, id: string, updateDto: UpdateDiaryEntryDto): Promise<DiaryEntryDocument> {
    const entry = await this.findOne(userId, id);

    if (updateDto.content && !updateDto.plainTextContent) {
      updateDto.plainTextContent = this.extractPlainText(updateDto.content);
    }

    Object.assign(entry, updateDto);
    return entry.save();
  }

  async remove(userId: string, id: string): Promise<{ message: string }> {
    const entry = await this.findOne(userId, id);
    entry.isArchived = true;
    await entry.save();
    return { message: 'Diary entry moved to archive' };
  }

  async toggleFavorite(userId: string, id: string): Promise<DiaryEntryDocument> {
    const entry = await this.findOne(userId, id);
    entry.isFavorite = !entry.isFavorite;
    return entry.save();
  }

  async getStreakStats(userId: string) {
    const entries = await this.diaryModel
      .find({ userId, isArchived: false })
      .select('date')
      .sort({ date: -1 })
      .exec();

    if (!entries.length) {
      return { currentStreak: 0, totalEntries: 0, distinctDays: 0 };
    }

    const uniqueDates = Array.from(new Set(entries.map((e) => e.date))).sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let currentStreak = 0;
    let checkDate = uniqueDates.includes(today) ? today : uniqueDates.includes(yesterday) ? yesterday : null;

    if (checkDate) {
      let currentDate = new Date(checkDate);
      while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (uniqueDates.includes(dateStr)) {
          currentStreak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    return {
      currentStreak,
      totalEntries: entries.length,
      distinctDays: uniqueDates.length,
    };
  }
}
