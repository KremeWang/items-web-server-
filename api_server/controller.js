//封装业务逻辑处理模块
const conn = require('./db.js');

module.exports = {
    testAPI: (req, res) => {
        res.send('请求后台API接口成功！');
    },
    getAllHero: (req, res) => {
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
    },
    addHero: (req, res) => {
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
    },
    getHeroById: (req, res) => {
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
    },
    deleteHeroById: (req, res) => {
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
    },
    updateHeroById: (req, res) => {
        const id = req.params.id;
        const newInfo = req.body;
        const dt = new Date();
        //padStart
        const year = dt.getFullYear();
        const month = (dt.getMonth() + 1).toString().padStart(2, '0');
        const day = dt.getDate().toString().padStart(2, '0');
        const hour = dt.getHours().toString().padStart(2, '0');
        const minute = dt.getMinutes().toString().padStart(2, '0');
        const second = dt.getSeconds().toString().padStart(2, '0');

        newInfo.ctime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
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
    }
}