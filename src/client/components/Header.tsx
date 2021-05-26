import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { IHeader } from "../../types";

export const Header = (props: IHeader) => {
  const setActiveClass = (route: string) =>
    useLocation().pathname === route ? "active" : "";

  return (
    <nav>
      <ul className="nav">
        <li className={setActiveClass("/")}>
          <Link to="/">Home</Link>
        </li>
        <li className={setActiveClass("/theme")}>
          <Link to="/theme">Theme</Link>
        </li>
      </ul>
    </nav>
  );
};
