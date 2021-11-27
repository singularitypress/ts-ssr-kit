import React from "react";

interface IProps {
  type: "text" | "number";
  placeholder?: string;
}

export const Input = ({ type, placeholder }: IProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        mt-0
        block
        w-full
        border-0
        border-b-2
        border-theme-accent
        focus:ring-0
        bg-transparent
      `} />
  );
};
