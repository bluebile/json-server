
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
            description: 'Define path'
        },
        subfolder: {
            alias: 's',
            description: 'Executa rotina de subfolders.',
            default: true
        }

    })
    .help('help').alias('help', 'h')
    .argv;

var fs = require('fs'),
    main = module(argv.path, argv.subfolder),
    configs = main.getConfig(),
    app = main.getApp();

app.use(jsonServer.defaults());

for (var path in configs) {
    var routeDb, route, render, db, routes = [];

    if (configs[path].db) {
        routeDb = jsonServer.router(configs[path].db);
        db = routeDb.db;
        routes.push(routeDb);
    }

    if (configs[path].route) {
        route = require(configs[path].route)(db);

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
