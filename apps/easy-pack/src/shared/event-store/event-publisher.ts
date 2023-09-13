import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventStoreService } from './event-store.service';
import { IEvent } from '@app/ep/shared/events/events';

@Injectable()
export class EventPublisher {
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventStore: EventStoreService,
  ) {}

  publish(event: IEvent) {
    this.eventStore.storeEvent(event);
    this.eventBus.publish(event);
  }
}
