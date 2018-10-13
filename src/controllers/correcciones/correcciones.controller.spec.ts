import { Test, TestingModule } from '@nestjs/testing';
import { CorreccionesController } from './correcciones.controller';

describe('Correcciones Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CorreccionesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CorreccionesController = module.get<CorreccionesController>(CorreccionesController);
    expect(controller).toBeDefined();
  });
});
