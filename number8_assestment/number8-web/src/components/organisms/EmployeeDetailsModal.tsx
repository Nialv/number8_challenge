import React, { useState, useEffect } from "react";
import Modal from "@components/molecules/Modal";
import Select from "@components/atoms/Select";
import Button from "@components/atoms/Button";
import { EmployeeDetailsModalProps } from "@interfaces/modals";
import { useEmployees } from "@hooks/useEmployees";
import { useDepartments } from "@hooks/useDepartments";
import { SelectOptions } from "@interfaces/selects";
import { formatDateWithDuration } from "@helpers/formatDate";
import { getEmployeeDepartmentHistory } from "@services/departmentServices";
import { DepartmentHistoryEntry } from "@interfaces/departments";
import { getDepartmentName } from "@helpers/getDepartmentName";
import { EmployeeResponse } from "@interfaces/employee";
import { toast } from "react-toastify";
import ImageWithFetch from "@components/atoms/ImageWithFetch";

const EmployeeDetailsModal: React.FC<EmployeeDetailsModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isDepartmentChanged, setIsDepartmentChanged] = useState(false);
  const [departmentHistory, setDepartmentHistory] = useState<
    DepartmentHistoryEntry[]
  >([]);
  const [isActive, setIsActive] = useState(true);
  const [employeeModal, setEmployeeModal] = useState<EmployeeResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const { modifyExistingEmployee, modifyEmployeeDepartmentInHistory } =
    useEmployees();
  const { departments } = useDepartments();

  useEffect(() => {
    if (employee) {
      setSelectedDepartment(employee.department_id);
      setIsActive(employee.active);
      setIsDepartmentChanged(false);
      setEmployeeModal(employee);
    }
  }, [employee]);

  useEffect(() => {
    if (employee) {
      fetchDepartmentHistory(employee.id);
    }
  }, [employee]);

  const fetchDepartmentHistory = async (employeeId: string) => {
    try {
      const history = await getEmployeeDepartmentHistory(employeeId);
      setDepartmentHistory(history);
    } catch (error) {
      console.error("Error fetching department history:", error);
    }
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDepartment(event.target.value);
    setIsDepartmentChanged(event.target.value !== employeeModal?.department_id);
  };

  const handleUpdateClick = async () => {
    if (employee && selectedDepartment) {
      const updatedEmployee = {
        ...employee,
        department_id: selectedDepartment,
      };

      try {
        setIsLoading(true);
        await modifyExistingEmployee(employee.id, updatedEmployee);
        await modifyEmployeeDepartmentInHistory(
          employee.id,
          selectedDepartment
        );

        const updatedEmployeeWithNewDepartment = {
          ...updatedEmployee,
          department_id: selectedDepartment,
        };

        setDepartmentHistory([
          {
            id: "",
            employee_id: employee.id,
            old_department_id: employee.department_id,
            new_department_id: selectedDepartment,
            timestamp: new Date(),
          },
          ...departmentHistory,
        ]);

        setEmployeeModal(updatedEmployeeWithNewDepartment);
        toast.success("Employee department updated successfully!");
      } catch (error) {
        toast.error("Error updating employee department. Please try again.");
        console.error(`Error updating employee department: ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleActiveStatusToggle = async () => {
    if (employee) {
      try {
        setIsLoading(true);
        const updatedStatus = !isActive;
        setIsActive(updatedStatus);

        const updatedEmployee = {
          ...employee,
          active: updatedStatus,
        };

        await modifyExistingEmployee(employee.id, updatedEmployee);
        toast.success("Employee status updated successfully!");
      } catch (error) {
        toast.error("Error updating employee status. Please try again.");
        console.error("Error updating employee status:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {employee && (
        <div className="bg-white rounded-md max-w-4xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="md:col-span-1 relative">
              <ImageWithFetch
                src={`${import.meta.env.VITE_API_URL}/${employee.avatar_path}`}
                alt="Antonio Randomillo"
                className="h-100 w-100 md:h-100 md:w-100 rounded-md"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm justify-center">
                {employeeModal?.active ? "Active" : "Inactive"}
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mr-3old mb-4">
                {employeeModal?.first_name} {employeeModal?.last_name}
              </h3>
              <p className="text-md mb-1">
                <span className="font-semibold mr-3">ID:</span>
                {employeeModal?.id}
              </p>
              <p className="text-md mb-1">
                <span className="font-semibold mr-3">Department:</span>
                {
                  departments.find((d) => d.id === employeeModal?.department_id)
                    ?.name
                }
              </p>
              <p className="text-md mb-1">
                <span className="font-semibold mr-3">Telephone:</span>
                {employeeModal?.phone}
              </p>
              <p className="text-md mb-1">
                <span className="font-semibold mr-3">Address:</span>
                {employeeModal?.address}
              </p>
              <p className="text-md mb-1 flex gap-2">
                <span className="font-semibold">Hire Date:</span>
                {formatDateWithDuration(employeeModal?.hire_date || new Date())}
                <Button
                  onClick={handleActiveStatusToggle}
                  isPrimary={!isActive}
                  style={{
                    backgroundColor: employeeModal?.active ? "red" : "green",
                    color: "white",
                  }}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : isActive
                    ? "Deactivate"
                    : "Activate"}
                </Button>
              </p>
              {departments.length > 0 && (
                <div className="flex d-inline flex-col gap-2">
                  <Select
                    label="Update Department"
                    name="departments"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    options={departments as SelectOptions[]}
                  />
                  <div className="flex justify-end">
                    <div className="max-h-10 overflow-hidden">
                      <Button
                        onClick={handleUpdateClick}
                        disabled={!isDepartmentChanged || isLoading}
                        isPrimary={isDepartmentChanged}
                      >
                        {isLoading ? "Processing..." : "Update"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-3 mt-4">
              <div className="shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Department
                      </th>
                    </tr>
                  </thead>
                </table>
                <div className="max-h-60 overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {departmentHistory.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {new Date(item.timestamp).toLocaleDateString(
                              "en-US"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getDepartmentName(
                              departments,
                              item.new_department_id
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EmployeeDetailsModal;
