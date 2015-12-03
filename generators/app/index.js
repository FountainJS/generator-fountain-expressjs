'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include boilerplate files'
    });
  },

  initializing: function () {

  },

  prompting: {
    askFor: function () {
      var done = this.async();

      done();
    }
  },

  default: function () {
    this.composeWith('node:app', {
      options: {
        babel: false,
        boilerplate: false,
        gulp: false,
        coveralls: false
      }
    }, {
      local: require.resolve('generator-node/generators/app')
    });

    if (this.options.boilerplate) {
      this.composeWith('fountain-expressjs:boilerplate', {}, {
        local: require.resolve('../boilerplate')
      });
    }
  },

  installing: function () {
    this.npmInstall();
  }
});
