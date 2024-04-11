import React, { useState } from "react";
import EmployeeCard from "@components/molecules/EmployeeCard";
import { useEmployees } from "@hooks/useEmployees";
import PaginationButton from "@components/molecules/PaginationButton";
import EmployeeDetailsModal from "@components/organisms/EmployeeDetailsModal";
import { useDepartments } from "@hooks/useDepartments";
import { EmployeeResponse } from "@interfaces/employee";

const ITEMS_PER_PAGE = 7;

const EmployeeList: React.FC = () => {
  const { employees } = useEmployees();
  const { departments } = useDepartments();
  const { modifyExistingEmployee } = useEmployees();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeResponse | null>(null);

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentPageEmployees = employees.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (employee: EmployeeResponse) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleUpdateEmployee = async (updatedEmployee: EmployeeResponse) => {
    if (updatedEmployee.id) {
      await modifyExistingEmployee(updatedEmployee.id!, updatedEmployee);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      <div className="flex-1 overflow-auto space-y-4">
        {currentPageEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onViewDetails={() => handleViewDetails(employee)}
          />
        ))}
      </div>
      <div className="mt-4">
        <PaginationButton
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
      <EmployeeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={selectedEmployee}
        departments={departments}
        updateEmployee={handleUpdateEmployee}
      />
    </div>
  );
};

export default EmployeeList;
