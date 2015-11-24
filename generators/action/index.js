'use strict';
var yeoman = require('yeoman-generator'),
    camelCase = require('camelcase');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });

    this.log('You called the Fluxme subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    var filename = camelCase(this.name);

    this.fs.copy(
      this.templatePath('baseAction.js'),
      this.destinationPath('app/actions/'+filename+'.js'),
      { className: fileName }
    );
  }
});
