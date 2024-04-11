import db from '../database';

export const getAllUsers = async (username: string) => {
  const result = await knexTableName().select('*').where({ username });
  return result;
};

const knexTableName = () => {
  return db('users_auth');
};
