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
exports.AiConversationSchema = exports.AiConversation = exports.AiMessage = exports.AiSource = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class AiSource {
}
exports.AiSource = AiSource;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'DiaryEntry', required: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], AiSource.prototype, "entryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AiSource.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AiSource.prototype, "date", void 0);
class AiMessage {
}
exports.AiMessage = AiMessage;
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['user', 'assistant'] }),
    __metadata("design:type", String)
], AiMessage.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AiMessage.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [AiSource], default: [] }),
    __metadata("design:type", Array)
], AiMessage.prototype, "sources", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], AiMessage.prototype, "createdAt", void 0);
let AiConversation = class AiConversation {
};
exports.AiConversation = AiConversation;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], AiConversation.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'Pensieve Memory Exploration' }),
    __metadata("design:type", String)
], AiConversation.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [AiMessage], default: [] }),
    __metadata("design:type", Array)
], AiConversation.prototype, "messages", void 0);
exports.AiConversation = AiConversation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AiConversation);
exports.AiConversationSchema = mongoose_1.SchemaFactory.createForClass(AiConversation);
exports.AiConversationSchema.index({ userId: 1, createdAt: -1 });
//# sourceMappingURL=ai-conversation.schema.js.map