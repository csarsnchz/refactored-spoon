import { Test, TestingModule } from '@nestjs/testing';
import { CatologService } from './catolog.service';

describe('CatologService', () => {
  let service: CatologService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatologService],
    }).compile();

    service = module.get<CatologService>(CatologService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
