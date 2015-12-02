'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    mkdirp = require('mkdirp');

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
      var appName = this.appName;
      // copy package json file
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { 'appName' : appName }
      );
      console.log(chalk.black.bgGreen.bold('+ Successfully package.json file created'));

      // copy webpack file
      this.fs.copy(
        this.templatePath('_webpack.config.js'),
        this.destinationPath('webpack.config.js')
      );
      console.log(chalk.black.bgGreen.bold('+ Successfully webpack.config.js file created'));
      
      // copy run file
      this.fs.copy(
        this.templatePath('_run.js'),
        this.destinationPath('run.js')
      );
      console.log(chalk.black.bgGreen.bold('+ Successfully run.js file created'));
      
      // copy gulpfile file
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      console.log(chalk.black.bgGreen.bold('+ Successfully gulpfile.js file created'));

      // copy gulp test file
      this.fs.copy(
        this.templatePath('_test.js'),
        this.destinationPath('test.js')
      );
      console.log(chalk.black.bgGreen.bold('+ Successfully test.js file created'));
    },

    config: function () {
      // copy babelrc file
      this.fs.copy(
        this.templatePath('_.babelrc'),
        this.destinationPath('.babelrc')
      );
      console.log(chalk.black.bgGreen.bold('+ Successfully .babelrc file created'));
      
      // copy eslint file
      this.fs.copy(
        this.templatePath('_.eslintrc'),
        this.destinationPath('.eslintrc')
      );
      console.log(chalk.black.bgGreen.bold('+ Successfully .eslintrc file created'));
      
      // copy gitignore file
      this.fs.copy(
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore')
      );
      console.log(chalk.black.bgGreen.bold('+ Successfully .gitignore file created'));
    },

    projectfiles: function () {
      this.directory('app', 'app', this.context);
      console.log(chalk.black.bgGreen.bold('+ Successfully app folder created'));
      
      this.directory('docs', 'docs', this.context);
      console.log(chalk.black.bgGreen.bold('+ Successfully docs folder created'));
      
      this.directory('tests', 'tests', this.context);
      console.log(chalk.black.bgGreen.bold('+ Successfully tests folder created'));
    }
  },

  install: function () {
    console.log(chalk.black.bgYellow.bold('*** Grab some coffee and hold tight, we are going to start installing dependencies ***'));
    this.installDependencies();
  }
});
