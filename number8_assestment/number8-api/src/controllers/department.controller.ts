import { Request, Response } from 'express';
import * as DepartmentService from '../services/departments.service';

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await DepartmentService.fetchAllDepartments();
    res.json({
      msg: 'Success getting all departments.',
      totalDepartments: departments.length,
      departments
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export const getEmployeeDepartmentHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const employee_id = req.params.id;
    const department_history =
      await DepartmentService.fetEmployeeDepartmentHistory(employee_id);
    res.status(200).json({ department_history });
  } catch (error) {
    console.error(`Error fetching employee department history: ${error}`);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
