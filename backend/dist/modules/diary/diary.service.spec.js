"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mongoose_1 = require("@nestjs/mongoose");
const diary_service_1 = require("./diary.service");
const diary_entry_schema_1 = require("../../schemas/diary-entry.schema");
describe('DiaryService', () => {
    let service;
    const mockDiaryModel = {
        find: jest.fn(),
        findById: jest.fn(),
        countDocuments: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                diary_service_1.DiaryService,
                { provide: (0, mongoose_1.getModelToken)(diary_entry_schema_1.DiaryEntry.name), useValue: mockDiaryModel },
            ],
        }).compile();
        service = module.get(diary_service_1.DiaryService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=diary.service.spec.js.map