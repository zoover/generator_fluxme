import React from 'react';
import Helmet from 'react-helmet';
import {t} from '../../config/locale';

const NotFound = React.createClass({
  render: function() {
    return (
      <div>
        <p>{t('general.not_found')}</p>
        <Helmet title={t('general.not_found')} />
      </div>
    );
  }
});

export default NotFound;
