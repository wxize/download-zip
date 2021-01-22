const Koa = require('koa')
const router = require('./config/router')
const app = new Koa()

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log(`服务器运行在 http://localhost:3000`)
})