
var path = require('path'),
    fs   = require('fs');

module.exports = function(data, fn) {
    var pathData, clients, client, projects, project, pathClient, key;

    pathData = path.resolve(data) + '/';
    clients = fs.readdirSync(pathData);

    for (var index = 0, length = clients.length; index < length; index++) {
        client = clients[index];
        projects = fs.readdirSync(pathData + client);
        // percorre a listagem de projeto por cliente
        for (var indexProject = 0, lengthProject = projects.length; indexProject < lengthProject; indexProject++) {
            project = projects[indexProject];
            pathClient = pathData + client + '/' + project + '/';

            key = client + '_' + project;

            fn(pathClient, key);
        }
    }
}