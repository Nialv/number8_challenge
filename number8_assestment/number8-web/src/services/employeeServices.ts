import { EmployeeResponse } from "@interfaces/employee";
import axiosPrivateInstance from "@helpers/axiosPrivateInstance";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchEmployeeById = async (
  id: string
): Promise<EmployeeResponse | undefined> => {
  try {
    const response = await axiosPrivateInstance.get<EmployeeResponse>(
      `${API_BASE_URL}/employee/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};

export const fetchEmployees = async (): Promise<EmployeeResponse[] | null> => {
  try {
    const response = await axiosPrivateInstance.get(`${API_BASE_URL}/employee`);
    return response.data.employees;
  } catch (error) {
    console.error(`Error fetching employees:`, error);
    throw error;
  }
};

export const createEmployee = async (
  employee: EmployeeResponse,
  avatar: File | null
): Promise<void> => {
  const formData = new FormData();

  formData.append(
    "employee",
    JSON.stringify({
      first_name: employee.first_name,
      last_name: employee.last_name,
      hire_date: employee.hire_date,
      department_id: employee.department_id,
      phone: employee.phone,
      address: employee.address,
      active: employee.active,
    })
  );

  if (avatar) {
    formData.append("avatar", avatar);
  }

  try {
    await axiosPrivateInstance.post(`${API_BASE_URL}/employee`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

export const updateEmployee = async (
  id: string,
  employee: EmployeeResponse
): Promise<void> => {
  try {
    await axiosPrivateInstance.put(`${API_BASE_URL}/employee/${id}`, {
      employee,
    });
  } catch (error) {
    console.error(`Error updating employee with id ${id}:`, error);
    throw error;
  }
};

export const deleteEmployeeById = async (id: string): Promise<void> => {
  try {
    await axiosPrivateInstance.delete<EmployeeResponse>(
      `${API_BASE_URL}/employee/${id}`
    );
  } catch (error) {
    console.error(`Error deleting employee with id ${id}:`, error);
    throw error;
  }
};
