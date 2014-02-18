'use strict';

var restify = require('restify'),
    jwt = require('jsonwebtoken'),
    path = require('path');

module.exports = function(options) {
  if (!options || !options.secret) {
    throw new Error('Secret should be set');
  }

  return function(req, res, next) {
    if (req.headers && req.headers.authorization) {
      var test = req.headers.authorization.match(/^Bearer (.*)$/);
      if (test) {
        jwt.verify(test[1], options.secret, options, function(err, user) {
          if (err) {
            return next(new restify.NotAuthorizedError('Invalid token'));
          }

          req.user = user;
          next();
        });
      } else {
        return next(new restify.NotAuthorizedError('Format is Authorization: Bearer [token]'));
      }
    } else {
      return next(new restify.NotAuthorizedError('No authorization header was found'));
    }
  };
};
