import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  navItems: {
    label: string;
    href: string;
  }[];
}

export const Nav = ({ navItems }: IProps) => {
  const activeClass = (isActive: boolean) => {
    return isActive ? "border-b-2 border-theme-accent font-bold" : "";
  };

  return (
    <nav className="bg-theme-base h-16 fixed w-screen top-0 left-0">
      <ul
        className={"flex container mx-auto h-full justify-center items-center"}
      >
        {navItems.map(({ label, href }) => (
          <li key={label} className="mr-3">
            <NavLink
              className={({ isActive }) =>
                `py-1 px-3 text-theme-accent ${activeClass(isActive)}`
              }
              to={href}
            >
              {label.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
