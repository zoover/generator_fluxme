import React from 'react';
import ListItem from '../_common/ListItem.jsx';

const SampleList = React.createClass({
  propTypes: {
    samples: React.PropTypes.array
  },
  render: function() {
    const sampleRender = (sample) => {
      return (
        <ListItem key={sample.id} route="sampleItem" id={sample.id} name={sample.name}/>
      );
    };
    return (
      <ul>{this.props.samples.map(sampleRender)}</ul>
    );
  }
});

export default SampleList;