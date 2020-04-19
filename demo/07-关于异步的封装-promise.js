// 请封装一个方法，用于读取指定的文件，，并且获取改文件的读取结果。
const fs = require('fs')
// 承诺 promise  pending  fullfilled  rejected
function read(name, callback) {
  // 读取文件是一个异步的操作。 将来
  return new Promise(function (resolve, reject) {
    fs.readFile(name, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

read('a.txt').then((data) => {
  console.log(data)
})
