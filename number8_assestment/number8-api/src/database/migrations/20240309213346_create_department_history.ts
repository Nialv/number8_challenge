import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable('department_history', table => {
    table.uuid('id').primary();
    table
      .uuid('employee_id')
      .unsigned()
      .references('id')
      .inTable('employees')
      .onDelete('CASCADE');
    table
      .uuid('old_department_id')
      .unsigned()
      .references('id')
      .inTable('departments')
      .onDelete('CASCADE');
    table
      .uuid('new_department_id')
      .unsigned()
      .references('id')
      .inTable('departments')
      .onDelete('CASCADE');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('department_history');
}
