// 编写 http request 工具类
const http = require('http')
const fs = require('fs')

class Request {
    constructor() {
        this.url = ''
        this.callback = null
    }

    setUrl(url) {
        this.url = url
        return this
    }
    
    then(callback) {
        this.callback = callback
    }

    save(path) {
        let file = fs.createWriteStream(path)
        http.get(this.url, res => {
            res.on('data', data => {
                file.write(data)
            })
            res.on('end', () => {
                file.end()
                if (this.callback) {
                    this.callback()
                }
            })
        })
        return this
    }

    getData() {
        http.get(this.url, res => {
            let str = ''
            res.on(`data`, data => {
                str += data
            })
            res.on(`end`, () => {
                if (this.callback) {
                    this.callback(str)
                }
            })
        })
        return this
    }
}

module.exports = Request