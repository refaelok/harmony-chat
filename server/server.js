// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var routes     = require('./src/routes');
var config     = require('./src/config');
var path 	   = require('path');
var WebSocket  = require('ws');
var browserSync = require("browser-sync");
var _ = require ('lodash');
// configure app
app.use(morgan('dev')); // log requests to the console
// apply headers
app.use((req, res, next) => {
        if(process.env.NODE_ENV == "development"){
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
        }
        res.header('Access-Control-Allow-METHODS', 'GET,PUT,POST,DELETE,HEAD,OPTIONS');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', "X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, Origin, x-requested-with, Content-Type, Content-Range, Content-Disposition, Content-Description");
        next();
});

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 8080;
console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'development') {
    port = 7000; // set our port
}

if(config.useMongo){
  var mongoose   = require('mongoose');
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongo.dbUrl); // connect to our database  
}


// SQL
if(config.useSql){
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize(config.sql.db, config.sql.user, config.sql.pass);
}
// WEBSOCKET SERVER

 
const wss = new WebSocket.Server({ port: config.websocket.port });

wss.broadcastAction = function(request){

    try {
        var result = _.find(config.allowedActions, function (o) {
            return o === request.action.type
        });

        if (!result) {
            return;
        }
        wss.broadcast({
            "WS_ACTION": true,
            "token": request.token || null,
            "action": request.action
        });
    }
    catch (e) {
        console.log(e);
    }

};

wss.broadcast = function broadcast(data) {

  wss.clients.forEach(function each(client) {
      
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
 
wss.on('connection', function connection(ws) {
  console.log("new connection to websocket");
  
  ws.on('message', function incoming(data) {
    console.log("incoming message: "+data);
  });
});

app.set('wss',wss);


// REGISTER OUR ROUTES -------------------------------
require('./src/routes').default(app);

app.use(express.static(path.join(__dirname, '..','client')));
// API FALLBACK
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname ,'..','/client/index.html'));
});
app.set('etag', false);
// START THE SERVER
// =============================================================================
app.listen(port);

if(process.env.NODE_ENV === 'development') {
    var serverURL = "http://localhost:" + port;
    browserSync.create();
    browserSync.init({
        port: 8080,
        files: [
            path.join(__dirname, '..', 'client','dist')
        ],
        proxy: serverURL,
        browser: "chrome",
        notify: false,
        online: false,
        logConnections: false,
    });
}
console.log('Magic happens on port ' + port);

// uncaughtException
process.on('uncaughtException', function (err) {
  console.log(err);
})