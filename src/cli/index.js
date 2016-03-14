
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
    app = main.getApp();

app.use(jsonServer.defaults());

for (var path in groups) {
    var routeDb, route, render, db, routes = [];

    if (groups[path].db) {
        routeDb = jsonServer.router(groups[path].db);
        db = routeDb.db;
        routes.push(routeDb);
    }

    if (groups[path].route) {
        route = require(groups[path].route)(db);

        if (route.render) {
            render = route.render;
            delete route.render;
        }

        if (route.router) {
            route = route.router;
        }

        if (render) {
            if (routeDb) {
                routeDb.render = render;
            } else {
                // @todo testar quando não houver db json
                // deve ser implementado um middleware que execute o render assim como jsonserver
                route.render = render;
            }
        }

        routes.unshift(route);
    }

    for (var i = 0; i < routes.length; i++) {
        app.use('/' + path, routes[i]);
    }
}

app.listen(argv.port, function() {
    console.log('JSON Server listening on http://localhost:' + argv.port);
});
