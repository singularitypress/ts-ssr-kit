import React, { ChangeEvent } from "react";

interface IProps {
  type: "text" | "number";
  placeholder?: string;
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ type, placeholder, onChange }: IProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
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
