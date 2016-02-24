
var module = require('./.');
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

var fs = require('fs');

var main = module(argv.path);
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

app.listen(argv.port, function() {
    console.log('JSON Server listening on http://localhost:3000')
});
