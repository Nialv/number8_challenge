import { useContext } from "react";
import { DepartmentsContext } from "@contexts/DepartmentsContext";

export const useDepartments = () => {
  const context = useContext(DepartmentsContext);
  if (!context) {
    throw new Error("useDepartments must be used within a DepartmentsProvider");
  }
  return context;
};
