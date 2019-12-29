import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Header,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): { name: string } {
    return { name: 'Max' };
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @Header('Content-Type', 'application/json')
  async login(
    @Body('username') username: string,
    @Body('password') password: number,
    @Request() req,
  ) {
    const user = req.user;
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @Header('Content-Type', 'application/json')
  getProfile(@Request() req) {
    return req.user;
  }
}
