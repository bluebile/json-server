
var module = require('./../main');
var jsonServer = require('json-server');
var yargs  = require('yargs');

var argv = yargs
    .options({
        port: {
            alias: 'p',
            description: 'Atribui porta',
            default: 3000
        },
        path: {
            alias: 'f',
            description: 'define path'
        }

    })
    .help('help').alias('help', 'h')
    .argv;

var fs = require('fs'),
    main = module(argv.path),
    groups = main.getConfig(),
    app = main.getApp(),
    routes = [];

app.use(jsonServer.defaults());

for (var path in groups) {
    var routeDb, route;

    if (groups[path].db) {
        routeDb = jsonServer.router(groups[path].db);
        routes.push(routeDb);
    }

    if (groups[path].route) {
        route = require(groups[path].route);
        routes.unshift(route(routeDb.db));
    }

    for (var i = 0; i < routes.length; i++) {
        app.use('/' + path, routes[i]);
    }
}

app.listen(argv.port, function() {
    console.log('JSON Server listening on http://localhost:' + argv.port);
});
