var expressSession = require("express-session");
var expressLogger = require("express-logger");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var config = {
    local: {
        mode: 'local',
        port: 8765
    }
}

function getLayout ( req, defLayout ) {
    
    if ( req.xhr )
        return ! req.xhr;
    
    if ( defLayout == null )
        config.defLayout = "frame/frame";
    
    return config.defLayout; 
}

module.exports = function(express, app, mode) {
    
    app.use( require('express-ejs-layouts'));
    app.use( express.static('./public'));
    app.use(bodyParser());
    app.use(cookieParser());
    // app.use(expressLogger('dev'));
//    app.use(express.cookieSession({ secret: "wkd798hi23uwzd7826IH", cookie: { maxAge: 60 * 60 * 24 * 365 * 50 } }));
    
    var FileStore = require('connect-session-file');
    app.use(expressSession({
        secret: 'wd1234wd',
        store: new FileStore({path:'./data/session', useAsync:true})
    }));
    
    app.use(function (req, res, next) {
        app.set("layout",  getLayout( req ));
        next();
    });
    
    app.engine('html', require('ejs-locals'));

    app.set('views', './view');
    app.set('view engine', 'html');
    app.set("layout",  "frame/frame");
    
    return config[mode || process.argv[2] || 'local'] || config.local;
}