var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'54.180.89.77',
    port:3306,
    user:'capstone2',
    password:'capstone',
    database:'capstoneDB'
});

module.exports = connection;