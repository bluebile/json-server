
var readSubFolder = require('./read_subfolder'),
    path          = require('path'),
    fs            = require('fs');

module.exports = function(data, readSubfolder) {
    var configs = {};

    var addConfig = function(path, key) {
        var fn = function(key, property, value) {

            if (!(key in configs)) {
                configs[key] = {};
            }

            if (!(property in configs[key])) {
                configs[key][property] = {};
            }

            configs[key][property] = value;
        };

        if (fs.existsSync(path + '/routes.js')) {
            fn(key, 'route', path + '/routes.js');
        }

        if (fs.existsSync(path + '/db.json')) {
            fn(key, 'db', path + '/db.json');
        }
    }

    if (readSubfolder) {
        readSubFolder(data, addConfig);
    } else {
        addConfig(path.resolve(data), '');
    }

    return configs;
};
