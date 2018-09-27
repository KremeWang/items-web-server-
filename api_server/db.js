//数据库处理模块
const mysql = require('mysql');
//连接数据库
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hero'
})

module.exports = conn;