import * as React from "react";

export const Button = (props: { children: React.ReactNode, onClick?: any }) => {
  const shape = "pt-3 pb-3 pr-6 pl-6 rounded-full";
  const text = "text-white hover:text-black dark:text-black dark:hover:text-white font-semibold";
  const border = "border-2 border-solid border-black dark:border-white";
  const colour = "bg-black hover:bg-white dark:bg-white dark:hover:bg-black";
  const animate = "transition duration-300 ease-in-out";

  return (
    <button onTouchEnd={() => { navigator.vibrate(500); }} onClick={props.onClick} className={`${animate} ${text} ${border} ${colour} ${shape}`}>{props.children}</button>
  );
};
