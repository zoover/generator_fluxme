const React = require('react');
const ReactDOM = require('react-dom');

import app from './app';

window.React = React; // for Chrome DevTools support

/*
 * Grab dehydrated application state from all stores.
 * Sent from the server
 */
const dehydratedState = window.App;

/*
 * Re-initialize application state and provides the request's
 * context object to the callback
 */
app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }

  const mountNode = document.getElementById('app');
  const Component = app.getComponent();

  window.context = context;

  /*
   * React will "render" the application component at the mountNode and
   * compare the results with the existing server-rendered DOM.
   * If everything matches, React will mount itself on top and attach
   * client-side event handlers.
   */
  ReactDOM.render(
    <Component context={context.getComponentContext()} />,
    mountNode,
    () => {
      console.log('React client-side rendered.');
    }
  );
});