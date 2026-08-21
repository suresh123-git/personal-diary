import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type DailyReflectionDocument = DailyReflection & Document;

@Schema({ timestamps: true })
export class DailyReflection {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  date: string; // YYYY-MM-DD

  @Prop({ default: '' })
  happyAbout: string;

  @Prop({ default: '' })
  learned: string;

  @Prop({ default: '' })
  challengedBy: string;

  @Prop({ default: '' })
  gratefulFor: string;

  @Prop({ default: '' })
  tomorrowGoals: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'DiaryEntry' })
  generatedEntryId?: MongooseSchema.Types.ObjectId;
}

export const DailyReflectionSchema = SchemaFactory.createForClass(DailyReflection);
DailyReflectionSchema.index({ userId: 1, date: -1 });
