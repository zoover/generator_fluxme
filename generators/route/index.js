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
      desc: 'The route name'
    });

    this.log(chalk.black.bgWhite('You called the Fluxme create route with the the file name ' + this.name + '.'));
  },

  writing: function () {
    var filename = camelCase(this.name),
        configServicesFilePath = this.destinationPath('app/config/routes.js');

    this.prompt([
      {
        type: 'list',
        name: 'method',
        message: 'What route method would you like to use?',
        choices: [ 'GET', 'POST', 'PUT', 'DELETE'],
      },
      {
        type: String,
        name: 'path',
        message: 'What path would you like to use?'
      }
    ], function (answers){
      var routeMethod = answers['method'],
          pathName = answers['path'],
          actionName = null,
          handlerName = null;

      //Open services file in config, read it, update data and overwrite dependent files
      fs.readFile(configServicesFilePath, 'utf8', function(err, fileData){
        if(err){
          console.log(err);
        }

        var fileDataParts = findRouteConfig(fileData);
        var newRouteToAdd = '  '+filename + ': {\n  ',
            newRouteConfig = fileDataParts['insideRouteConfig'],
            fileStart = fileDataParts['beforeRouteConfig'],
            fileEnd = fileDataParts['afterRouteConfig'],
            newFile = "";
          
        newRouteToAdd += "  method: '" + routeMethod + ",'\n  ";
        newRouteToAdd += "  path: '" + pathName + "',\n  ";
        newRouteToAdd += "  action: " + actionName + ",\n  ";
        newRouteToAdd += "  handler: " + handlerName + "\n  }\n};";

        if(isRouteConfigNotEmpty(fileDataParts['insideRouteConfig'])){
          newRouteConfig = newRouteConfig.substring(0, newRouteConfig.lastIndexOf('}')+1)+',\n';
        }

        newRouteConfig = newRouteConfig + newRouteToAdd;
        newFile = fileStart + newRouteConfig + fileEnd;

        fs.writeFile(configServicesFilePath, newFile, function(err){
          if(err){
            console.log(chalk.black.bgRed.bold('** Error while updated route config file !** '+err));
          }
          console.log(chalk.black.bgGreen.bold('+ Successfully route config file updated!'));
          console.log(chalk.white.bgMagenta('-- Config routes file location at => app/config/routes'));
        });
      });
    });
  }
});

function findRouteConfig(fileData){
  var routeConfigStartPoint = fileData.indexOf('= {')+2,
      routeConfigEndPoint = fileData.lastIndexOf('};'),
      beforeRouteConfigStartPoint = fileData.substring(0, routeConfigStartPoint),
      afterRouteConfigEndPoint = fileData.substr(fileData.lastIndexOf('};')+2);

  return {
    'insideRouteConfig' : fileData.substring(routeConfigStartPoint, routeConfigEndPoint),
    'beforeRouteConfig' : beforeRouteConfigStartPoint,
    'afterRouteConfig' : afterRouteConfigEndPoint
  }
}

function isRouteConfigNotEmpty(fileData){
  return fileData.indexOf('}') !== -1;
}

