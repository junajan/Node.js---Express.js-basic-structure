var VERSION = 1;
var loc 	= '/rest/v'+VERSION+'/';

module.exports = function(app) {

    app.get( loc+'message', function(req, res){
        
        res.end( {msg: "Cheers!"} );
    });

    app.get( loc+'*', function(req, res){
        
        res.status(404);
        res.end({error:"bad request"});
    });

}