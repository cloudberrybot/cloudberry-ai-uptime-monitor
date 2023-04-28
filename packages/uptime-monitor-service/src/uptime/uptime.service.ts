import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UptimeService {
  constructor(private prisma: PrismaService) {}

  async uptime(): Promise<object> {
    const data = await this.prisma.uptime.findMany();
    return { status: 200, data: data };
  }

  async register(uptimeCheck): Promise<object> {
    await this.prisma.uptime.create({ data: { ...uptimeCheck } });
    return { status: 201 };
  }
}
