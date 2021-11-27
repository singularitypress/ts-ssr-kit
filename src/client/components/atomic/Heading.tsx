import React from "react";

interface IProps {
  children: React.ReactNode
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const Heading = ({ children, variant }: IProps) => {
  const variantEl = {
    h1: <h1 className="text-6x1 font-bold">{children}</h1>,
    h2: <h2 className="text-5x1 font-bold">{children}</h2>,
    h3: <h3 className="text-4x1 font-bold">{children}</h3>,
    h4: <h4 className="text-3x1 font-bold">{children}</h4>,
    h5: <h5 className="text-2x1 font-bold">{children}</h5>,
    h6: <h6 className="text-1x1 font-bold">{children}</h6>,
  };
  return (
    <>
      {variantEl[variant]}
    </>
  );
};
