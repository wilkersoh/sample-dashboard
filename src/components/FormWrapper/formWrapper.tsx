import React, { Children, cloneElement } from "react";
import { FormWrapperProps } from "./types";

const FormWrapper = ({ className, label, children }: FormWrapperProps) => {
  const renderFormLabel = (): JSX.Element => {
    if (typeof label === "string") {
      return (
        <label className="block mb-2 font-bold text-gray-600">{label}</label>
      );
    }

    return <label {...label}></label>;
  };

  const renderChildren = (): JSX.Element | JSX.Element[] => {
    return Children.map(children, (child) => cloneElement(child));
  };

  return (
    <div className={className}>
      {label && renderFormLabel()} {renderChildren()}
    </div>
  );
};

export default FormWrapper;
