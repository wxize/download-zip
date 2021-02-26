const path = require('path')
// 引入 request 工具包
const Request = require('../utils/request')
// const AdmZip = require('adm-zip')
const compressing = require('compressing')
const file = require('../utils/file')
const conf = require('../config/const')

class DownLoad {
    // 传入一个 id , 根据id生成一个新的zip项目包
    async generate(id) {
        // 下载 zip 模板文件
        // await this.getTemplate()
        // 请求页面数据..
        let config = await this.getPageData(id)
        console.log(`config`)
        // 测试一下 getPageData
        // 算下一下数据，改成我们想要的
        let result = {
            page: {
                id: config.id,
                title: 'Bricks', // 先给一个固定的吧
            },
            data: {
                pageMetadata: config
            }
        }
        // 生成一个新 zip 
        // nodejs 操作 zip 可以使用 adm-zip 的包
        // 先安装 adm-zip 
        // 先看一下 data-screen-render-release.zip 的目录结构
        const outputPath = path.resolve(__dirname, `../files/${result.page.id}.zip` )

        // 处理一下 zip 包损坏的问题，
        // 经过测试， adm-zip 这个包自身是有一些问题的
        // 我们换一个包来处理 compressing
        
        // 将下载的包解压出来
        await compressing.zip.uncompress(
            path.resolve(__dirname, `../public/data-screen-render-release.zip`),
            path.resolve(__dirname, `../files/${result.page.id}`) 
            )

        // 添加一个我们想要添加的文件到目录中
        // fs.createWriteStream(`files/${result.page.id}/config/page.js`, )
        await file.saveFile(
            path.resolve(__dirname, `../files/${result.page.id}/config/page.js`), 
            Buffer.from(`window.bricks=` + JSON.stringify(result))
            )
        
        // 创建一个新的 zip 包
        await compressing.zip.compressDir(
            path.resolve(__dirname, `../files/${result.page.id}`), outputPath)
        
        return outputPath
    }

    getPageData(pageId) {
        return new Promise((resolve, reject) => {
            let http = new Request()
            
            http
            .setUrl(`${conf.API_URL}/page/getPageById?id=${pageId}`)
            .getData()
            .then(data => {
                // 将字符串转化为对象
                resolve(JSON.parse(data))
            })
            
        })
    }

    getTemplate() {
        return new Promise((resolve, reject) => {
            let file = new Request()
            file
                .setUrl(`${conf.ZIP_URL}/data-screen-render-release.zip`)
                .save(path.resolve(__dirname, '../files/data-screen-render-release.zip'))
                .then(() => {
                    resolve()
                })
        })
    }
}

module.exports = new DownLoad()