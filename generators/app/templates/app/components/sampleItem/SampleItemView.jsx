import React from 'react';
import {NavLink} from 'fluxible-router';
import connectToStores from 'fluxible-addons-react/connectToStores';

let SampleView = React.createClass({
  propTypes: {
    sample: React.PropTypes.object
  },
  render: function() {
    if (this.props.sample === null) {
      return false;
    }
    return (
      <div>
        <h2>{this.props.sample.name}</h2>
        <p>Province: {this.props.sample.province}</p>
        <NavLink routeName="sampleList">Back to list</NavLink>
      </div>
    );
  }
});

SampleView = connectToStores(SampleView, ['SampleItemStore'], (context) => ({
  sample: context.getStore('SampleItemStore').getSample()
}));

export default SampleView;
