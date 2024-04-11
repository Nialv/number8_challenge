import db from '../database';
import { randomUUID } from 'crypto';
import { DepartmentHistoryEntry } from '../types/department';

export const insertDepartmentHistoryEntry = async (
  entry: Partial<DepartmentHistoryEntry>
): Promise<void> => {
  try {
    await db('department_history').insert({
      id: randomUUID(),
      ...entry,
      timestamp: new Date()
    });
  } catch (error) {
    console.error(`Error inserting department history entry: ${error}`);
    throw error;
  }
};

export const getDepartmentHistoryForEmployee = async (
  employee_id: string
): Promise<DepartmentHistoryEntry[]> => {
  try {
    return await db('department_history')
      .select('*')
      .where({ employee_id })
      .orderBy('timestamp', 'desc');
  } catch (error) {
    console.error(`Error retrieving department history for employee: ${error}`);
    throw error;
  }
};
