import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DiaryEntry, DiaryEntrySchema } from '../../schemas/diary-entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DiaryEntry.name, schema: DiaryEntrySchema },
    ]),
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
  exports: [DiaryService],
})
export class DiaryModule {}
