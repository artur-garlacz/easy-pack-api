import { Injectable, Logger } from '@nestjs/common';
import { DatabaseProvider } from 'src/shared/db/db.provider';
import { IEvent, mapEventStoreTable } from 'src/shared/events/events';

@Injectable()
export class EventStoreService {
  private readonly schemaName = 'event_store';

  constructor(private logger: Logger, private db: DatabaseProvider) {}

  async storeEvent(event: IEvent) {
    const tableName = mapEventStoreTable(event.entityType);
    console.log('event', event);
    await this.db
      .getKnexInstance()
      .withSchema(this.schemaName)
      .insert({
        ...event,
      })
      .into(tableName);

    this.logger.log(`Event stored: ${event.constructor.name}`);
  }
}
