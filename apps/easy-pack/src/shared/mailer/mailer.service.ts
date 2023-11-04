import { Injectable, Logger } from '@nestjs/common';
import {
  ISendMailOptions,
  MailerService as MailService,
} from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailService: MailService,
    private readonly logger: Logger,
  ) {}

  async sendEmail({
    to,
    subject,
    message,
    template,
    context,
    attachments,
  }: {
    to: string;
    subject: string;
    message?: string;
    template?: string;
    context?: any;
    attachments?: ISendMailOptions['attachments'];
  }): Promise<void> {
    try {
      await this.mailService.sendMail({
        to,
        subject,
        text: message,
        template,
        context,
        attachments,
      });

      // [
      //   {
      //     filename: 'EPLogo.png',
      //     path: join(__dirname, 'assets/EPLogo.png'),
      //     cid: 'logo',
      //   },
      // ]

      this.logger.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.log(error);
      this.logger.error(`Error sending email to ${to}`);
    }
  }
}
