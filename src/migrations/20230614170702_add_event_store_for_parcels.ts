import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createSchema('event_store');
  await knex.schema
    .withSchema('event_store')
    .createTable('ParcelDeliveryEvent', (table) => {
      table.increments('id', { primaryKey: true });
      table.string('eventVersion', 255).notNullable();
      table.uuid('entityId').notNullable();
      table
        .enum(
          'type',
          [
            'PARCEL_CREATED',
            'COURIER_ASSIGNED_TO_PARCEL',
            'COURIER_UNASSIGNED_FROM_PARCEL',
            'PARCEL_STATUS_UPDATED',
            'PARCEL_ARCHIVED',
          ],
          { useNative: true, enumName: 'event_type' },
        )
        .notNullable();
      table
        .enum('entityType', ['PARCEL_DELIVERY'], {
          useNative: true,
          enumName: 'entity_type',
        })
        .notNullable();
      table.jsonb('payload').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('event_store').dropTable('ParcelDeliveryEvent');
}
