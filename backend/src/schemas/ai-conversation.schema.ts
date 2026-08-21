import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AiConversationDocument = AiConversation & Document;

export class AiSource {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'DiaryEntry', required: true })
  entryId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string;
}

export class AiMessage {
  @Prop({ required: true, enum: ['user', 'assistant'] })
  role: 'user' | 'assistant';

  @Prop({ required: true })
  content: string;

  @Prop({ type: [AiSource], default: [] })
  sources?: AiSource[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

@Schema({ timestamps: true })
export class AiConversation {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, default: 'Pensieve Memory Exploration' })
  title: string;

  @Prop({ type: [AiMessage], default: [] })
  messages: AiMessage[];
}

export const AiConversationSchema = SchemaFactory.createForClass(AiConversation);
AiConversationSchema.index({ userId: 1, createdAt: -1 });
