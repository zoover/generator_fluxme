import React from 'react';

const LayoutComponent = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    markup: React.PropTypes.object.isRequired,
    state: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <title>{ this.props.title }</title>
          <link rel="stylesheet" href="/public/assets/styles/main.css" />
        </head>
        <body>
          <h1>{ this.props.title }</h1>
          <div id="app">{ this.props.markup }</div>
          <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
          <script src="/public/scripts/bundle.js"></script>
        </body>
      </html>
    );
  }
});

export default LayoutComponent;
