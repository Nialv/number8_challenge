import axiosPrivateInstance from "@helpers/axiosPrivateInstance";
import { DepartmentHistoryEntry } from "@interfaces/departments";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/api";

export const getDepartments = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found in cookies");
    }
    const response = await axiosPrivateInstance.get(`${API_URL}/departments`);
    const { departments } = response.data;
    return departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const getEmployeeDepartmentHistory = async (
  employeeId: string
): Promise<DepartmentHistoryEntry[]> => {
  try {
    const response = await axiosPrivateInstance.get(
      `/employee/${employeeId}/department-history`
    );

    return response.data.department_history || [];
  } catch (error) {
    console.error("Error fetching department history:", error);
    throw error;
  }
};

export const updateEmployeeDepartmentInHistory = async (
  employeeId: string,
  newDepartmentId: string
): Promise<void> => {
  try {
    await axiosPrivateInstance.put(`employee/${employeeId}/department`, {
      employeeId,
      newDepartmentId,
    });
  } catch (error) {
    console.error(`Error updating employee department in history: ${error}`);
    throw error;
  }
};
