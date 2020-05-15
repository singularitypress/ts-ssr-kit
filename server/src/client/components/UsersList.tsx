import * as React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "./../actions";
import { State, Users } from "../../types";

interface props {
  users: Array<Users>;
  fetchUsers: Function;
}

class UsersList extends React.Component<props> {
  public constructor(props: props) {
    super(props);

    this.renderusers = this.renderusers.bind(this);
  }

  public componentDidMount() {
    this.props.fetchUsers();
  }

  public renderusers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  public render() {
    console.log(this.props.users);
    return (
      <div>
        <p>{"Here's a big list of users"}</p>
        <ul>{this.renderusers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return { users: state.users };
};

export default connect(mapStateToProps, { fetchUsers })(UsersList);
