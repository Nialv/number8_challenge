import { Department } from "@interfaces/departments";

export const getDepartmentName = (
  departments: Department[],
  department_id: string
): string => {
  const department = departments.find((dep) => dep.id === department_id);
  return department ? department.name : "";
};
