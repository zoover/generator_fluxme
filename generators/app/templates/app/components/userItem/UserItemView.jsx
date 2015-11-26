import React from 'react';
import Helmet from 'react-helmet';
import {NavLink} from 'fluxible-router';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Loader from '../_common/Loader.jsx';
import NotFound from '../_common/NotFound.jsx';
import {t} from '../../config/locale';

let UserItemView = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired
  },
  render: function() {
    let content;
    if (!this.props.user) {
      content = <NotFound />;
    } else {
      content = (
        <div>
          <h2>{this.props.user.login}</h2>
          <p>{t('users.id')}: {this.props.user.id}</p>
          <Helmet title={this.props.user.login}/>
        </div>
      );
    }
    return (
      <div>
        <Loader isLoading={this.props.loading}>
          {content}
        </Loader>
        <NavLink routeName="userList">{t('users.back_to_list')}</NavLink>
      </div>
    );
  }
});

UserItemView = connectToStores(UserItemView, ['UserStore'], (context, props) => ({
  user: context.getStore('UserStore').getById(props.id),
  loading: props.isLoading
}));

export default UserItemView;