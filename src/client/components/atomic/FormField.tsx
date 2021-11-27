import React from "react";

interface IProps {
  children: React.ReactNode;
  label: string;
}

export const FormField = ({ label, children }: IProps) => {
  return (
    <label className="block">
      <span>{label}</span>
      {children}
    </label>
  );
};
