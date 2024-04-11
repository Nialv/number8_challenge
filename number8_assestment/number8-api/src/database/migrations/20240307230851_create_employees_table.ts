import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('employees', table => {
    table.uuid('id').primary();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.date('hire_date').notNullable();
    table
      .uuid('department_id')
      .unsigned()
      .references('id')
      .inTable('departments')
      .onDelete('CASCADE');
    table.string('phone', 20).notNullable();
    table.text('address').notNullable();
    table.boolean('active').defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('employees');
}
