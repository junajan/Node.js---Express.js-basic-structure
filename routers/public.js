
module.exports = function(app) {

    app.get('/', function(req, res){
        
        res.render("basic/index");
    });

    app.get('*', function(req, res){
        
        res.status(404);
        res.render("basic/error404");
    });

}