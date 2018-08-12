// 1. Include config and modules
const Auth = require('./controllers/auth.js');
const config = require('./config');
var request = require('request-promise');

// 2. Authentication Middleware
/*
var moment = require('moment');
var jwt = require('jsonwebtoken');

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

  // to request x-access-token from composer-rest-server
  app.get('/auth/composer/access_token', async (req, res, next) => {

    let token = req.headers.authorization;
    if (token && token.indexOf("Bearer ") != -1) {
      token = req.headers.authorization;
    } else {
      return res.status(401).json();
    }

    //start the request with a cookie jar
    const authEndpoint = config.COMPOSER_AUTH_DOMAIN + config.COMPOSER_AUTH_URI;
    console.log("Requesting: " + authEndpoint + ", token: " + token);
    const j = request.jar();
    await request({
      uri: authEndpoint,
      headers: {
        'Authorization': token
      },
      jar: j
    });
    //get the cookies from the request and decode them to find the key access_token
    const cookies = j.getCookies(config.COMPOSER_AUTH_DOMAIN);
    let accessToken;
    cookies.forEach(
      c => c.key === "access_token"
      ? accessToken = decodeURIComponent(c.value)
      : null);
    const error = new Error('No access token found');
    if (!accessToken)
      throw error;
    const matches = accessToken.match(/^s:(.+?)\./);
    if (!matches)
      throw error;
    accessToken = matches[1];
    //respond to clients with the token to use in subrequest to the rest server
    return res.json({access_token: accessToken});
  })
};
