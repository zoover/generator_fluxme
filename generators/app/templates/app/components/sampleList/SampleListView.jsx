import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import ListItem from '../_common/ListItem.jsx';

let SampleListView = React.createClass({
  propTypes: {
    samples: React.PropTypes.array
  },
  render: function() {
    const sampleRender = (sample) => {
      return (
        <ListItem key={sample.id} route="sampleItem" id={sample.id} name={sample.name} />
      );
    };
    return (
      <div>
        <h2>Sample List</h2>
        <ul>
          {this.props.samples.map(sampleRender)}
        </ul>
      </div>
    );
  }
});

SampleListView = connectToStores(SampleListView, ['SampleListStore'], (context) => ({
  samples: context.getStore('SampleListStore').getSamples()
}));

export default SampleListView;
