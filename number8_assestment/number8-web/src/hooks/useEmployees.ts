import { useContext } from "react";
import { EmployeesContext } from "@contexts/EmployeesContext";

export const useEmployees = () => {
  const {
    employees,
    insertNewEmployee,
    modifyExistingEmployee,
    modifyEmployeeDepartmentInHistory,
  } = useContext(EmployeesContext);
  if (
    !employees ||
    !insertNewEmployee ||
    !modifyExistingEmployee ||
    !modifyEmployeeDepartmentInHistory
  ) {
    throw new Error("useEmployees must be used within an EmployeesProvider");
  }
  return {
    employees,
    insertNewEmployee,
    modifyExistingEmployee,
    modifyEmployeeDepartmentInHistory,
  };
};
