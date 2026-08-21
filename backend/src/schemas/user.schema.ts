import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HouseType = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff' | 'unassigned';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: String, enum: ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff', 'unassigned'], default: 'unassigned' })
  house: HouseType;

  @Prop({ default: '' })
  profileImage: string;

  @Prop({ default: 'UTC' })
  timezone: string;

  @Prop({ type: Object, default: {} })
  preferences: Record<string, any>;

  @Prop({ type: Object, default: { themeMode: 'dark', houseThemeEnabled: true } })
  theme: Record<string, any>;

  @Prop({ type: Object, default: { dailyReminders: true, owlNotifications: true, reminderTime: '20:00' } })
  notificationSettings: Record<string, any>;

  @Prop({ type: Object, default: { pensieveEnabled: true, dailySummaries: true, personalInsights: true } })
  aiSettings: Record<string, any>;

  @Prop()
  refreshTokenHash?: string;

  @Prop({ default: Date.now })
  lastLoginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
