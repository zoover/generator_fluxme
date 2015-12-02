# DECISIONS #

In this document we've described the decisions we made regarding certain problems when it comes to this boiler plate.

### 14-11-2015 We're using services to share code between server and client ###

**Why:** because we only have to write code once, instead of twice, and it's easy to maintain
**Alternatives:** writing separate services for client and server
**Risks:** none

### 14-11-2015 Separate dumb components from smart components(view-controller) ###

**Why:** to have order and structure when writing components and keep the logic just in one place when it comes to connecting to stores and such
**Alternatives:** every component has logic and knows about stores
**Risks:** none

### 14-11-2015 Register services and stores in one file ###

**Why:** to avoid pollution of files with things that are mostly the same but don't add anything at all
**Alternatives:** registering services and stores in each file
**Risks:** you don't see which services and stores are registered immediately

### 14-11-2015 Every view-controller has it's own folder ###

**Why:** to have order and structure when writing components and to identify all files related to a view-controller
**Alternatives:** no folder structure at all
**Risks:** none

### 14-11-2015 We use the airbnb configuration for ES-linter

**Why:** because it looks like a good configuration
**Alternatives:** write your own configuration or adept another one
**Risks:** overdoing our code standardization

### 14-11-2015 We use a custom version of yeoman generator to generate components, stores, services and actions ###

**Why:** to keep conventions
**Alternatives:** write it manually
**Risks:** we also need to update the yeoman generator when changing the code structure

### 14-11-2015 We used the following conventions for code naming and structure ###

* Move client and server inside app folder
* Create Services folder
* Root view or main one should follow name = NameView.jsx
* A common folder for all generic shared components
* Don't require a new line at the end of file
* All .jsx files should follow class names conventions - ComponentName.jsx
* Other .js files are camelcase - service.js
* Configure editors to use 2 spaces instead of tabs

**Why:** because it will make our codebase readable by every developer in house
**Alternatives:** don't use coding conventions
**Risks:** spending to much time on discussing coding conventions

### 10-11-2015 We use webpack to transpile jsx and ES6 to ES5 with Babel ###

**Why:** compile time is faster then gulp while developing things
**Alternatives:** use gulp or grunt
**Risks:** adding an extra learning curve to using this boilerplate

### 10-11-2015 We use React.createClass to create our React classes ###

**Why:** because React.createClass automatically binds, meaning there is actually a class scope
**Alternatives:** class name extends React.Component
**Risks:** none

### 10-11-2015 We use ES6 syntax ###

**Why:** easier for non-javascripters to adept to it
**Alternatives:** using ES5 syntax
**Risks:** harder to debug, because code is transpiled to ES5

### 10-11-2015 We use Fluxible-Router for our routing ###

**Why:** because Fluxible-Router works out of the box with Fluxible/React. It is fairly easy to make the app isomorphic and to make sure the correct actions are being triggered when entering a route.
**Alternatives:** we did consider react-router for a while, but concluded that we need to spend more time using both routers to make the "perfect" decision, and that just choosing the one we thinks is best now is I good decision.
**Risks:** find out that react-router solves some problems we couldn't define at the time of the decision, leading to a rewrite of our router.js, server.js and all components that use links.
