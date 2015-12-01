'use strict';
var yeoman = require('yeoman-generator'),
    camelCase = require('camelcase'),
    fs = require("fs"),
    chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The service name'
    });

    this.log(chalk.black.bgWhite('You called the Fluxme create service generator with the file name ' + this.name + '.'));
  },

  writing: function () {
    var suffix = 'Service',
        fileName = camelCase(this.name),
        serviceNameOnImport = fileName+suffix,
        context = this;

    //Copy current base template file base on the filename input
    this.fs.copyTpl(
      this.templatePath('baseService.js'),
      this.destinationPath('app/services/'+fileName+'.js'),
      { filename: fileName }
    );

    console.log(chalk.black.bgGreen.bold('+ Successfully service file: ' + fileName + ' created!'));
    console.log(chalk.white.bgMagenta('-- Action file location at => app/services/' + fileName));

    // Open services file in config, read it, update data and overwrite dependent files
    registerService(context, fileName, serviceNameOnImport);
  }
});

function registerService(context, fileName, serviceNameOnImport){
  var configServicesFilePath = context.destinationPath('app/config/services.js');

  fs.readFile(configServicesFilePath, 'utf8', function(err, fileData){
    if(err){
      console.log(chalk.black.bgRed.bold('** Error while reading services config file !** '+err));
    }

     var newImportFileLineToAdd = "import " + serviceNameOnImport + " from '../services/" + fileName + "';",
         endOfImportSection = fileData.substring(0, fileData.lastIndexOf("';")+2),
         afterImportSection = fileData.substring(fileData.lastIndexOf("';")+2),
         newRegisterFileLineToAdd = "app.getPlugin('FetchrPlugin').registerService(" + serviceNameOnImport + ");\n}",
         registerFunctionSectionToAppend = "";

     fileData = endOfImportSection + '\n' + newImportFileLineToAdd + afterImportSection;
     fileData = registerFunctionSectionToAppend = fileData.substring( 0, fileData.lastIndexOf('}')-1 ) + "\n  " + newRegisterFileLineToAdd;

     fs.writeFile(configServicesFilePath, fileData, function(err){
       if(err){
         console.log(chalk.black.bgRed.bold('** Error while updating services config file !** '+err));
       }
       
       console.log(chalk.black.bgGreen.bold('+ Successfully service config file updated!'));
       console.log(chalk.white.bgMagenta('-- Config services file location at => app/config/services'));
     });
  });
}
