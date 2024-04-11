import React, { createContext, useState, useEffect } from "react";

import { ProviderProps } from "@interfaces/context";

import { DepartmentsContextType } from "@interfaces/context";
import { Department, DepartmentHistoryEntry } from "@interfaces/departments";
import {
  getDepartments,
  getEmployeeDepartmentHistory,
} from "@services/departmentServices";
import { useAuth } from "@hooks/useAuth";
export const DepartmentsContext = createContext<DepartmentsContextType>({
  departments: [],
  getAllDepartments: async () => {},
  fetchEmployeeDepartmentHistory: async () => [],
});

export const DepartmentsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getAllDepartments()
        .then((data) => {
          if (data !== null) {
            setDepartments(data);
          } else {
            console.error("Received null data while fetching departments");
          }
        })
        .catch((error) => {
          console.error(`Couldn't fetch departments: ${error}`);
        });
    }
  }, [isAuthenticated]);

  const getAllDepartments = async () => {
    try {
      const departments = await getDepartments();
      return departments;
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchEmployeeDepartmentHistory = async (
    employeeId: string
  ): Promise<DepartmentHistoryEntry[]> => {
    try {
      const history = await getEmployeeDepartmentHistory(employeeId);
      return history || [];
    } catch (error) {
      console.error("Error fetching department history:", error);
      throw error;
    }
  };

  return (
    <DepartmentsContext.Provider
      value={{ departments, getAllDepartments, fetchEmployeeDepartmentHistory }}
    >
      {children}
    </DepartmentsContext.Provider>
  );
};
