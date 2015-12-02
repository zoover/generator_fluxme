# TUTORIAL #

So, you're probably here because you want to know how this boilerplate for an isomorphic application using React and Fluxible was build? Good, that's what this tutorial is all about.

### Table of Contents ###

* Introduction
* Gulp
* Webpack
* Setting up the server

### Introduction ###

When you start building an application, let alone an isomorphic one, things get complicated pretty fast. Thus we decided to build ourselves a nice and compact boilerplate, containing the bare minimum for our project, but with most of the problems already solved and the code organized in a pretty way.

Let's start by setting up the basic stuff we need to transpile/concatenate/build our code first.

### Gulp ###

Gulp is an npm library that can run automated tasks. For example copying javascript or css to a build folder, transpiling ES6 to ES5, watching files to see if they changed an trigger an action when they are etc. etc.

Open the gulpfile.js, it contains everything you need to know. On the top we load dependencies and define some config settings (mainly locations of source and destination foldes/files). After that we start describing tasks. For our application we need to do the following stuff. You can run them manually by using `gulp <taskname>`.

#### Tasks that are stand-alone ####
* process-scripts: convert and bundle ES6 javascript to ES5 using Webpack (see next chapter), so every browser can interpret our javascript code
* process-styles: uses gulp-sass to convert scss files to css-files
* process-images-and-fonts: copy and paste static images and fonts from source to destination folder
* cleanup: will cleanup the build folder
* lint-scripts: will use ES-linter to lint all javascript in our project

#### Tasks that requires one or more of the above defined tasks ####
* watch: will watch certain directories, if something changed inside it will kick off tasks that use those files so the build folder is always up-to-date with the latest changes
* build: build the application in the build folder after doing a cleanup
* default: the default gulp task that will be kicked off when entering `gulp` in the command line. Try it and see what happens when you change some files :)

### Webpack ###

Webpack is a module bundler, not a task runner. Webpack understands modules, it's dependencies and can create assets from it. We only use webpack to transpile ES6 to ES5 using Babel, but you could replace all of the gulp tasks with something similar in webpack.

The only script that uses webpack is the process-scripts task inside the gulpfile.js. This config contains a loader for all javascript syntax inside our project and will transpile this from ES6 to ES5 using Babel. When transpiling Babel uses the settings in .babelrc. As you can see our .babelrc uses both React and ES2015 (ES6). It will transpile all jsx syntax and all ES6 to plain ES5 javascript.

### Setting up a server ###

You can start the server by typing `npm start` from the root of the project. This will start a server and make the whole application available on localhost:3000.

So how does this work? Inside our package.json we defined a "start" task: `node run.js`, which is kicked off when you type `npm start`. `run.js` is fairly easy. All it does is import babel-core, so we can use ES6 syntax in our `server.js`, that is imported after.

Inside `server.js` it gets a little bit more complicated. First we will import some dependencies such as Express (to setup a server), React (our view), ReactDomserver (to render React without a DOM), Fluxible-Router (to handle routing) and serialize-javascript (to serialize a string of javascript).

Then we will import app.js which is the main entry point for our application on both server and client. We'll also import the LayoutComponent, which is the "html" page in which the app is rendered (think of it as a javascript version of index.html). We also have to import all our services and register them to make sure our app knows about them. We can then use fetchr to use the same call on client and server.

We then setup a server using express and link our build folder to the public folder of the server. After we've done some middleware magic with fetchr we're ready to handle the incoming requests

#### Isomorphic application handling requests ####

So in this application we'll first render some html on the server and send this to the client. Whenever all the assets in the client are loaded it will sync up with the response from the server and, if everything is working fine, the client will take over from there.

First we need to make the context of our app available to use on the server. App.createContext() will provide isolation of stores, dispatches and other data so that no information is shared between different requests on the server side. It will create a context for just this one request. Then we'll make the ActionContext of the app available. This provides access to functions that should be called from actions (dispatch, executeAction, getStore).

Then the magic happens. We use the requested url to kick off the actions belonging to that url. These actions are defined in routes.js. We will then create the "exposed" variable, which we will add as a string in the html response from the server. Later on, the client can use this string to rehydrate it's store with the data that the server already processed in the initial request. In other words, this is the state that's created on the server and it will be loaded into the client when the client takes over.

We'll then create the full html return, using ReactDomserver.renderToStaticMarkup. This function will create html content with all of the components translated to html without using a DOM (cause there is no DOM on the server). Inside the LayoutComponent we add three parameters:

* state: the string with the state of the app that was rendered on the serverside
* context: the context of the app
* markup: the actual html that was rendered by our render-funtions inside the components

#### Client taking over from server ####

So we've done a request and now the client will take over. What happens? Let's have a look at client.js. (FYI: this is the entrypoint for our client bundle, see webpack.config.js)

Remember what we explained in the previous chapter, the state of the application from the serverside is parsed inside the html return. You can find it in window.app if you look at the source code. This state is passed to a variable called dehydratedState and is then rehydrated into the app. The client will then try to render this application into the mountnode and compare the results with the server-rendered DOM. If everything matches, React will mount itself on top and attach client-side event handlers. From here on the client will take over.

### And now? ###

Start writing components, stores, actions and stuff using Fluxible with React! There are some generic components, stores and actions that you can use to get a feel for it :)
