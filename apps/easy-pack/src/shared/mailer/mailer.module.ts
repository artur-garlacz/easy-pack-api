import { Logger, Module } from '@nestjs/common';
import { MailerModule as MailModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';
import { MailerService } from './mailer.service';
import { join } from 'path';

@Module({
  imports: [
    MailModule.forRootAsync({
      useFactory: () => {
        const dir = join(__dirname, 'templates');

        return {
          transport: {
            service: 'Gmail',
            auth: {
              user: process.env.GMAIL_SMPT_USER,
              pass: process.env.GMAIL_SMPT_PASS,
            },
          },
          defaults: {
            from: '"No Reply" <no-reply@easypack>',
          },
          template: {
            dir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailerService, DatabaseProvider, Logger],
  exports: [MailerService],
})
export class MailerModule {}
// niiawyuwrlhpcdus
