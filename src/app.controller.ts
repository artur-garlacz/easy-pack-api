import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MailerService } from '@app/ep/shared/mailer/mailer.service';

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
