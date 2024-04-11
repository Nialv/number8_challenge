import React from "react";
import Button from "@components/atoms/Button";
import { formatDateWithDuration } from "@helpers/formatDate";
import { getDepartmentName } from "@helpers/getDepartmentName";
import { useDepartments } from "@hooks/useDepartments";
import { EmployeeCardProps } from "@interfaces/employeeCard";
import ImageWithFetch from "@components/atoms/ImageWithFetch";

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onViewDetails,
}) => {
  const { departments } = useDepartments();

  const departmentName = getDepartmentName(departments, employee.department_id);
  const formattedDate = formatDateWithDuration(employee.hire_date);

  return (
    <div className="border rounded-md shadow-md p-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-gray-300">
        <div className="flex items-center space-x-2 md:space-x-4">
          <ImageWithFetch
            src={`${import.meta.env.VITE_API_URL}/${employee.avatar_path}`}
            alt="Antonio Randomillo"
            className="h-12 w-12 md:h-16 md:w-16 rounded-md"
          />
          <div>
            <div className="flex flex-col md:flex-row text-sm md:text-base gap-1">
              <div className="font-bold">{`${employee.first_name} ${employee.last_name}`}</div>
              <div className="text-gray-400">({departmentName})</div>
            </div>
            <div className="mt-1 md:mt-2">
              <div className="text-xs font-bold">Hire Date</div>
              <div className="text-xs text-gray-500">{formattedDate}</div>
            </div>
          </div>
        </div>
        <div className="pr-4">
          <Button isPrimary={true} onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
