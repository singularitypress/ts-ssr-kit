import React, { ReactChildren } from "react";
import { Header } from "../components";
import { NAV } from "../content";

interface IProps {
  children: React.ReactNode
}

export const Base = ({ children }: IProps) => {
  return (
    <>
      <Header navItems={NAV} />
      <main>
        {children}
      </main>
    </>
  );
};
