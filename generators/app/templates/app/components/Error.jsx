import React from 'react';

const Error = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta charSet="UTF-8"/>
          <title>Not found</title>
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          <link rel="stylesheet" href="/styles/main.css"/>
        </head>
        <body>
          Oh noes! This page is not found :(
        </body>
      </html>
    );
  }
});

export default Error;
