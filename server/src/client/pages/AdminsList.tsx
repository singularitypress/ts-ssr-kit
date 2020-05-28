import * as React from "react";
import { connect } from "react-redux";
import { fetchAdmins } from "./../actions";
import { State, IAdminsListProps } from "../../types";
import { Store } from "redux";

class _AdminsList extends React.Component<IAdminsListProps> {
  public constructor (props: IAdminsListProps) {
    super(props);

    this.renderAdmins = this.renderAdmins.bind(this);
  }

  public componentDidMount () {
    this.props.fetchAdmins();
  }

  public renderAdmins () {
    return this.props.admins.map((admin) => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }

  public render () {
    return (
      <div>
        <p>{"Here's a big list of Admins"}</p>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return { admins: state.admins };
};

// {1}
export const AdminsList = {
  component: connect(mapStateToProps, { fetchAdmins })(_AdminsList),
  title: "Admins List",
  loadData: (store: Store) => {
    return store.dispatch(fetchAdmins() as any);
  },
};
