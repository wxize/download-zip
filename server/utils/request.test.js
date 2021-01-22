// 测试类
const Request = require('./request')

const zip = new Request()
zip
    .download('http://localhost:5000/data-screen-render-release.zip')
    .to('../files/data-screen-render-release.zip')
    .then(() => {
        console.log(`下载完成`)
    })