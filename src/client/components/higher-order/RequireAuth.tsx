import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { State } from "../../../types";

// {18}
export const RequireAuth = (ChildComponent: typeof React.Component) => {
  class _RequireAuth extends React.Component<{auth: any}> {
    public render () {
      switch (this.props.auth) {
        case false:
          return <Redirect to="/" />;
        case null:
          return <div>Loading...</div>;
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  const mapStateToProps = (state: State) => {
    return { auth: state.auth };
  };

  return connect(mapStateToProps)(_RequireAuth);
};
