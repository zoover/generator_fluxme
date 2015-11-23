# React Stack Boilerplate #

A starting point for React/Fluxible applications, using the following stack:

* [NodeJS](https://nodejs.org)
* [Express](http://expressjs.com/)
* [React](https://facebook.github.io/react/)
* [Fluxible](http://fluxible.io/)
* [Gulp](http://gulpjs.com/)
* [Webpack](https://webpack.github.io/)

## Main Features ##

* Fluxible implementation examples
* [Fetchr](https://github.com/yahoo/fetchr) services
* Full isomorphic rendering
* Automated build process
  * Webpack bundles javascript
  * SASS stylesheets are compiled
  * Images and fonts are copied to build dir
  * Linting (according to [Airbnb spec](https://github.com/airbnb/javascript) for the most part)
  * Automatic favicon generating
* Web server (Express)

## ES6 ##

The application uses ECMAScript 6 syntax where possible. 

## Quick Start ##

To get the application running, run the following commands:

* `npm install` to install dependencies
* `gulp` to build the application and start the watcher
* `npm start` to start the server

Right now, building (and watching) the application and serving it are two separate tasks. This might change in the future.
Also, note that the server is not automatically restarted when the application is rebuilt.

## More Documentation ##

* [Decisions](/docs/DECISIONS.md)
* [Tutorial](/docs/TUTORIAL.md)
