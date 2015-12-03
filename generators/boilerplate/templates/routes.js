/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/example', require('./api/example'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api)/*')
   .get(errors[404]);

  // All other routes should redirect to the 'Hello World!'
  app.route('/*')
    .get(function (req, res) {
      res.status(200).json({ message: 'Hello World!' });
    });
};
