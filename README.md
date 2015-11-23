# generator-fluxme [![Build Status](https://secure.travis-ci.org/abfx/generator-fluxme.png?branch=master)](https://travis-ci.org/abfx/generator-fluxme)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-fluxme create a new app folder:

```bash
npm init
```

Fill the details, after you complete all steps, open the package.json and add this following line

```bash
"devDependencies": {
	"generator-fluxme": "https://abegarciafx@bitbucket.org/webassets/react_fluxible_stack_generator.git"
}
```

Install the package with npm

```bash
npm install
```

Finally, initiate the generator:

```bash
yo fluxme
```

### What is FluxMe?

FluxMe Generator is a tool created at zoover, that we hope to make a faster starting point while trying to create a React/Fluxible Isomorphic web app with some basic setup, that might be too much when beginning with a new tech stack as this.

It includes a basic setup, code conventions, and we believe that this generator will help people keep on conventions and standards while getting a grip on this new react and fluxible stack.

- Gulp tasks sass, favicons, image processing, watchers, linting
- Webpack for js compiling 
- Fetchr fluxible plugin to create reusable services between client and server
- Fluxible because with the think is the right way for isomorphic apps
- Fluxible router plugin 

The generator includes some basic functions such as:

#### Generate a new action
```bash
yo fluxme:action name-of-action
```

#### Generate a new route
```bash
yo fluxme:route name-of-route
```
It will ask you then what type of route do you prefer (GET,PUT,POST,DELETE) and the path which can be any format in conventions (/test or /test/:id)

#### Generate a new service
```bash
yo fluxme:service name-of-service
```
It will update the config file to register this new service

#### Generate a new store
```bash
yo fluxme:store name-of-store
```
It will update the config file to register this new store

#### Generate a new component
```bash
yo fluxme:component name-of-component
```
It will ask you then if it is a view controller or not, to create a different template with a basic empty fluxbible store connection

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
