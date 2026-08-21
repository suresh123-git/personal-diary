import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoodEntry, MoodEntryDocument } from '../../schemas/mood-entry.schema';
import { CreateMoodDto } from './dto/create-mood.dto';

@Injectable()
export class MoodService {
  constructor(
    @InjectModel(MoodEntry.name) private moodModel: Model<MoodEntryDocument>,
  ) {}

  async createOrUpdate(userId: string, dto: CreateMoodDto): Promise<MoodEntryDocument> {
    return this.moodModel.findOneAndUpdate(
      { userId, date: dto.date },
      { ...dto, userId },
      { upsert: true, new: true },
    );
  }

  async findByRange(userId: string, startDate?: string, endDate?: string) {
    const filter: any = { userId };
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = startDate;
      if (endDate) filter.date.$lte = endDate;
    }
    return this.moodModel.find(filter).sort({ date: -1 }).exec();
  }

  async getMoodTrends(userId: string) {
    const entries = await this.moodModel.find({ userId }).sort({ date: -1 }).limit(30).exec();
    const frequency: Record<string, number> = {};

    entries.forEach((e) => {
      frequency[e.mood] = (frequency[e.mood] || 0) + 1;
    });

    return {
      recentHistory: entries,
      frequency,
      totalTracked: entries.length,
    };
  }
}
