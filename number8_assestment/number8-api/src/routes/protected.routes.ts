import {
  getEmployeeById,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  modifyEmployeeDepartment
} from '../controllers/employee.controller';

import { Router } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import {
  getAllDepartments,
  getEmployeeDepartmentHistory
} from '../controllers/department.controller';

const router = Router();

/* Employees Private Routes */

router.get('/employee/:id', verifyToken, getEmployeeById);

router.get('/employee', verifyToken, getAllEmployees);

router.post('/employee', verifyToken, createEmployee);

router.put('/employee/:id', verifyToken, updateEmployee);

router.delete('/employee/:id', verifyToken, deleteEmployee);

router.put('/employee/:id/department', verifyToken, modifyEmployeeDepartment);

router.get(
  '/employee/:id/department-history',
  verifyToken,
  getEmployeeDepartmentHistory
);

/* Departments Private Routes */

router.get('/departments', verifyToken, getAllDepartments);

export default router;
