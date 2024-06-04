import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JWTAuthGuard } from './auth/jwt-guard.auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

//@UseGuards(JWTAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
