import { Test, TestingModule } from '@nestjs/testing';
import { ConcursantesController } from './concursantes.controller';

describe('Concursantes Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ConcursantesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ConcursantesController = module.get<ConcursantesController>(ConcursantesController);
    expect(controller).toBeDefined();
  });
});
