import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from '@app/ep/modules/auth/auth.service';
import { CustomerService } from '@app/ep/modules/customer/application/customer.service';
import { ICustomerRepository } from '@app/ep/modules/customer/domain/customer.repository';
import { CustomerRepository } from '@app/ep/modules/customer/repository/customer.repository';
import { CustomerController } from '@app/ep/modules/customer/api/customer.controller';
import { CommandHandlers } from '@app/ep/modules/customer/application/commands/handler';
import { EventHandlers } from '@app/ep/modules/customer/application/events/handler';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';

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
