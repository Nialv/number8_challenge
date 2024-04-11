import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users_auth').del();

  // Inserts seed entries
  await knex('users_auth').insert([
    {
      username: 'ronnie_bueso',
      email: 'sronnieb@example.com',
      password: '$2a$12$XphHnEglJ82OQldDs5YNn.eQpxeiuj9cqtvcZTSTjPhFtqQ50Pmxq',
      status: true
    },
    {
      username: 'melissa_alvarez',
      email: 'melissa@example.com',
      password: '$2a$12$XphHnEglJ82OQldDs5YNn.eQpxeiuj9cqtvcZTSTjPhFtqQ50Pmxq',
      status: true
    },
    {
      username: 'derek_bueso',
      email: 'derek@example.com',
      password: '$2a$12$XphHnEglJ82OQldDs5YNn.eQpxeiuj9cqtvcZTSTjPhFtqQ50Pmxq',
      status: false
    }
  ]);
}
