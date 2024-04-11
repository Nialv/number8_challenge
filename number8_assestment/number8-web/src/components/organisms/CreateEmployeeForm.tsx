import React from "react";
import { EmployeeResponse } from "@interfaces/employee";
import Input from "@components/atoms/Input";
import Select from "@components/atoms/Select";
import useEmployeeForm from "@hooks/useEmployeeForm";
import Button from "@components/atoms/Button";
import { useDepartments } from "@hooks/useDepartments";
import { SelectOptions } from "@interfaces/selects";
import { useEmployees } from "@hooks/useEmployees";
import { FormValues } from "@interfaces/employeeForms";
import { toast } from "react-toastify";

const CreateEmployeeForm: React.FC = () => {
  const initialValues: FormValues = {
    first_name: "",
    last_name: "",
    hire_date: "",
    department_id: "",
    phone: "",
    address: "",
    active: false,
    avatar: null,
  };

  const { formValues, handleInputChange, resetForm } =
    useEmployeeForm(initialValues);
  const { insertNewEmployee } = useEmployees();

  const { departments } = useDepartments();

  const activeOptions = [
    { id: "true", name: "Active" },
    { id: "false", name: "Inactive" },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const requiredFields = [
      "first_name",
      "last_name",
      "hire_date",
      "department_id",
      "phone",
      "address",
      "active",
      "avatar",
    ];

    const missingFields = requiredFields.filter((field) => {
      if (field === "active")
        return formValues[field] !== "true" && formValues[field] !== "false";
      if (field === "avatar") return !(formValues[field] instanceof File);
      return !formValues[field];
    });

    if (missingFields.length > 0) {
      console.error("Missing required fields: ", missingFields.join(", "));
      return;
    }

    try {
      const employeeData: EmployeeResponse = {
        first_name: String(formValues.first_name),
        last_name: String(formValues.last_name),
        hire_date:
          typeof formValues.hire_date === "string"
            ? new Date(formValues.hire_date)
            : new Date(),
        department_id: String(formValues.department_id),
        phone: String(formValues.phone),
        address: String(formValues.address),
        active: Boolean(formValues.active),
      };

      if (!(formValues.avatar instanceof File)) {
        console.error("Avatar must be a file");
        return;
      }

      const avatarFile = formValues.avatar;

      await insertNewEmployee(employeeData, avatarFile);
      toast.success("Employee created successfully!");

      resetForm();
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("Error creating employee. Please try again.");
    }
  };

  const renderInputField = (key: keyof EmployeeResponse) => {
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    const isRequiredField =
      key === "first_name" ||
      key === "last_name" ||
      key === "hire_date" ||
      key === "department_id" ||
      key === "phone" ||
      key === "address" ||
      key === "active" ||
      key === "avatar";

    const label = capitalize(key.split("_").join(" "));
    const labelText = isRequiredField ? `${label} *` : label;

    if (key === "department_id" || key === "active") {
      return (
        <Select
          key={key}
          name={key}
          value={String(formValues[key])}
          onChange={handleInputChange}
          options={
            key === "department_id"
              ? (departments as SelectOptions[])
              : (activeOptions as SelectOptions[])
          }
          label={labelText}
        />
      );
    } else if (key === "avatar") {
      return (
        <Input
          key={key}
          type="file"
          name={key}
          onChange={handleInputChange}
          label={labelText}
        />
      );
    } else {
      return (
        <Input
          key={key}
          type={key === "hire_date" ? "date" : "text"}
          name={key}
          value={String(formValues[key])}
          onChange={handleInputChange}
          label={labelText}
        />
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-bold mb-2">Create New Employee</h2>
      <div className="grid grid-cols-1 gap-2">
        {Object.keys(initialValues).map((key) =>
          renderInputField(key as keyof EmployeeResponse)
        )}
      </div>
      <Button isPrimary={true} onClick={() => {}}>
        Create Employee
      </Button>
    </form>
  );
};

export default CreateEmployeeForm;
