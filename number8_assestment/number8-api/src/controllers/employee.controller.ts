import { Request, Response } from 'express';
import * as EmployeeService from '../services/employee.service';
import { Employee } from '../types/employee';
import { randomUUID } from 'crypto';

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const employee = await EmployeeService.fetchEmployeeById(id);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found.' });
    }

    res
      .status(200)
      .json({ msg: `Success getting employee with id ${id}.`, employee });
  } catch (error) {
    console.error(`Error getting employee by ID: ${error}`);
    res.status(500).json({ msg: 'Internal server error.' });
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeService.fetchAllEmployees();

    res.status(200).json({
      msg: 'Success getting all employees.',
      totalEmployees: employees.length,
      employees
    });
  } catch (error) {
    console.error(`Error getting employees: ${error}`);
    res.status(500).json({ msg: 'Internal server error.' });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      hire_date,
      department_id,
      phone,
      address,
      active
    } = JSON.parse(req.body.employee);
    const avatar = req.file;

    if (
      !first_name ||
      !last_name ||
      !hire_date ||
      !department_id ||
      !phone ||
      !address ||
      typeof active !== 'boolean' ||
      !avatar
    ) {
      return res
        .status(400)
        .json({ msg: 'Employee data or avatar file is missing or invalid.' });
    }

    const employee: Employee = {
      first_name,
      last_name,
      hire_date,
      department_id,
      phone,
      address,
      active
    };

    if (!avatar.buffer) {
      return res
        .status(400)
        .json({ msg: 'Avatar file is missing buffer data.' });
    }

    await EmployeeService.registerNewEmployee(
      {
        id: randomUUID(),
        ...employee
      },
      avatar as Express.Multer.File
    );

    res.status(200).json({ msg: 'Employee created correctly.', employee });
  } catch (error) {
    console.error(`Error creating employee: ${error}`);
    res.status(500).json({ msg: 'Internal server error.' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedEmployee: Employee = req.body.employee;

    await EmployeeService.modifyEmployeeDetails(id, updatedEmployee);

    res
      .status(200)
      .json({ msg: 'Employee updated correctly', employee: updatedEmployee });
  } catch (error) {
    console.error(`Error updating employee: ${error}`);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await EmployeeService.deleteExistingEmployee(id);

    res.status(200).json({ msg: 'Employee deleted correctly' });
  } catch (error) {
    console.error(`Error deleting employee: ${error}`);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const modifyEmployeeDepartment = async (req: Request, res: Response) => {
  try {
    const { employeeId, newDepartmentId } = req.body;
    await EmployeeService.updateEmployeeDepartment(employeeId, newDepartmentId);
    res.status(200).json({ msg: 'Employee department updated successfully' });
  } catch (error) {
    console.error(`Error updating employee department: ${error}`);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
