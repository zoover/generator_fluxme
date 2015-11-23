import React from 'react';
import Helmet from 'react-helmet';

const NotFound = React.createClass({
  render: function() {
    return (
      <div>
        <p>Not Found :(</p>
        <Helmet title="Not Found" />
      </div>
    );
  }
});

export default NotFound;
