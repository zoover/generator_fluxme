'use strict';
var yeoman = require('yeoman-generator'),
    camelCase = require('camelcase'),
    fs = require("fs");

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The service name'
    });

    this.log('You called the Fluxme create service generator with the file name ' + this.name + '.');
  },

  writing: function () {
    var suffix = 'Service',
        filename = camelCase(this.name),
        serviceNameOnImport = filename+suffix,
        configServicesFilePath = this.destinationPath('app/config/services.js');

    //Copy current base template file base on the filename input
    this.fs.copyTpl(
      this.templatePath('baseService.js'),
      this.destinationPath('app/services/'+filename+'.js'),
      { filename: filename }
    );
    console.log('--- services file successfully created! ');

    // Open services file in config, read it, update data and overwrite dependent files
    fs.readFile(configServicesFilePath, 'utf8', function(err, fileData){
      if(err){
        console.log(err);
      }

      var newImportFileLineToAdd = "import " + serviceNameOnImport + " from '../services/" + filename + "';",
          endOfImportSection = fileData.substring(0, fileData.lastIndexOf("';")+2),
          afterImportSection = fileData.substring(fileData.lastIndexOf("';")+2),
          newRegisterFileLineToAdd = "app.getPlugin('FetchrPlugin').registerService(" + serviceNameOnImport + ");\n}",
          registerFunctionSectionToAppend = "";

      fileData = endOfImportSection + '\n' + newImportFileLineToAdd + afterImportSection;
      fileData = registerFunctionSectionToAppend = fileData.substring( 0, fileData.lastIndexOf('}')-1 ) + "\n  " + newRegisterFileLineToAdd;

      fs.writeFile(configServicesFilePath, fileData, function(err){
        if(err){
          console.log(err);

        }
        console.log('--- config services file successfully updated! ');
      });
    });
  }
});
