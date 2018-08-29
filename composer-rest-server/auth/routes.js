// 1. Include config and modules
const Auth = require('./controllers/auth.js');

// 2. Authentication Middleware
/*
const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('./config');

function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'TokenMissing' });
  }
  let token = req.headers.authorization.split(' ')[1];

  let payload = null;
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
  app.post('/chain/authenticate/login', Auth.login);
  // should manually create user
  //app.post('/chain/authenticate/register', Auth.register);

  // to request x-access-token from composer-rest-server
  app.get('/chain/authenticate/composer/access_token', Auth.request_access_token);

  // to request x-access-token from composer-rest-server
  app.post('/chain/authenticate/composer/auth_access_token', Auth.auth_access_token);
};
