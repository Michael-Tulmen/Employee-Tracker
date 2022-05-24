const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Magic2213',
    database: 'employeesdb'
});
module.exports = db;