import * as React from "react";

export const Lazy = (props: {children: React.ReactNode, condition: boolean}) => {
  if (!props.condition) {
    return (
      <>
      </>
    );
  } else {
    return (
      <>
        {props.children}
      </>
    );
  }
};
