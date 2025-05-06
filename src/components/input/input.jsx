import React from "react";

const Input= ({
  label,
  name,
  required = false,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-0 border-b bg-none">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        required={required}
        className="px-2 py-1 rounded-t-lg border-0 outline-none bg-transparent"
        {...rest}
      />
    </div>
  );
};

export default Input;
