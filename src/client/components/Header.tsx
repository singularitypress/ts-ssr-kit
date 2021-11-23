import React from "react";
import { NavLink, useLocation } from "react-router-dom";

interface IProps {
  navItems: {
    label: string;
    href: string;
  }[]
}

export const Header = ({ navItems }: IProps) => {
  return (
    <nav className="bg-theme-base py-3">
      <ul className="flex container mx-auto">
        {navItems.map(
          ({ label, href }) => (
            <li key={label} className="mr-3">
              <NavLink
                className={
                  ({ isActive }) => `py-1 px-3 rounded ${isActive ? "bg-theme-brand text-theme-base" : "text-theme-accent hover:bg-theme-brand hover:text-theme-base"}`
                }
                to={href}>
                  {label}
                </NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};
