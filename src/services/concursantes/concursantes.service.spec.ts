import { Test, TestingModule } from '@nestjs/testing';
import { ConcursantesService } from './concursantes.service';

describe('ConcursantesService', () => {
  let service: ConcursantesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcursantesService],
    }).compile();
    service = module.get<ConcursantesService>(ConcursantesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
