import { Test, TestingModule } from '@nestjs/testing';
import { CorreccionesService } from './correcciones.service';

describe('CorreccionesService', () => {
  let service: CorreccionesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorreccionesService],
    }).compile();
    service = module.get<CorreccionesService>(CorreccionesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
