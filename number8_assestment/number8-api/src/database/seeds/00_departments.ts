import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(
    'ALTER TABLE department_history DROP CONSTRAINT department_history_new_department_id_foreign'
  );

  await knex('departments').del();

  await knex('departments').insert([
    { id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6a', name: 'IT' },
    { id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6b', name: 'HR' },
    { id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6c', name: 'Finance' }
  ]);

  await knex.raw(
    'ALTER TABLE department_history ADD CONSTRAINT department_history_new_department_id_foreign FOREIGN KEY (new_department_id) REFERENCES departments(id)'
  );
}
