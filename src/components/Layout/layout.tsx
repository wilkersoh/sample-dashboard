import React from "react";
import { LayoutProps } from "./types";

export const Layout = ({ children, className, ...otherProps }: LayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen ${className}`} {...otherProps}>
      {children}
    </div>
  );
};
