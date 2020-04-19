// 请封装一个方法，用于读取指定的文件，，并且获取改文件的读取结果。

// 如果封装是一个异步的函数，是不能直接通过返回值返回结果的。因为没有结果。
// 解决方式1: 封装该函数的时候，传入一个回调函数（回头再调用)
const fs = require('fs')
function read(name, callback) {
  fs.readFile(name, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      // 成功了，直接返回成功的数据
      callback(data)
    }
  })
}

// 回调函数会在异步操作结束的时候执行
read('a.txt', function (data) {
  console.log(data)
})

read('b.txt', function (data) {
  console.log(data)
})
