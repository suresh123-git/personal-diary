"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const export_controller_1 = require("./export.controller");
const export_service_1 = require("./export.service");
const user_schema_1 = require("../../schemas/user.schema");
const diary_entry_schema_1 = require("../../schemas/diary-entry.schema");
const mood_entry_schema_1 = require("../../schemas/mood-entry.schema");
let ExportModule = class ExportModule {
};
exports.ExportModule = ExportModule;
exports.ExportModule = ExportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: diary_entry_schema_1.DiaryEntry.name, schema: diary_entry_schema_1.DiaryEntrySchema },
                { name: mood_entry_schema_1.MoodEntry.name, schema: mood_entry_schema_1.MoodEntrySchema },
            ]),
        ],
        controllers: [export_controller_1.ExportController],
        providers: [export_service_1.ExportService],
        exports: [export_service_1.ExportService],
    })
], ExportModule);
//# sourceMappingURL=export.module.js.map