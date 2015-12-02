import React from 'react';
import Helmet from 'react-helmet';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Title from '../_common/Title.jsx';
import Loader from '../_common/Loader.jsx';
import UserList from './UserList.jsx';
import {t} from '../../config/locale';

let UserListView = React.createClass({
  propTypes: {
    users: React.PropTypes.array,
    loading: React.PropTypes.bool.isRequired
  },
  render: function() {
    return (
      <div>
        <Helmet title={t('users.list')}/>
        <Title>{t('users.list')}</Title>
        <Loader isLoading={this.props.loading}>
          <UserList users={this.props.users}/>
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