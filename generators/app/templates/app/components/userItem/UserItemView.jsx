import React from 'react';
import {NavLink} from 'fluxible-router';
import connectToStores from 'fluxible-addons-react/connectToStores';

let UserItemView = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },
  render: function() {
    if (!this.props.user) {
      return false;
    }
    return (
      <div>
        <h2>{this.props.user.login}</h2>
        <p>User ID: {this.props.user.id}</p>
        <NavLink routeName="userList">Back to users list</NavLink>
      </div>
    );
  }
});

UserItemView = connectToStores(UserItemView, ['UserItemStore'], (context) => ({
  user: context.getStore('UserItemStore').getUser()
}));

export default UserItemView;
