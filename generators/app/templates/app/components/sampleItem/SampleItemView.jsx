import React from 'react';
import Helmet from 'react-helmet';
import {NavLink} from 'fluxible-router';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Loader from '../_common/Loader.jsx';
import NotFound from '../_common/NotFound.jsx';

let SampleItemView = React.createClass({
  propTypes: {
    sample: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired
  },
  render: function() {
    let content;
    if (!this.props.sample) {
      content = <NotFound />;
    } else {
      content = (
        <div>
          <h2>{this.props.sample.name}</h2>
          <p>Sample ID: {this.props.sample.id}</p>
          <Helmet title={this.props.sample.name}/>
        </div>
      );
    }
    return (
      <div>
        <Loader isLoading={this.props.loading}>
          {content}
        </Loader>
        <NavLink routeName="sampleList">Back to sample list</NavLink>
      </div>
    );
  }
});

SampleItemView = connectToStores(SampleItemView, ['SampleStore'], (context, props) => ({
  sample: context.getStore('SampleStore').getById(parseInt(props.id)),
  loading: props.isLoading
}));

export default SampleItemView;