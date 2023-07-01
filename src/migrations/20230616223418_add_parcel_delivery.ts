import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ParcelDelivery', (table) => {
    table.uuid('id').primary();
    table
      .uuid('deliveryRequestId')
      .references('id')
      .inTable('DeliveryRequest')
      .onDelete('CASCADE')
      .index();
    table.uuid('userId').references('id').inTable('User');
    table.enum(
      'status',
      [
        'CREATED',
        'PENDING',
        'IN_TRANSIT',
        'DELIVERED',
        'CANCELLED',
        'ARCHIVED',
      ],
      {
        useNative: true,
        enumName: 'parcel_delivery_status',
      },
    );
    table.string('trackingNumber');
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('ParcelDelivery');
}
