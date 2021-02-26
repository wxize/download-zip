const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

const download = require('../controller/download')

router.get('/', async ctx => {
    // 将请求参数返回，验证一下api是不是通的
    ctx.body = ctx.request.query
    let query = ctx.request.query
    if (!query.id)  {
        ctx.body = {
            code: 1,
            message: '参数错误'
        }
    } else {
        let filePath = await download.generate(query.id)
        console.log(filePath)
        ctx.set(`Content-Type`, `application/octet-stream`)
        ctx.set(`Content-Disposition`, `attachment;filename=${filePath}`)
        ctx.body = fs.createReadStream(filePath)
    }
    
})

router.get('/health', ctx => {
    console.log('/health')
    ctx.body = 'ok'
})

module.exports = router