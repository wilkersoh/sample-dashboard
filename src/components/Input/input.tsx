import React from "react";

const Input = ({
  type = "text",
  className,
  name,
  placeholder,
  onChange,
  ...otherProps
}: InputProps) => {
  return (
    <div>
      <input
        type={type}
        className={`border border-gray-300 shadow p-3 w-full rounded ${className}`}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
