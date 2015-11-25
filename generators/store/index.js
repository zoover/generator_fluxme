'use strict';
var yeoman = require('yeoman-generator'),
    upperCamelCase = require('uppercamelcase'),
    camelCase = require('camelcase'),
    fs = require("fs"),
    chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The store name'
    });

    this.log(chalk.black.bgWhite('You called the Fluxme create store generator with the file name ' + this.name + '.'));
  },

  writing: function () {
    // Proper file and class name format
    var suffix = 'Store',
        fileName = camelCase(this.name)+suffix,
        className = upperCamelCase(this.name)+suffix,
        context = this;

    this.fs.copyTpl(
      this.templatePath('baseStore.js'),
      this.destinationPath('app/stores/'+fileName+'.js'),
      { className: className }
    );
    
    console.log(chalk.black.bgGreen.bold('+ Successfully store file: ' + fileName + ' created!'));
    console.log(chalk.white.bgMagenta('-- Action file location at => app/stores/' + fileName));

    // Open stores file in config, read it, update data and overwrite dependent files
    registerStore(context, fileName);
  }
});

function registerStore(context, fileName){
  var configServicesFilePath = context.destinationPath('app/config/stores.js');
  
  fs.readFile(configServicesFilePath, 'utf8', function(err, fileData){
    if(err){
      console.log(chalk.black.bgRed.bold('** Error while reading store config file !** '+err));
    }

     var newImportFileLineToAdd = "import " + fileName + " from '../stores/" + fileName + "';",
         endOfImportSection = fileData.substring(0, fileData.lastIndexOf("';")+2),
         afterImportSection = fileData.substring(fileData.lastIndexOf("';")+2),
         newRegisterFileLineToAdd = "app.registerStore(" + fileName + ");\n}",
         registerFunctionSectionToAppend = "";

     fileData = endOfImportSection + '\n' + newImportFileLineToAdd + afterImportSection;
     fileData = registerFunctionSectionToAppend = fileData.substring( 0, fileData.lastIndexOf('}')-1 ) + "\n  " + newRegisterFileLineToAdd;

     fs.writeFile(configServicesFilePath, fileData, function(err){
       if(err){
         console.log(chalk.black.bgRed.bold('** Error while updating store config file !** '+err));
       }
       
       console.log(chalk.black.bgGreen.bold('+ Successfully store config file updated!'));
       console.log(chalk.white.bgMagenta('-- Config stores file location at => app/config/stores'));
     });
   });
}
