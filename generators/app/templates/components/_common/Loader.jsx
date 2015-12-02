import React from 'react';
import Helmet from 'react-helmet';
import {t} from '../../config/locale';

const Loader = React.createClass({

  propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node
  },
  getDefaultProps: function() {
    return {
      isLoading: false
    };
  },
  render: function() {
    if (this.props.isLoading) {
      return (
        <div>
          <p>{t('general.loading')}</p>
          <Helmet title={t('general.loading')}/>
        </div>
      );
    }
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export default Loader;
