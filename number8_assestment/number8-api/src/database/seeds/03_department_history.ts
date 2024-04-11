import { randomUUID } from 'crypto';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('department_history').del();

  // Inserts seed entries
  await knex('department_history').insert([
    {
      id: randomUUID(),
      employee_id: '56b862a1-f41d-4861-bae3-5db838a56206',
      old_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6a',
      new_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6b',
      timestamp: new Date('2024-03-10')
    },
    {
      id: randomUUID(),
      employee_id: '56b862a1-f41d-4861-bae3-5db838a56206',
      old_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6b',
      new_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6c',
      timestamp: new Date('2024-04-15')
    },
    {
      id: randomUUID(),
      employee_id: '56b862a1-f41d-4861-bae3-5db838a56206',
      old_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6c',
      new_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6a',
      timestamp: new Date('2024-05-20')
    },
    {
      id: randomUUID(),
      employee_id: '56b862a1-f41d-4861-bae3-5db838a56206',
      old_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6a',
      new_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6b',
      timestamp: new Date('2024-06-25')
    },
    {
      id: randomUUID(),
      employee_id: '56b862a1-f41d-4861-bae3-5db838a56206',
      old_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6b',
      new_department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6c',
      timestamp: new Date('2024-07-30')
    }
  ]);
}
