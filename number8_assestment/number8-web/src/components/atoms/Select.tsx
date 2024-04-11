import { SelectOptions } from "@interfaces/selects";
import React from "react";

interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOptions[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  options,
  label,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-md font-medium text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}:
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-base border-gray-300 rounded-md py-2 px-3"
        required={true}
      >
        <option value="" disabled hidden>
          Choose an option
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id} className="text-base">
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
