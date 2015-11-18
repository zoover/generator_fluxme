'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('Fluxme') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app name?',
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      // copy package json file
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      //copy bower file
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      // copy webpack file
      this.fs.copy(
        this.templatePath('_webpack.config.js'),
        this.destinationPath('webpack.config.js')
      );
      // copy run file
      this.fs.copy(
        this.templatePath('_run.js'),
        this.destinationPath('run.js')
      );
      // copy gulpfile file
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },

    config: function () {
      // copy babelrc file
      this.fs.copy(
        this.templatePath('_.babelrc'),
        this.destinationPath('.babelrc')
      );
      // copy eslint file
      this.fs.copy(
        this.templatePath('_.eslintrc'),
        this.destinationPath('.eslintrc')
      );
    },

    projectfiles: function () {
      this.directory('app', 'app', this.context);
    }
  },

  install: function () {
    this.installDependencies();
  }
});
