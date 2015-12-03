'use strict';

var extend = require('deep-extend');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

      extend(pkg, {
        dependencies: {
          'body-parser': '^1.14.1',
          'composable-middleware': '^0.3.0',
          compression: '^1.6.0',
          'cookie-parser': '^1.4.0',
          errorhandler: '^1.4.2',
          express: '^4.13.3',
          lodash: '^3.10.1',
          'method-override': '^2.3.5',
          mongoose: '^4.2.8',
          morgan: '^1.6.1'
        },
        devDependencies: {
          eslint: '^1.10.2',
          nodemon: '^1.8.1'
        },
        scripts: {
          start: 'nodemon -e js app.js',
          test: 'eslint .'
        }
      });

      this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
    },

    express: function () {
      this.fs.copyTpl(
        this.templatePath('app.js'),
        this.destinationPath(this.options.generateInto, 'app.js'));

      this.fs.copyTpl(
        this.templatePath('routes.js'),
        this.destinationPath(this.options.generateInto, 'routes.js'));

      this.fs.copyTpl(
        this.templatePath('api'),
        this.destinationPath(this.options.generateInto, 'api'));

      this.fs.copyTpl(
        this.templatePath('components'),
        this.destinationPath(this.options.generateInto, 'components'));

      this.fs.copyTpl(
        this.templatePath('config'),
        this.destinationPath(this.options.generateInto, 'config'));
    }
  }
});
