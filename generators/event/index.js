'use strict';
var yeoman = require('yeoman-generator'),
    eventGenerator = require('../../utils/events.js'),
    snakeCase = require('snake-case');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The event name'
    });

    this.log('You called the Fluxme create event with name ' + this.name + '.');
  },

  writing: function () {
    var eventName = snakeCase(this.name).toUpperCase(),
        context = this;
          
    eventGenerator.addEvent(context, eventName);
  }
});
