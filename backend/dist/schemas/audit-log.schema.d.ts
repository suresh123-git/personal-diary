import { Document, Schema as MongooseSchema } from 'mongoose';
export type AuditLogDocument = AuditLog & Document;
export declare class AuditLog {
    userId: MongooseSchema.Types.ObjectId;
    action: string;
    ipAddress: string;
    userAgent: string;
    details: Record<string, any>;
}
export declare const AuditLogSchema: MongooseSchema<AuditLog, import("mongoose").Model<AuditLog, any, any, any, Document<unknown, any, AuditLog, any, {}> & AuditLog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AuditLog, Document<unknown, {}, import("mongoose").FlatRecord<AuditLog>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<AuditLog> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
