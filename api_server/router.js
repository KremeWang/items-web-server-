const express = require('express');
const router = express.Router();

const ctrl = require('./controller.js');

router.get('/', ctrl.testAPI);

//暴露getAllHero接口(获取全部英雄信息)
router.get('/getAllHero',ctrl.getAllHero);

//暴露添加英雄的API接口
router.post('/addhero', ctrl.addHero);

//根据id获取对应的英雄信息
router.get('/gethero/:id', ctrl.getHeroById);

//根据ID更新对应的英雄信息
router.post('/updatehero/:id', ctrl.updateHeroById);

//根据ID信息删除对应英雄
router.get('/deletehero/:id', ctrl.deleteHeroById);

module.exports = router;