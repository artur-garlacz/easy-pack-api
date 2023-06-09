import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MailerService } from 'src/shared/mailer/mailer.service';

@Controller()
export class AppController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('/health')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for checking if app is up and running',
  })
  getHello(): string {
    this.mailerService.sendEmail({
      to: 'natalia.bobik@onet.pl',
      subject: 'Parcel has been created!',
      message: 'Parcel has been created',
      template: 'parcel-created',
      context: {
        trackingNumber: 'EP12321342',
        userName: 'Artur Garlacz',
      },
    });
    return 'Ok';
  }
}
