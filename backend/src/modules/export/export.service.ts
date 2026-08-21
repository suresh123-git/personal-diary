import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { DiaryEntry, DiaryEntryDocument } from '../../schemas/diary-entry.schema';
import { MoodEntry, MoodEntryDocument } from '../../schemas/mood-entry.schema';

@Injectable()
export class ExportService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(DiaryEntry.name) private diaryModel: Model<DiaryEntryDocument>,
    @InjectModel(MoodEntry.name) private moodModel: Model<MoodEntryDocument>,
  ) {}

  async exportJson(userId: string) {
    const user = await this.userModel.findById(userId).select('-passwordHash -refreshTokenHash').exec();
    if (!user) throw new NotFoundException('User not found');

    const entries = await this.diaryModel.find({ userId, isArchived: false }).sort({ date: -1 }).exec();
    const moods = await this.moodModel.find({ userId }).sort({ date: -1 }).exec();

    return {
      exportMetadata: {
        exportedAt: new Date().toISOString(),
        appName: `${user.name}'s Personal Diary`,
        version: '1.0.0',
      },
      user: {
        name: user.name,
        email: user.email,
        house: user.house,
        timezone: user.timezone,
      },
      diaryEntries: entries,
      moodEntries: moods,
    };
  }

  async exportMarkdown(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId).exec();
    const entries = await this.diaryModel.find({ userId, isArchived: false }).sort({ date: -1 }).exec();

    let md = `# 🪶 ${user?.name ? `${user.name}'s` : 'Personal'} Diary — Backup Export\n\n`;
    md += `**Owner**: ${user?.name || 'Magical User'}  \n`;
    md += `**House**: ${user?.house ? user.house.toUpperCase() : 'Unassigned'}  \n`;
    md += `**Export Date**: ${new Date().toLocaleDateString()}  \n`;
    md += `**Total Entries**: ${entries.length}  \n\n`;
    md += `---\n\n`;

    entries.forEach((entry, idx) => {
      md += `## ${idx + 1}. ${entry.title}\n\n`;
      md += `- **Date**: ${entry.date}\n`;
      md += `- **Mood**: ${entry.mood}\n`;
      if (entry.tags && entry.tags.length > 0) {
        md += `- **Tags**: ${entry.tags.join(', ')}\n`;
      }
      if (entry.location) md += `- **Location**: ${entry.location}\n`;
      md += `\n### Content\n\n${entry.plainTextContent || entry.content}\n\n`;
      md += `---\n\n`;
    });

    return md;
  }
}
