import db from '../database';
import { Employee } from '../types/employee';

export const selectAllEmployees = async () => {
  return db('employees').select('*');
};

export const selectEmployeeById = async (id: string) => {
  return db('employees').where({ id }).first();
};

export const updateEmployeeDetails = async (
  id: string,
  employee: Partial<Employee>
) => {
  return db('employees').where({ id }).update(employee);
};

export const deleteEmployeeById = async (id: string) => {
  return db('employees').where({ id }).del();
};

export const insertNewEmployee = async (employee: Employee) => {
  return db('employees').insert(employee);
};
