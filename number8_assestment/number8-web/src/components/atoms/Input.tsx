import { InputProps } from "@interfaces/input";
import React from "react";

const Input: React.FC<InputProps & { showAsterisk?: boolean }> = ({
  value,
  onChange,
  label,
  type = "text",
  name,
  showAsterisk = false,
}) => {
  return (
    <div className="mb-2 relative">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}
        {showAsterisk && <span className="text-red-500">*</span>}:
      </label>
      <input
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-base border-gray-300 rounded-md py-2 px-3 shadow-sm"
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        required={true}
        style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
      />
    </div>
  );
};

export default Input;
