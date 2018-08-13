const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config');
const request = require('request-promise');

// generate JWT token
function generateJWTToken(username, password, callback) {
  User.findOne({
    "username": username
  }, "username password", function(err, user) {
    if (err || user === null) {
      if (typeof callback != "undefined") {
        callback({error: 'UserNotFound'});
      }
    } else {
      user.comparePassword(password, function(err, isMatch) {
        if (err || !isMatch) {
          if (typeof callback != "undefined") {
            callback({"error": "username or password is incorrect."});
          }
        } else {
          const token = jwt.sign({
            "username": user.username,
            "issuetime": new Date()
          }, config.JWT_TOKEN_SECRET, {
            algorithm: config.JWT_TOKEN_ALGORITHM,
            issuer: config.JWT_TOKEN_ISSUER,
            expiresIn: config.JWT_TOKEN_EXPIRY
          });
          if (typeof callback != "undefined") {
            callback({"success": true, "token": token});
          }
        }
      });
    }
  });
}

// requst composer-rest-server for access-token
function requestAccessToken(token, callback) {
  const errorMsg = "No access token found";
  const error = new Error(errorMsg);
  //start the request with a cookie jar
  const authEndpoint = config.COMPOSER_AUTH_DOMAIN + config.COMPOSER_AUTH_URI;
  console.log("Requesting: " + authEndpoint);
  const j = request.jar();
  request({
    uri: authEndpoint,
    headers: {
      'Authorization': token
    },
    jar: j
  }).then((res, err) => { //get the cookies from the request and decode them to find the key access_token
    const cookies = j.getCookies(config.COMPOSER_AUTH_DOMAIN);
    let accessToken;
    cookies.forEach(
      c => c.key === "access_token"
      ? accessToken = decodeURIComponent(c.value)
      : null);
    if (!accessToken) {
      if (typeof callback != "undefined") {
        callback({"error": errorMsg});
      } else {
        throw error;
      }
    }
    const matches = accessToken.match(/^s:(.+?)\./);
    if (!matches) {
      if (typeof callback != "undefined") {
        callback({"error": errorMsg});
      } else {
        throw error;
      }
    }
    accessToken = matches[1];
    //respond to clients with the token to use in subrequest to the rest server
    if (typeof callback != "undefined") {
      callback({access_token: accessToken});
    }
  }).catch(function(err) { // catch error
    if (typeof callback != "undefined") {
      callback({"error": errorMsg});
    } else {
      throw error;
    }
  });
}

// authentication endpoint
exports.login = function(req, res) {
  try {
    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {
      return res.status(400).json();
    }
    generateJWTToken(req.body.username, req.body.password, function(result) {
      return res.json(result);
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({"error": e});
  }
};

// registration endpoint
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

// endpoint for requesting access token with JWT token
exports.request_access_token = function(req, res) {
  let token = req.headers.authorization;
  if (token && token.indexOf("Bearer ") != -1) {
    token = req.headers.authorization;
  } else {
    return res.status(401).json();
  }

  requestAccessToken(token, function(result) {
    return res.json(result);
  });
};

// endpoint for both authentication & requesting composer access-token
exports.auth_access_token = function(req, res) {
  try {
    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {
      return res.status(400).json();
    }
    generateJWTToken(req.body.username, req.body.password, function(jwtToken) {
      requestAccessToken("Bearer " + jwtToken.token, function(accessToken) {
        return res.json(accessToken);
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({"error": e});
  }
};
