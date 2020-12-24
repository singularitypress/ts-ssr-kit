import * as React from "react";

export const Button = (props: { children: React.ReactNode }) => {
  const shape = "pt-3 pb-3 pr-6 pl-6 rounded-full";
  const colour = "bg-indigo-400 hover:bg-indigo-500";
  const animate = "transition duration-300 ease-in-out";
  return (
    <button className={`${animate} ${colour} ${shape}`}>{props.children}</button>
  );
};
