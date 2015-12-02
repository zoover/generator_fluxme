import React from 'react';

const Container = React.createClass({

  propTypes: {
    fluid: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node
  },
  getDefaultProps: function() {
    return {
      fluid: false
    };
  },
  render: function() {
    return (
      <div className={this.props.fluid ? 'container-fluid' : 'container'}>
        {this.props.children}
      </div>
    );
  }
});

export default Container;
