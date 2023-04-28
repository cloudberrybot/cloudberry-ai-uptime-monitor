import { Test, TestingModule } from '@nestjs/testing';
import { UptimeController } from './uptime.controller';

describe('UptimeController', () => {
  let controller: UptimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UptimeController],
    }).compile();

    controller = module.get<UptimeController>(UptimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
