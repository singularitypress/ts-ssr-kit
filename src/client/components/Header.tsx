import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IHeader } from "../../types";

export const Header = (props: IHeader) => {
  return (
    <nav>
      <ul className="nav">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/theme"exact={true} activeClassName="active">Theme</NavLink>
        </li>
      </ul>
    </nav>
  );
};
