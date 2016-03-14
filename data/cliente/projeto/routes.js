var express = require('express');

var router = express.Router();

module.exports = function(db) {
    router.get('/test', function(req, res, next) {
        res.json(db('posts'));
        next();
    });

    return {
        router: router
    };
};


