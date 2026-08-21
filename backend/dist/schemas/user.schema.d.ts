import { Document } from 'mongoose';
export type HouseType = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff' | 'unassigned';
export type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    passwordHash: string;
    house: HouseType;
    profileImage: string;
    timezone: string;
    preferences: Record<string, any>;
    theme: Record<string, any>;
    notificationSettings: Record<string, any>;
    aiSettings: Record<string, any>;
    refreshTokenHash?: string;
    lastLoginAt: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
