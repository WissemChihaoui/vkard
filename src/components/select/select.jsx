import React from "react";

const Select = ({ label, name, options = [], required = false, ...rest }) => {
  return (
    <div className="flex flex-col gap-0 border-b bg-none">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        required={required}
        className="px-2 py-1 rounded-t-lg border-0 outline-none bg-transparent text-white"
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-n-4">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
