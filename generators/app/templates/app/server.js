import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {navigateAction} from 'fluxible-router';
import serialize from 'serialize-javascript';
import LayoutComponent from './components/Layout.jsx';
import app from './app';
// In order th enable sharing services between client and server, we need
// to make them available by registering services on the app
import registerServices from './config/services';

registerServices(app);

const server = express();

server.use(require('connect-livereload')());

server.use('/fonts', express.static('./build/assets/fonts'));
server.use('/images', express.static('./build/assets/images'));
server.use('/scripts', express.static('./build/scripts'));
server.use('/styles', express.static('./build/assets/styles'));

// Fetchr registration on the server, this enables us to share services between client and server
// Middleware Magic!
server.use(app.getPlugin('FetchrPlugin').getXhrPath(), app.getPlugin('FetchrPlugin').getMiddleware());

server.use(function(req, res, next) {
  const context = app.createContext();
  const actionContext = context.getActionContext();

  actionContext.executeAction(navigateAction, {url: req.url}, ( err ) => {
    if (err) {
      return next(err);
    }
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
    const Component = app.getComponent();
    const renderedBody = ReactDOMServer.renderToString(<Component context={context.getComponentContext()} />);

    const html = ReactDOMServer.renderToStaticMarkup(
      <LayoutComponent
        state={exposed}
        context={context.getComponentContext()}
        markup={renderedBody} />
    );

    res.send('<!DOCTYPE html>\n' + html);
    console.log('React server-side rendered ' + req.url);
  });
});

server.listen(3000, function() {
  console.log('Listening at port 3000');
});
