// 1. Load the Person model
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config');

// 2. Authentication
exports.login = function(req, res) {
var token = req.headers.authorization.split(' ')[1];
console.log(jwt.decode(token));

  User.findOne({
    "username": req.body.username
  }, "username password", function(err, user) {
    if (err || user === null) {
      res.status(404).json({error: 'UserNotFound'});
    } else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) {
          res.json({"error": "username or password is incorrect."});
        } else {
          const token = jwt.sign({
            "username": user.username
          }, config.JWT_TOKEN_SECRET, {
            algorithm: config.JWT_TOKEN_ALGORITHM,
            issuer: config.JWT_TOKEN_ISSUER,
            expiresIn: config.JWT_TOKEN_EXPIRY
          });
          res.json({"success": true, "token": token});
        }
      })
    }
  });
};

exports.register = function(req, res) {
  User.init().then(() => User.create({
    "username": req.body.username,
    "password": req.body.password
  }, function(err) {
    if (err) {
      return res.json({"error": err});
    } else {
      return res.json({"success": true});
    }
  }));
};
