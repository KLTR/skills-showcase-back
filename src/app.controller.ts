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

@Controller()
export class AppController {
  constructor(

  ) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): { name: string } {
    return { name: 'Max' };
  }


}
