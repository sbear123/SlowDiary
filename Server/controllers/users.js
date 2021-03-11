/* GET home page. */
var mysql_dbc = require('../config/database')();
var connection = mysql_dbc.init();

function login(req, res) {
    connection.connect();
    var sql = `SELECT * FROM user WHERE id = '${req.body.id} AND pw = '${req.body.pw}`;
    connection.query(sql, function (error, rows, fields) {
        if (!error) {
            if (rows.length != 0) {
                res.status(200).json({ "success": true });
            } else {
                res.status(200).json({ "success": false });
            }
        } else {
            console.log('query error: ' + error);
            res.status(404).send();
        }
    });
    connection.end();
};

function checkId(req, res) {
    connection.connect();
    var sql = 'SELECT * FROM user WHERE id = ' + req.body.id;
    connection.query(sql, function (error, rows, fields) {
        if (!error) {
            if (rows.length != 0) {
                res.status(200).json({ "success": false });
            } else {
                res.status(200).json({ "success": true });
            }
        } else {
            console.log('query error: ' + error);
            res.status(404).send();
        }
    });
    connection.end();
};

function register(req, res) {
    connection.connect();
    var sql = `INSERT INTO user VALUES ( ${req.body.id}, ${req.body.pw}, ${req.body.name}, ${req.body.age}, ${req.body.gender});`;
    connection.query(sql, function (error, rows, fields) {
        if (!error) {
            res.status(200).json({ "success": true });
        } else {
            console.log('query error: ' + error);
            res.status(404).send();
        }
    });
    connection.end();
};

module.exports = {
    login: login,
    checkId: checkId,
    register: register,
};