import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DiaryService } from './diary.service';
import { DiaryEntry } from '../../schemas/diary-entry.schema';

describe('DiaryService', () => {
  let service: DiaryService;

  const mockDiaryModel = {
    find: jest.fn(),
    findById: jest.fn(),
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiaryService,
        { provide: getModelToken(DiaryEntry.name), useValue: mockDiaryModel },
      ],
    }).compile();

    service = module.get<DiaryService>(DiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
