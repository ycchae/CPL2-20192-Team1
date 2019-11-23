var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'54.180.89.180',
    port:3306,
    user:'capstone',
    password:'capstone',
    database:'capstoneDB'
});

module.exports = connection;