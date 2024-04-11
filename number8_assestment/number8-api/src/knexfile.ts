import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PSQL_DB_HOST,
      user: process.env.PSQL_DB_USER,
      password: process.env.PSQL_DB_PASSWORD,
      database: process.env.PSQL_DB_DATABASE,
      port: process.env.PSQL_DB_PORT
        ? parseInt(process.env.PSQL_DB_PORT, 10)
        : 5432
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations'
    },
    seeds:{
      directory: __dirname + '/database/seeds'
    }
  }
};

export default config;