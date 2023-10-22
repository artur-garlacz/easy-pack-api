import { Injectable, Logger } from '@nestjs/common';
import { MailerService as MailService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';

@Injectable()
export class MailerService {
  constructor(
    private readonly db: DatabaseProvider,
    private readonly mailService: MailService,
    private readonly logger: Logger,
  ) {}

  async sendEmail({
    to,
    subject,
    message,
    template,
    context,
  }: {
    to: string;
    subject: string;
    message?: string;
    template?: string;
    context?: any;
  }): Promise<void> {
    try {
      await this.mailService.sendMail({
        to,
        subject,
        text: message,
        template,
        context,
        attachments: [
          {
            filename: 'EPLogo.png',
            path: join(__dirname, 'assets/EPLogo.png'),
            cid: 'logo',
          },
        ],
      });

      this.logger.log(`Email sent successfully to ${to}`);
      // this.db.knex.insert({}).into('Notification').returning('*');
    } catch (error) {
      this.logger.error(`Error sending email to ${to}`);
    }
  }
}
