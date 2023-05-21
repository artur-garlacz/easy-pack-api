import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from 'src/modules/auth/auth.service';
import { CustomerService } from 'src/modules/customer/application/customer.service';
import { ICustomerRepository } from 'src/modules/customer/domain/customer.repository';
import { CustomerRepository } from 'src/modules/customer/repository/customer.repository';
import { CustomerController } from 'src/modules/customer/api/customer.controller';
import { CommandHandlers } from 'src/modules/customer/application/commands/handler';
import { EventHandlers } from 'src/modules/customer/application/events/handler';
import { DatabaseProvider } from 'src/shared/db/db.provider';

@Module({
  imports: [CqrsModule],
  controllers: [CustomerController],
  providers: [
    AuthService,
    CustomerService,
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
    DatabaseProvider,
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
  ],
})
export class CustomerModule {}
