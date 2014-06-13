var reload = require('reload');
var express = require("express");
var app = express();

var config = require('./config/public')(express, app);
var _ = require('underscore');
//var mysql = new require('./lib/mysql')( config.databaseMySQL );
//var Mongo = require('mongojs').connect(config.mongo.uri+"/" + config.mongo.dbName, ["msg"]);

console.log("Listening on port " + config.port);
reload(app, app, 1000);


// set routers
require(__dirname + "/routers/public.js")(app);
require(__dirname + "/routers/rest.js")(app);


app.listen(config.port)
