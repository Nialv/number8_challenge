import { randomUUID } from 'crypto';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('employees').del();

  // Inserts seed entries
  await knex('employees').insert([
    {
      id: '56b862a1-f41d-4861-bae3-5db838a56206',
      first_name: 'Ronnie',
      last_name: 'Bueso',
      hire_date: '2024-03-10',
      department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6a',
      phone: '1234567890',
      address: 'Res. Santa Cruz',
      active: true,
      avatar_path: 'avatars/56b862a1-f41d-4861-bae3-5db838a56206.jpg'
    },
    {
      id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6a',
      first_name: 'Marelyn',
      last_name: 'Reyes',
      hire_date: '2023-12-12',
      department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6b',
      phone: '0987654321',
      address: 'Res. Santa Cruz',
      active: true,
      avatar_path: 'avatars/a7b54efa-cb7c-47f1-91ee-326dbb730f6a.jpg'
    },
    {
      id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6b',
      first_name: 'Karla',
      last_name: 'Pinto',
      hire_date: '2024-12-12',
      department_id: 'a7b54efa-cb7c-47f1-91ee-326dbb730f6c',
      phone: '0987654321',
      address: 'Res. San Angel',
      active: true,
      avatar_path: 'avatars/a7b54efa-cb7c-47f1-91ee-326dbb730f6b.jpg'
    }
  ]);
}
