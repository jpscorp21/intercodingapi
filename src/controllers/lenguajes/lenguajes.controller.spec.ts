import { Test, TestingModule } from '@nestjs/testing';
import { LenguajesController } from './lenguajes.controller';

describe('Lenguajes Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LenguajesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LenguajesController = module.get<LenguajesController>(LenguajesController);
    expect(controller).toBeDefined();
  });
});
