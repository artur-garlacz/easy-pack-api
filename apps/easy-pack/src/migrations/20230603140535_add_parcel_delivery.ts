import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ParcelAddress', (table) => {
    table.uuid('id').primary();
    table.string('country', 255).notNullable();
    table.string('city', 255).notNullable();
    table.string('street', 255).notNullable();
    table.string('postalCode', 255).notNullable();
    table.string('locationNumber', 255).notNullable();
    table.string('email', 255).nullable();
    table.string('phoneNumber', 255).nullable();
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable('ParcelDelivery', (table) => {
    table.uuid('id').primary();
    table.uuid('senderDetailsId').references('id').inTable('ParcelAddress');
    table.uuid('recipientDetailsId').references('id').inTable('ParcelAddress');
    table
      .uuid('userId')
      .references('id')
      .inTable('User')
      .onDelete('CASCADE')
      .index();
    table
      .uuid('customerId')
      .references('id')
      .inTable('Customer')
      .onDelete('CASCADE')
      .index();
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
    table.string('trackingNumber').unique().notNullable();
    table.string('description');
    table.decimal('price', 2).notNullable();
    table.enum('status', ['CREATED', 'ACCEPTED', 'REJECTED']);
    table.dateTime('pickupAt').notNullable();
    table.dateTime('shipmentAt').notNullable();
    table.timestamps(true, true, true);
  });

  await knex.schema.createTable('Package', (table) => {
    table.uuid('id').primary();
    table.enum('measurementUnit', ['CM']).defaultTo('CM');
    table.float('weight');
    table.float('width');
    table.float('length');
    table.float('height');
    table.string('description').nullable();
    table.enum('type', ['ENVELOPE', 'BOX', 'OTHER']);
    table
      .uuid('parcelDeliveryId')
      .references('id')
      .inTable('ParcelDelivery')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('ParcelAddress');
  await knex.schema.dropTable('ParcelDelivery');
  await knex.schema.dropTable('Package');
}
