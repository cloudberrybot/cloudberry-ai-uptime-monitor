import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [],
      providers: [PrismaService],
    }).compile();

    service = app.get<PrismaService>(PrismaService);
    service.$on('beforeExit', async () => {
      console.log('exiting');
    });
  });

  describe('Prisma service', () => {
    it('should call the onModuleInit function', async () => {
      expect(await service.onModuleInit()).toBeCalled;
    });

    it('onModuleInit function should be defined', async () => {
      expect(service.onModuleInit).toBeDefined();
    });

    it('enableShutdownHooks should be defined', async () => {
      const mockApp: INestApplication = app as unknown as INestApplication;

      expect(await service.enableShutdownHooks(mockApp)).toBe(undefined);
    });
  });
});
