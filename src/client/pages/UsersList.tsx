import * as React from "react";
import { connect } from "react-redux";
import { Store } from "redux";
import { Helmet } from "react-helmet";

import { fetchUsers } from "./../actions";
import { State, Users } from "../../types";

interface props {
  users: Array<Users>;
  fetchUsers: Function;
}

class _UsersList extends React.Component<props> {
  public constructor (props: props) {
    super(props);

    this.renderusers = this.renderusers.bind(this);
  }

  public componentDidMount () {
    this.props.fetchUsers();
  }

  public renderusers () {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  public head () {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users`}</title>
      </Helmet>
    );
  }

  public render () {
    return (
      <React.Fragment>
        {this.head()}
        <div>
          <p>{"Here's a big list of users"}</p>
          <ul>{this.renderusers()}</ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State) => {
  return { users: state.users };
};

// {1}
const loadData = (store: Store) => {
  return store.dispatch(fetchUsers() as any);
};

// {1}
export const UsersList = {
  component: connect(mapStateToProps, { fetchUsers })(_UsersList),
  loadData,
};
