'use strict';
var yeoman = require('yeoman-generator'),
    camelCase = require('camelcase'),
    upperCamelCase = require('uppercamelcase'),
    fs = require("fs");

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The component name'
    });

    this.log('You called the Fluxme create component with the file name ' + this.name + '.');
  },

  writing: function () {
    var fileName = upperCamelCase(this.name),
        folderName = camelCase(this.name),
        suffix = 'View',
        context = this;

    this.prompt([
      {
        type: 'confirm',
        name: 'type',
        message: 'Is this component going to be used as a view - controller?',
        default: true,
      }
    ], function (answers){
      let componentIsViewController = answers['type'];

      if(componentIsViewController){

        fileName = fileName + suffix;
        copyBaseViewComponentTemplate(context, fileName, folderName);

      }else{

        copyBaseComponentTemplate(context, fileName);

      }

    });
  }
});

function copyBaseComponentTemplate(context, fileName){
  context.fs.copyTpl(
    context.templatePath('baseComponent.js'),
    context.destinationPath('app/components/_common/' + fileName + '.jsx'),
    { className: fileName }
  );
}

function copyBaseViewComponentTemplate(context, fileName, folderName){
  context.fs.copyTpl(
    context.templatePath('baseViewComponent.js'),
    context.destinationPath('app/components/' + folderName + '/' + fileName + '.jsx'),
    { className: fileName }
  );
}
