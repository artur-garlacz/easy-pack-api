import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('/health')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for checking if app is up and running',
  })
  getHello(): string {
    return 'Ok';
  }
}
