var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require("path"),
    config = require('./config');

app.set('json spaces', 2);

module.exports = function(data, readSubfolder) {
    var configs = config(data, readSubfolder);

    return {
        getApp: function() {
            return app;
        },
        getConfig: function() {
            return configs;
        }
    }
};