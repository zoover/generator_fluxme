'use strict';
var yeoman = require('yeoman-generator'),
    camelCase = require('camelcase'),
    fs = require("fs"),
    snakeCase = require('snake-case'),
    chalk = require('chalk'),
    eventGenerator = require('../../utils/events.js');

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
    var fileName = camelCase(this.name),
        context = this;

    // Copy base action template to destination folder with filename variable which will be replace
    // at runtime 
    this.fs.copy(
      this.templatePath('baseAction.js'),
      this.destinationPath('app/actions/'+fileName+'.js'),
      { className: fileName }
    );
    
    console.log(chalk.black.bgGreen.bold('+ Successfully action file: ' + fileName + ' created!'));
    console.log(chalk.white.bgMagenta('-- Action file location at => app/actions/'+fileName));
  
    this.prompt({
      type: 'confirm',
      name: 'withEvent',
      message: 'Would you like to add a dispatch event to the current action?',
      default: true,
    }, function (answers){
      var withEvent = answers['withEvent'];
      
      if(withEvent){
        context.prompt({
          type: 'input',
          name: 'eventName',
          message: 'What is the event name?'
        }, function(answers){
          var eventName = snakeCase(answers['eventName']).toUpperCase();
          
          eventGenerator.addEvent(context, eventName);
        }); 
      }
    });
  }
});