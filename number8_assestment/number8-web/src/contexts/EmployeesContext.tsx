import React, { createContext, useState, useEffect } from "react";
import {
  createEmployee,
  deleteEmployeeById,
  fetchEmployeeById,
  fetchEmployees,
  updateEmployee,
} from "@services/employeeServices";
import { EmployeesContextType, ProviderProps } from "@interfaces/context";
import { EmployeeResponse } from "@interfaces/employee";
import { useAuth } from "@hooks/useAuth";
import { updateEmployeeDepartmentInHistory } from "@services/departmentServices";

export const EmployeesContext = createContext<EmployeesContextType>({
  employees: [],
  getEmployeeById: async () => undefined,
  getAllEmployees: async () => [],
  insertNewEmployee: async () => {},
  modifyExistingEmployee: async () => {},
  deleteExistingEmployee: async () => {},
  modifyEmployeeDepartmentInHistory: async () => {},
});

export const EmployeesProvider: React.FC<ProviderProps> = ({ children }) => {
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getAllEmployees()
        .then((data) => {
          if (data !== null) {
            setEmployees(data);
          } else {
            console.error("Received null data while fetching employees");
          }
        })
        .catch((error) => {
          console.error(`Couldn't fetch employees: ${error}`);
        });
    }
  }, [isAuthenticated]);

  const getEmployeeById = async (
    id: string
  ): Promise<EmployeeResponse | undefined> => {
    try {
      const employee = await fetchEmployeeById(id);
      return employee;
    } catch (error) {
      console.error(`Couldn't fetch employee: ${error}`);
      return undefined;
    }
  };

  const getAllEmployees = async (): Promise<EmployeeResponse[] | null> => {
    try {
      const employee = await fetchEmployees();
      return employee;
    } catch (error) {
      console.error(`Couldn't fetch employee: ${error}`);
      return [];
    }
  };

  const insertNewEmployee = async (
    employee: EmployeeResponse,
    avatar: File
  ): Promise<void> => {
    if (!avatar) {
      throw new Error("Avatar is required");
    }
    try {
      await createEmployee(employee, avatar);
      setEmployees((prev) => [employee, ...prev]);
    } catch (error) {
      console.error(`Couldn't create employee: ${error}`);
    }
  };

  const modifyExistingEmployee = async (
    id: string,
    employee: EmployeeResponse
  ): Promise<void> => {
    try {
      await updateEmployee(id, employee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === id ? employee : emp))
      );
    } catch (error) {
      console.error(`Couldn't update employee: ${error}`);
      throw error;
    }
  };

  const deleteExistingEmployee = async (id: string): Promise<void> => {
    try {
      await deleteEmployeeById(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== id)
      );
    } catch (error) {
      console.error(`Couldn't fetch employee: ${error}`);
    }
  };

  const modifyEmployeeDepartmentInHistory = async (
    employeeId: string,
    newDepartmentId: string
  ) => {
    try {
      await updateEmployeeDepartmentInHistory(employeeId, newDepartmentId);
    } catch (error) {
      console.error(
        `Error updating employee department in history in context: ${error}`
      );
      throw error;
    }
  };

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        getEmployeeById,
        getAllEmployees,
        insertNewEmployee,
        modifyExistingEmployee,
        deleteExistingEmployee,
        modifyEmployeeDepartmentInHistory,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};
