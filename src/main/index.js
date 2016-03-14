var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require("path");

app.set('json spaces', 2);

module.exports = function(data) {

    var configs = {}, clients, client, projects, project, pathClient, key, addConfigFn, pathData;

    addConfigFn = function(key, property, value) {

        if (!(key in configs)) {
            configs[key] = {};
        }

        if (!(property in configs[key])) {
            configs[key][property] = {};
        }

        configs[key][property] = value;
    };

    var addConfig = function(path, key) {
        if (fs.existsSync(path + '/routes.js')) {
            addConfigFn(key, 'route', path + '/routes.js');
        }

        if (fs.existsSync(path + '/db.json')) {
            addConfigFn(key, 'db', path + '/db.json');
        }
    };

    if (!data) {

        pathData = path.resolve(__dirname, '../../data/') + '/';
        clients = fs.readdirSync(pathData);

        for (var index = 0, length = clients.length; index < length; index++) {
            client = clients[index];
            projects = fs.readdirSync(pathData + client);
                // percorre a listagem de projeto por cliente
            for (var indexProject = 0, lengthProject = projects.length; indexProject < lengthProject; indexProject++) {
                project = projects[indexProject];
                pathClient = pathData + client + '/' + project + '/';

                key = client + '_' + project;

                addConfig(pathClient, key);
            }

        }
    } else {
        addConfig(path.resolve(data), '');
    }


    return {
        getApp: function() {
            return app;
        },
        getConfig: function() {
            return configs;
        }
    }
};