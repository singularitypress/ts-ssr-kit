import * as React from "react";

export const Lazy = (props: {children: React.ReactNode, condition: boolean}) => {
  if (!props.condition) {
    return (
      <span className="flex h-10 w-10 items-center justify-center lazy">
        <span className="animate-ping absolute inline-flex h-20 w-20 rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-10 w-10 bg-indigo-500"></span>
      </span>
    );
  } else {
    return (
      <>
        {props.children}
      </>
    );
  }
};
