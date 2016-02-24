var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require("path");

app.set('json spaces', 2);

module.exports = function(data) {

    var groups = {}, clients, client, projects, project, pathClient, key, callback, pathData;

    callback = function(key, property, value) {

        if (!(key in groups)) {
            groups[key] = {};
        }

        if (!(property in groups[key])) {
            groups[key][property] = {};
        }

        groups[key][property] = value;
    };

    var addGroup = function(path, key) {
        if (fs.existsSync(path + '/routes.js')) {
            callback(key, 'route', path + '/routes.js');
        }

        if (fs.existsSync(path + '/db.json')) {
            callback(key, 'db', path + '/db.json');
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

                addGroup(pathClient, key);
            }

        }
    } else {
        addGroup(path.resolve(data), '');
    }


    return {
        getApp: function() {
            return app;
        },
        getConfig: function() {
            return groups;
        }
    }
};