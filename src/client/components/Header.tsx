import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { State, IHeader } from "../../types";
import { connect } from "react-redux";

const _Header = (props: IHeader) => {
  const authBtn =
  props.auth
    ? (<a href="/api/logout">Logout</a>)
    : (<a href="/api/auth/google">Login</a>);

  const setActiveClass = (route: string) =>
    useLocation().pathname === route ? "active" : "";

  const unusedNavLinks = () => {
    return (
      <>
        <li className={setActiveClass("/users")}>
          <Link to="/users">Users</Link>
        </li>
        <li className={setActiveClass("/admins")}>
          <Link to="/admins">Admins</Link>
        </li>
        <li className={setActiveClass("/charts")}>
          <Link to="/charts">Chart Dashboard</Link>
        </li>
        <li>{authBtn}</li>
      </>
    );
  };
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

const mapStateToProps = ({ auth }: State) => {
  return { auth };
};

export const Header = connect(mapStateToProps)(_Header);
