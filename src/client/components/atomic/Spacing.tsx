import * as React from "react";

export const Spacing = (props: { size?: "sm" | "md" | "lg" | "xl" }) => {
  const { size = "sm" } = props;
  const sizes = {
    sm: "py-1",
    md: "py-2",
    lg: "py-3",
    xl: "py-5",
  };
  return (
    <div className={sizes[size]}></div>
  );
};
