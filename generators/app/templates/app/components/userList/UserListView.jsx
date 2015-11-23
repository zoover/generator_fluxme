import React from 'react';
import Helmet from 'react-helmet';
import connectToStores from 'fluxible-addons-react/connectToStores';
import ListItem from '../_common/ListItem.jsx';
import Loader from '../_common/Loader.jsx';

let UserListView = React.createClass({
  propTypes: {
    users: React.PropTypes.array,
    loading: React.PropTypes.bool.isRequired
  },
  render: function() {
    const userRender = (user) => {
      return (
        <ListItem key={user.login} route="userItem" id={user.login} name={user.login}/>
      );
    };

    return (
      <div>
        <h1>User List</h1>
        <Loader isLoading={this.props.loading}>
          <div>
            <ul>{this.props.users.map(userRender)}</ul>
            <Helmet title="User List"/>
          </div>
        </Loader>
      </div>
    );
  }
});

UserListView = connectToStores(UserListView, ['UserStore'], (context, props) => ({
  users: context.getStore('UserStore').getAll(),
  loading: props.isLoading
}));

export default UserListView;