import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MoodEntryDocument = MoodEntry & Document;

@Schema({ timestamps: true })
export class MoodEntry {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  date: string; // YYYY-MM-DD format

  @Prop({ required: true })
  mood: string; // Ecstatic | Happy | Calm | Neutral | Sad | Angry | Anxious | Tired | Excited

  @Prop({ default: '' })
  note: string;

  @Prop({ default: 3, min: 1, max: 5 })
  intensity: number;
}

export const MoodEntrySchema = SchemaFactory.createForClass(MoodEntry);
MoodEntrySchema.index({ userId: 1, date: -1 });
