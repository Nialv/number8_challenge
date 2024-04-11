import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('employees', table => {
    table.string('avatar_path').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('employees', table => {
    table.dropColumn('avatar_path');
  });
}