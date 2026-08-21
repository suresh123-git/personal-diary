import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { MoodEntry, MoodEntrySchema } from '../../schemas/mood-entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoodEntry.name, schema: MoodEntrySchema },
    ]),
  ],
  controllers: [MoodController],
  providers: [MoodService],
  exports: [MoodService],
})
export class MoodModule {}
