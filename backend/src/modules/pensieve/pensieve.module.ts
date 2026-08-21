import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PensieveController } from './pensieve.controller';
import { PensieveService } from './pensieve.service';
import { DiaryEntry, DiaryEntrySchema } from '../../schemas/diary-entry.schema';
import { AiConversation, AiConversationSchema } from '../../schemas/ai-conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DiaryEntry.name, schema: DiaryEntrySchema },
      { name: AiConversation.name, schema: AiConversationSchema },
    ]),
  ],
  controllers: [PensieveController],
  providers: [PensieveService],
  exports: [PensieveService],
})
export class PensieveModule {}
