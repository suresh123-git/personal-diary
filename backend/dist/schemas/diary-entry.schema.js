"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryEntrySchema = exports.DiaryEntry = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DiaryEntry = class DiaryEntry {
};
exports.DiaryEntry = DiaryEntry;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], DiaryEntry.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], DiaryEntry.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DiaryEntry.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DiaryEntry.prototype, "plainTextContent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], DiaryEntry.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Calm', index: true }),
    __metadata("design:type", String)
], DiaryEntry.prototype, "mood", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [], index: true }),
    __metadata("design:type", Array)
], DiaryEntry.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DiaryEntry.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DiaryEntry.prototype, "weather", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], DiaryEntry.prototype, "photos", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DiaryEntry.prototype, "voiceNote", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], DiaryEntry.prototype, "isFavorite", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], DiaryEntry.prototype, "isPrivate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], DiaryEntry.prototype, "isArchived", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Number], default: [] }),
    __metadata("design:type", Array)
], DiaryEntry.prototype, "embedding", void 0);
exports.DiaryEntry = DiaryEntry = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DiaryEntry);
exports.DiaryEntrySchema = mongoose_1.SchemaFactory.createForClass(DiaryEntry);
exports.DiaryEntrySchema.index({ userId: 1, date: -1 });
exports.DiaryEntrySchema.index({ userId: 1, createdAt: -1 });
exports.DiaryEntrySchema.index({ userId: 1, isFavorite: 1 });
exports.DiaryEntrySchema.index({ userId: 1, tags: 1 });
exports.DiaryEntrySchema.index({ userId: 1, mood: 1 });
exports.DiaryEntrySchema.index({ title: 'text', plainTextContent: 'text', tags: 'text' });
//# sourceMappingURL=diary-entry.schema.js.map