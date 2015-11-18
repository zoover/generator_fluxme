const express = require('express');
const React = require('react');

const ReactDOMServer = require('react-dom/server');
const navigateAction = require('fluxible-router').navigateAction;
const serialize = require('serialize-javascript');

import LayoutComponent from './components/Layout.jsx';
import app from './app';

// In order th enable sharing services between client and server, we need
// to make them available by registering services on the app
import registerServices from './config/services';
registerServices(app);

const server = express();

server.use('/public', express.static('./build'));

// Fetchr registration on the server, this enables us to share services between client and server
// Middleware Magic!
server.use(app.getPlugin('FetchrPlugin').getXhrPath(), app.getPlugin('FetchrPlugin').getMiddleware());

server.use(function(req, res /* , next */ ) {
  const context = app.createContext();
  const actionContext = context.getActionContext();
  actionContext.executeAction(navigateAction, {url: req.url}, ( /* err */ ) => {
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
    const Component = app.getComponent();

    const html = ReactDOMServer.renderToStaticMarkup(
      <LayoutComponent
        title="React Fluxible Boilerplate"
        state={exposed}
        context={context.getComponentContext()}
        markup={
          <Component context={context.getComponentContext()} />
        } />
    );

    res.send(html);
    console.log('React server-side rendered ' + req.url);
  });
});

server.listen(3000, function() {
  console.log('Listening at port 3000');
});
