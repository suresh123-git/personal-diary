import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type DiaryEntryDocument = DiaryEntry & Document;

@Schema({ timestamps: true })
export class DiaryEntry {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true, index: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  content: string; // Rich HTML/JSON format from TipTap

  @Prop({ default: '' })
  plainTextContent: string; // Used for search indexing & AI embeddings

  @Prop({ required: true, index: true })
  date: string; // YYYY-MM-DD format for fast calendar query

  @Prop({ default: 'Calm', index: true })
  mood: string;

  @Prop({ type: [String], default: [], index: true })
  tags: string[];

  @Prop({ default: '' })
  location: string;

  @Prop({ default: '' })
  weather: string;

  @Prop({ type: [String], default: [] })
  photos: string[];

  @Prop({ default: '' })
  voiceNote: string;

  @Prop({ default: false, index: true })
  isFavorite: boolean;

  @Prop({ default: false, index: true })
  isPrivate: boolean; // Requires Muffliato extra auth

  @Prop({ default: false, index: true })
  isArchived: boolean;

  @Prop({ type: [Number], default: [] })
  embedding?: number[]; // Vector embeddings for semantic search / Pensieve
}

export const DiaryEntrySchema = SchemaFactory.createForClass(DiaryEntry);

// Create compound indexes for high performance queries
DiaryEntrySchema.index({ userId: 1, date: -1 });
DiaryEntrySchema.index({ userId: 1, createdAt: -1 });
DiaryEntrySchema.index({ userId: 1, isFavorite: 1 });
DiaryEntrySchema.index({ userId: 1, tags: 1 });
DiaryEntrySchema.index({ userId: 1, mood: 1 });
DiaryEntrySchema.index({ title: 'text', plainTextContent: 'text', tags: 'text' });
