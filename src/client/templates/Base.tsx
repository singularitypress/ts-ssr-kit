import React from "react";
import { Nav } from "../components";
import { NAV } from "../content";

interface IProps {
  children: React.ReactNode
}

export const Base = ({ children }: IProps) => {
  return (
    <>
      <Nav navItems={NAV} />
      <main className="pt-16">
        {children}
      </main>
    </>
  );
};
