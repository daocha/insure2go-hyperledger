// Include Packages
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require("cors");
var logger = require('morgan');

// Include Configuration
var config_initialize = require('./config');

config_initialize(function(config){
  // Connect to MongoDB
  mongoose.connect(config.MONGO_URI);
  mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB.');
  });

  // Initialize the application
  var app = express();
  app.use(cors());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Load app routes
  require('./routes')(app);

  app.listen(config.LISTEN_PORT, function(){
      console.log('listening on port ' + config.LISTEN_PORT);
  });
});
