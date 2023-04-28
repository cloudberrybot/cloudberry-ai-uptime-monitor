import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UptimeModule } from '../uptime/uptime.module';

@Module({
  imports: [UptimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
