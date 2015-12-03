/**
 * Express configuration
 */

'use strict';

var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');

module.exports = function (app) {
  var env = app.get('env');

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  if (env === 'production') {
    app.use(morgan('dev'));
  }

  if (env === 'development' || env === 'test') {
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
