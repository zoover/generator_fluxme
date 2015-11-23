import React from 'react';
import Helmet from 'react-helmet';

const Loader = React.createClass({

  propTypes: {
    isLoading: React.PropTypes.bool.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.arrayOf(React.PropTypes.object)
    ])
  },
  getDefaultProps: function() {
    return {
      isLoading: false
    };
  },
  render: function() {
    return !this.props.isLoading ? this.props.children
      : (
      <div>
        <p>Loading ...</p>
        <Helmet title="Loading ..."/>
      </div>
    );
  }
});

export default Loader;
