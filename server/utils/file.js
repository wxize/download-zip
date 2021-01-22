const fs = require(`fs`)
class File {
    saveFile(path, data) {
        return new Promise((resolve, reject) => {
            const ws = fs.createWriteStream(path)
            ws.on(`open`, () => {
                const blockSize = 128
                const blocks = Math.ceil(data.length / blockSize)
                for (let i = 0; i < blocks; i++) {
                    const currentBlock = data.slice(blockSize * i, Math.min(blockSize * (i + 1), data.length))
                    ws.write(currentBlock)
                }
                ws.end()
            })
            ws.on(`error`, err => reject(err))
            ws.on(`finish`, () => resolve(true))
        })
    }
}

module.exports = new File()