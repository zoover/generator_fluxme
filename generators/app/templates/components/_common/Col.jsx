import React from 'react';

const Col = React.createClass({

  propTypes: {
    width: React.PropTypes.string,
    children: React.PropTypes.node
  },
  render: function() {
    return (
      <div className={'col-' + this.props.width}>
        {this.props.children}
      </div>
    );
  }
});

export default Col;
