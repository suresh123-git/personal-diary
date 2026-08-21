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
exports.MoodEntrySchema = exports.MoodEntry = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MoodEntry = class MoodEntry {
};
exports.MoodEntry = MoodEntry;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], MoodEntry.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], MoodEntry.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], MoodEntry.prototype, "mood", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], MoodEntry.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 3, min: 1, max: 5 }),
    __metadata("design:type", Number)
], MoodEntry.prototype, "intensity", void 0);
exports.MoodEntry = MoodEntry = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], MoodEntry);
exports.MoodEntrySchema = mongoose_1.SchemaFactory.createForClass(MoodEntry);
exports.MoodEntrySchema.index({ userId: 1, date: -1 });
//# sourceMappingURL=mood-entry.schema.js.map