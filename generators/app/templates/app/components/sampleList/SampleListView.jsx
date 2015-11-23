import React from 'react';
import Helmet from 'react-helmet';
import connectToStores from 'fluxible-addons-react/connectToStores';
import ListItem from '../_common/ListItem.jsx';
import Loader from '../_common/Loader.jsx';

let SampleListView = React.createClass({
  propTypes: {
    samples: React.PropTypes.array,
    loading: React.PropTypes.bool.isRequired
  },
  render: function() {
    const sampleRender = (sample) => {
      return (
        <ListItem key={sample.id} route="sampleItem" id={sample.id} name={sample.name}/>
      );
    };

    return (
      <div>
        <h1>Sample List</h1>
        <Loader isLoading={this.props.loading}>
          <div>
            <ul>{this.props.samples.map(sampleRender)}</ul>
            <Helmet title="Sample List"/>
          </div>
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