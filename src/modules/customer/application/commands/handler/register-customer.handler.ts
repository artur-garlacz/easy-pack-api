import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterCustomerCommand } from 'src/modules/customer/application/commands/impl/register-customer.command';
import { CustomerRegisteredEvent } from 'src/modules/customer/application/events/impl/customer-registered.event';
import { ICustomerRepository } from 'src/modules/customer/domain/customer.repository';

@CommandHandler(RegisterCustomerCommand)
export class RegisterCustomerHandler
  implements ICommandHandler<RegisterCustomerCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute({ payload }: RegisterCustomerCommand) {
    await this.customerRepository.create({ ...payload });

    this.eventBus.publish(
      new CustomerRegisteredEvent({
        cognitoId: payload.cognitoId,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      }),
    );
  }
}
