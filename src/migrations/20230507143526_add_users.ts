import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('User', (table) => {
    table.uuid('id', { primaryKey: true });
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('cognitoId').unique().notNullable();
    table.enum('role', ['OWNER', 'MANAGER', 'COURIER']);
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('User');
}
