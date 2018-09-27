const express = require('express');
const router = express.Router();

const mysql = require('mysql');
//连接数据库
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hero'
})

router.get('/', (req, res) => {
    res.send('请求后台API接口成功！');
})

//暴露getAllHero接口(获取全部英雄信息)
router.get('/getAllHero', (req, res) => {
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

//暴露添加英雄的API接口
router.post('/addhero', (req, res) => {
    //获取客户端提交来的英雄名称、性别
    //获取服务器当前时间
    // console.log(req.body);
    const hero = req.body;
    // 获取当前时间对象
    const dt = new Date();
    //padStart
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    const hour = dt.getHours().toString().padStart(2, '0');
    const minute = dt.getMinutes().toString().padStart(2, '0');
    const second = dt.getSeconds().toString().padStart(2, '0');

    hero.ctime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    // console.log(hero);
    const sql = 'insert into heros set ?';
    conn.query(sql, hero, (err, result) => {
        if (err) return res.send({
            status: 500,
            msg: err.message,
            data: null
        })
        res.send({
            status: 200,
            msg: 'ok',
            data: null
        })
    })
    // res.send('ok');
})

//根据id获取对应的英雄信息
router.get('/gethero/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'select * from heros where id=?';
    conn.query(sql, id, (err, result) => {
        if (err) return res.send({
            status: 500,
            msg: err.message,
            data: null
        })
        res.send({
            status: 200,
            msg: 'ok',
            data: result
        })
    })
})

//根据ID更新对应的英雄信息
router.post('/updatehero/:id', (req, res) => {
    const id = req.params.id;
    const newInfo = req.body;

    console.log(newInfo);
    const sql = 'update heros set ? where id=?';
    conn.query(sql, [newInfo, id], (err, result) => {
        if (err) return res.send({
            status: 500,
            msg: err.message,
            data: null
        })
        res.send({
            status: 200,
            msg: 'ok',
            data: null
        })
    })
})

//根据ID信息删除对应英雄
router.get('/deletehero/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'delete from heros where id=?';
    conn.query(sql, id, (err, result) => {
        if (err) return res.send({
            status: 500,
            msg: err.message,
            data: null
        })
        res.send({
            status: 200,
            msg: 'ok',
            data: null
        })
    })
})

module.exports = router;