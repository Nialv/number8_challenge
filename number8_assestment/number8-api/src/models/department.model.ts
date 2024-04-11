import db from '../database';
import { Department } from '../types/department';

export const selectAllDepartments = async (): Promise<Department[]> => {
  return db('departments').select('*');
};
