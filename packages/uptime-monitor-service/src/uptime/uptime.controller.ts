import { Body, Controller, Get, Post } from '@nestjs/common';

import { UptimeService } from './uptime.service';
import { UptimeCheckDto } from './uptime.dto';

@Controller('uptime')
export class UptimeController {
  constructor(private readonly uptimeService: UptimeService) {}

  @Get()
  findAll() {
    return this.uptimeService.uptime();
  }

  @Post()
  register(@Body() uptimeCheck: UptimeCheckDto) {
    return this.uptimeService.register(uptimeCheck);
    return 200;
  }
}
