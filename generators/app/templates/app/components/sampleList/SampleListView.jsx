import React from 'react';
import Helmet from 'react-helmet';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Title from '../_common/Title.jsx';
import Loader from '../_common/Loader.jsx';
import SampleList from './SampleList.jsx';
import {t} from '../../config/locale';

let SampleListView = React.createClass({
  propTypes: {
    samples: React.PropTypes.array,
    loading: React.PropTypes.bool.isRequired
  },
  render: function() {
    return (
      <div>
        <Helmet title={t('samples.list')}/>
        <Title>{t('samples.list')}</Title>
        <Loader isLoading={this.props.loading}>
          <SampleList samples={this.props.samples}/>
        </Loader>
      </div>
    );
  }
});

SampleListView = connectToStores(SampleListView, ['SampleStore'], (context, props) => ({
  samples: context.getStore('SampleStore').getAll(),
  loading: props.isLoading
}));

export default SampleListView;