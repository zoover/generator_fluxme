var fs = require("fs"),
	chalk = require('chalk');

exports.addEvent = function(context, eventName){
  var configEventsPath = context.destinationPath('app/config/events.js');
  
  fs.readFile(configEventsPath, 'utf8', function(err, fileData){
    if(err){
      console.log(chalk.black.bgRed.bold('** Error while reading events config file !** '+err));
    }
    
    var exportSection = fileData.substring(0, fileData.lastIndexOf('}')-1),
        endOfExportSection = fileData.substring(fileData.lastIndexOf('}'), fileData.lenght),
        newEventToAdd = '  ' + eventName + ': null,' + '\n';
        
    if(exports.isMissingCommaFormat(fileData)){
      exportSection = exports.formatFileWithCommas(exportSection);
    }
        
    fileData = exportSection + "\n" + newEventToAdd + endOfExportSection;
        
    fs.writeFile(configEventsPath, fileData, function(err){
       if(err){
         console.log(chalk.black.bgRed.bold('** Error while updating events config file !** '+err));
       }
       
       console.log(chalk.black.bgGreen.bold('+ Successfully events config file updated!'));
       console.log(chalk.white.bgMagenta('-- Config services file location at => app/config/events'));
     });
    
  });
  
exports.formatFileWithCommas = function(fileData){
    var beforeColonSection = fileData.substring(0, fileData.lastIndexOf(':')-1),
        afterColonSection = fileData.substring(fileData.lastIndexOf(':'), fileData.length),
        //clean line breaks
        cleanAfterColonSection = afterColonSection.replace(/(\r\n|\n|\r)/gm,"");

    return beforeColonSection + cleanAfterColonSection + ',' + ' \n';
  }
  
exports.isMissingCommaFormat = function(fileData){
    /*
    // Look inside the last section of the config events file, we searched for 
    // the last comma found in the data string, then we grab the rest of the string after the comma
    // and search for a colon ':', if we found something then we need to add a new comma to the file
    // to prevent errors
    */
    var endSectionAfterLastComma = fileData.substring(fileData.lastIndexOf(','), fileData.length),
        hasAction = endSectionAfterLastComma.lastIndexOf(':') !== -1;
        
        return hasAction;
  }
}