/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/examples              ->  index
 * POST    /api/examples              ->  create
 * GET     /api/examples/:id          ->  show
 * PUT     /api/examples/:id          ->  update
 * DELETE  /api/examples/:id          ->  destroy
 */

'use strict';


// Gets a list of Exs
exports.index = function (req, res) {
  res.status(200).json({ message: 'Hello Wilson!' });
};

// Gets a single Ex from the DB
exports.show = function (req, res) {
  res.status(200).json({ message: 'Hello ' + req.params.id + '!' });
};
