import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('DeliveryRequestAddress', (table) => {
    table.uuid('id').primary();
    table.string('country', 255).notNullable();
    table.string('city', 255).notNullable();
    table.string('street', 255).notNullable();
    table.string('postalCode', 255).notNullable();
    table.string('locationNumber', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('phoneNumber', 255).notNullable();
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('DeliveryRequest', (table) => {
    table.uuid('id').primary();
    table
      .uuid('senderDetailsId')
      .references('id')
      .inTable('DeliveryRequestAddress');
    table
      .uuid('recipientDetailsId')
      .references('id')
      .inTable('DeliveryRequestAddress');
    table
      .uuid('orderingPartyDetailsId')
      .references('id')
      .inTable('DeliveryRequestAddress');
    table.string('description');
    table.enum('type', ['ENVELOPE', 'BOX', 'OTHER']);
    table.enum('status', ['CREATED', 'ACCEPTED', 'REJECTED']);
    table.dateTime('shipmentAt');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('Package', (table) => {
    table.uuid('id').primary();
    table.enum('measurementUnit', ['CM']).defaultTo('CM');
    table.float('weight');
    table.float('width');
    table.float('length');
    table.float('height');
    table.string('description');
    table.uuid('deliveryRequestId').references('id').inTable('DeliveryRequest');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Customer');
}
