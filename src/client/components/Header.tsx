import * as React from "react";
import { Link } from "react-router-dom";
import { State } from "../../types";
import { connect } from "react-redux";

const _Header = (props: { auth: any }) => {
  const authBtn = props.auth ? (<a href="/api/logout">Logout</a>) : (<a href="/api/auth/google">Login</a>);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/admins">Admins</Link>
        </li>
        <li>
          {authBtn}
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ auth }: State) => {
  return { auth };
};

export const Header = connect(mapStateToProps)(_Header);
