// 1. Load the Person model
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config');

// 2. Authentication
exports.login = function(req, res) {
  try {
    if(typeof req.body.username === "undefined" || typeof req.body.password === "undefined"){
      return res.status(400).json();
    }
    User.findOne({
      "username": req.body.username
    }, "username password", function(err, user) {
      if (err || user === null) {
        return res.status(404).json({error: 'UserNotFound'});
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
            return res.json({"success": true, "token": token});
          }
        })
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({"error": e});
  }
};

exports.register = function(req, res) {
  try {
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
  } catch (e) {
    console.log(e);
    return res.status(400).json({"error": e});
  }
};
