import { useState } from "react";

type FormValues = {
  [key: string]: string | number | boolean | File | null;
};

const useEmployeeForm = (initialValues: FormValues) => {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);

  const resetForm = () => {
    setFormValues(initialValues);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setFormValues((prevValues: FormValues) => ({
          ...prevValues,
          [name]: files[0],
        }));
      }
    } else {
      setFormValues((prevValues: FormValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  return {
    formValues,
    handleInputChange,
    resetForm,
  };
};

export default useEmployeeForm;
