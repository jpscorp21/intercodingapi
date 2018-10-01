import { Test, TestingModule } from '@nestjs/testing';
import { EjerciciosController } from './ejercicios.controller';

describe('Ejercicios Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [EjerciciosController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: EjerciciosController = module.get<EjerciciosController>(EjerciciosController);
    expect(controller).toBeDefined();
  });
});
