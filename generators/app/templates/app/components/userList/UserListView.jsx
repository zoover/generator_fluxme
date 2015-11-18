import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import ListItem from '../_common/ListItem.jsx';

let UserListView = React.createClass({
  propTypes: {
    users: React.PropTypes.array
  },
  render: function() {
    const userRender = (user) => {
      return (
        <ListItem key={user.login} route="userItem" id={user.login} name={user.login} />
      );
    };
    return (
      <div>
        <h2>User List</h2>
        <ul>
          {this.props.users.map(userRender)}
        </ul>
      </div>
    );
  }
});

UserListView = connectToStores(UserListView, ['UserListStore'], (context) => ({
  users: context.getStore('UserListStore').getUsers()
}));

export default UserListView;
