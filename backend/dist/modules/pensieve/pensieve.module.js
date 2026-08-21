"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PensieveModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pensieve_controller_1 = require("./pensieve.controller");
const pensieve_service_1 = require("./pensieve.service");
const diary_entry_schema_1 = require("../../schemas/diary-entry.schema");
const ai_conversation_schema_1 = require("../../schemas/ai-conversation.schema");
let PensieveModule = class PensieveModule {
};
exports.PensieveModule = PensieveModule;
exports.PensieveModule = PensieveModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: diary_entry_schema_1.DiaryEntry.name, schema: diary_entry_schema_1.DiaryEntrySchema },
                { name: ai_conversation_schema_1.AiConversation.name, schema: ai_conversation_schema_1.AiConversationSchema },
            ]),
        ],
        controllers: [pensieve_controller_1.PensieveController],
        providers: [pensieve_service_1.PensieveService],
        exports: [pensieve_service_1.PensieveService],
    })
], PensieveModule);
//# sourceMappingURL=pensieve.module.js.map