'use strict';
var yeoman = require('yeoman-generator'),
    upperCamelCase = require('uppercamelcase'),
    camelCase = require('camelcase'),
    fs = require("fs");

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The store name'
    });

    this.log('You called the Fluxme create store generator with the file name ' + this.name + '.');
  },

  writing: function () {
    // Proper file and class name format
    var suffix = 'Store',
        filename = camelCase(this.name)+suffix,
        className = upperCamelCase(this.name)+suffix,
        configServicesFilePath = this.destinationPath('app/config/stores.js');

    this.fs.copyTpl(
      this.templatePath('baseStore.js'),
      this.destinationPath('app/stores/'+filename+'.js'),
      { className: className }
    );
    console.log('--- store file successfully created! ');

    // Open services file in config, read it, update data and overwrite dependent files
    fs.readFile(configServicesFilePath, 'utf8', function(err, fileData){
      if(err){
        console.log(err);
      }

      var newImportFileLineToAdd = "import " + filename + " from '../stores/" + filename + "';",
          endOfImportSection = fileData.substr(0, fileData.lastIndexOf("';")+2),
          afterImportSection = fileData.substr(fileData.lastIndexOf("';")+2),
          newRegisterFileLineToAdd = "app.registerStore(" + filename + ");\n}",
          registerFunctionSectionToAppend = "";

      fileData = endOfImportSection + '\n' + newImportFileLineToAdd + afterImportSection;
      fileData = registerFunctionSectionToAppend = fileData.substr( 0, fileData.lastIndexOf('}')-1 ) + "\n  " + newRegisterFileLineToAdd;

      fs.writeFile(configServicesFilePath, fileData, function(err){
        if(err){
          console.log(err);

        }
        console.log('--- config stores file successfully updated! ');
      });
    });
  }
});
