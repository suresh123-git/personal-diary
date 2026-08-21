import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { User, UserSchema } from '../../schemas/user.schema';
import { DiaryEntry, DiaryEntrySchema } from '../../schemas/diary-entry.schema';
import { MoodEntry, MoodEntrySchema } from '../../schemas/mood-entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: DiaryEntry.name, schema: DiaryEntrySchema },
      { name: MoodEntry.name, schema: MoodEntrySchema },
    ]),
  ],
  controllers: [ExportController],
  providers: [ExportService],
  exports: [ExportService],
})
export class ExportModule {}
