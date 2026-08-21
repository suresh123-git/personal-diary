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
exports.DailyReflectionSchema = exports.DailyReflection = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DailyReflection = class DailyReflection {
};
exports.DailyReflection = DailyReflection;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], DailyReflection.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], DailyReflection.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DailyReflection.prototype, "happyAbout", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DailyReflection.prototype, "learned", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DailyReflection.prototype, "challengedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DailyReflection.prototype, "gratefulFor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DailyReflection.prototype, "tomorrowGoals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'DiaryEntry' }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], DailyReflection.prototype, "generatedEntryId", void 0);
exports.DailyReflection = DailyReflection = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DailyReflection);
exports.DailyReflectionSchema = mongoose_1.SchemaFactory.createForClass(DailyReflection);
exports.DailyReflectionSchema.index({ userId: 1, date: -1 });
//# sourceMappingURL=daily-reflection.schema.js.map