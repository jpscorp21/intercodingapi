import { Test, TestingModule } from '@nestjs/testing';
import { StaffController } from './staff.controller';

describe('Staff Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StaffController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: StaffController = module.get<StaffController>(StaffController);
    expect(controller).toBeDefined();
  });
});
