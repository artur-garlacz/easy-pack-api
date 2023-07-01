import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .withSchema('event_store')
    .createTable('NotificationEvent', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('eventVersion', 255).notNullable();
      table.uuid('entityId').notNullable();
      table
        .enum('type', ['EMAIL_SENT', 'EMAIL_FAILED'], {
          useNative: true,
          enumName: 'NotificationEventType',
        })
        .notNullable();
      table
        .enum('entityType', ['EMAIL', 'SMS'], {
          useNative: true,
          enumName: 'NotificationEntityType',
        })
        .notNullable();
      table.jsonb('payload').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('event_store').dropTable('NotificationEvent');
}
