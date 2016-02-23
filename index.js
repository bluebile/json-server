
var module = require('./main');
var jsonServer = require('json-server');
var fs = require('fs');

var main = module();
var groups = main.getConfig();

var app = main.getApp();

var routes = [];

app.use(jsonServer.defaults());

for (var path in groups) {

    if (groups[path].route) {
        routes.push(require('./' + groups[path].route));
    }

    if (groups[path].db) {
        routes.push(jsonServer.router(groups[path].db));
    }


    for (var i = 0; i < routes.length; i++) {
        app.use('/' + path, routes[i]);
    }
}

app.listen(3000, function() {
    console.log('JSON Server listening on http://localhost:3000')
});
