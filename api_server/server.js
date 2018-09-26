const express = require('express')
const app = express()
const mysql = require('mysql');

//连接数据库
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hero'
})

app.get('/', (req, res) => {
    res.send('请求后台API接口成功！');
})

//暴露getAllHero接口
app.get('/getAllHero', (req, res) => {
    const sql = 'select * from heros';
    conn.query(sql, (err, result) => {
        if (err) return res.send({
            status: 500,
            msg: err.message,
            data: null
        })
        res.send({
            status: 200,
            msg: '获取成功！',
            data: result
        })
    })
})

// 让 后端项目，运行在 5001 端口
app.listen(5001, () => {
    console.log('api server running at http://127.0.0.1:5001')
})