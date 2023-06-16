import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreService } from './event-store.service';
import { EventPublisher } from './event-publisher';

@Module({
  imports: [CqrsModule],
  providers: [EventStoreService, EventPublisher],
  exports: [EventStoreService, EventPublisher],
})
export class EventStoreModule {}
