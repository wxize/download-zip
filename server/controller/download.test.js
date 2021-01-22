const download = require('./download')


download.getPageData(`08fe96e7a4794a07b7194d8c053c0b5d`).then(data => {
    // 是字符串还是对象 ？？
    console.log(data)
}).catch(err => console.log(err))
