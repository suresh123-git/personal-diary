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
exports.MemorySchema = exports.Memory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Memory = class Memory {
};
exports.Memory = Memory;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Memory.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Memory.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Memory.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], Memory.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['photo', 'milestone', 'event', 'travel', 'favorite'], default: 'event' }),
    __metadata("design:type", String)
], Memory.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Memory.prototype, "mediaUrls", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'DiaryEntry' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Memory.prototype, "associatedEntryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Calm' }),
    __metadata("design:type", String)
], Memory.prototype, "mood", void 0);
exports.Memory = Memory = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Memory);
exports.MemorySchema = mongoose_1.SchemaFactory.createForClass(Memory);
exports.MemorySchema.index({ userId: 1, date: -1 });
//# sourceMappingURL=memory.schema.js.map