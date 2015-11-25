'use strict';
var yeoman = require('yeoman-generator'),
    camelCase = require('camelcase'),
    chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });

    this.log(chalk.black.bgWhite('You called the Fluxme create action with name ' + this.name + '.'));
  },

  writing: function () {
    var fileName = camelCase(this.name);

    // Copy base action template to destination folder with filename variable which will be replace
    // at runtime 
    this.fs.copy(
      this.templatePath('baseAction.js'),
      this.destinationPath('app/actions/'+fileName+'.js'),
      { className: fileName }
    );
    
    console.log(chalk.black.bgGreen.bold('+ Successfully action file: ' + fileName + ' created!'));
    console.log(chalk.white.bgMagenta('-- Action file location at => app/actions/'+fileName));
  }
});
