import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MemoryDocument = Memory & Document;

@Schema({ timestamps: true })
export class Memory {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, index: true })
  date: string; // YYYY-MM-DD format

  @Prop({ type: String, enum: ['photo', 'milestone', 'event', 'travel', 'favorite'], default: 'event' })
  type: string;

  @Prop({ type: [String], default: [] })
  mediaUrls: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'DiaryEntry' })
  associatedEntryId?: MongooseSchema.Types.ObjectId;

  @Prop({ default: 'Calm' })
  mood?: string;
}

export const MemorySchema = SchemaFactory.createForClass(Memory);
MemorySchema.index({ userId: 1, date: -1 });
