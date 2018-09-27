const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))

const router = require('./router.js');
app.use(router);

// 让 后端项目，运行在 5001 端口
app.listen(5001, () => {
    console.log('api server running at http://127.0.0.1:5001')
})