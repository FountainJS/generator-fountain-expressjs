/*eslint new-cap: 0*/
'use strict';

const pathsJoin = require('path').join;
const helpers = require('yeoman-generator').test;
const assert = require('yeoman-assert');
const mockery = require('mockery');

describe('fountain-expressjs:app', () => {
  before(function () {
    mockery.enable({warnOnUnregistered: false});

    mockery.registerMock(
     require.resolve('generator-node/generators/app'),
     helpers.createDummyGenerator()
    );
  });

  after(function () {
    mockery.disable();
  });

  describe('common assert', () => {
    before(function (done) {
      helpers.run(pathsJoin(__dirname, '../generators/app'))
        .on('end', done);
    });

    it('should creates file', () => {
      assert.file([
        'package.json',
        'app.js',
        'routes.js'
      ]);
    });

    it('should fill package.json dep', () => {
      // TODO complete assert on package.json
      assert.JSONFileContent('package.json', {
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
    });

    // TODO complete assert on file

  });
});
