'use strict';

var http = require("http");
var express = require('express');
var app = express();
var pino = require('express-pino-logger')({name: 'devx-democart', level: 'error'});
var router = express.Router();

module.exports = {
    allowCrossDomain: function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    },

    createServer: function () {
        app.use(pino);
        app.set("port", 8088);
       // app.set("hostname", config.HOST || 'localhost');
       app.use(express.static('./webapp'));
        app.use(this.allowCrossDomain);
        router.get('/', function (req, res) {
            res.sendFile('./webapp/index.html');
        });

        app.use('/', router);
        return http.createServer(app);
    },

    start: function () {
        this.server = this.server || this.createServer();

        this.server.listen(8088, function () {
			/*eslint-disable */
            console.log("Webapp server started at port %s", 8088);
			/*eslint-eable */
        });
    }
};