// 1. Include config and modules
var Auth = require('./controllers/auth.js');

// 2. Authentication Middleware
/*
var moment = require('moment');
var jwt = require('jsonwebtoken');
var config = require('./config');
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'TokenMissing' });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ error: "TokenInvalid" });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ error: 'TokenExpired' });
  }
  // check if the user exists
  User.findById(payload.sub, function(err, User){
    if (!User){
      return res.status(401).send({error: 'UserNotFound'});
    } else {
      req.user = payload.sub;
      next();
    }
  });
};
*/

// 3. Routes
module.exports = function(app) {
  // 4. Authentication Routes
  app.post('/auth/login', Auth.login);
  // should manually create user
  //app.post('/auth/register', Auth.register);
};
