/* 
  1. 优先去localStorage中获取当前城市的信息
  2. 如果有， 直接返回改城市信息
  3. 如果没有，就调用百度地图的API去定位当前城市
  4. 发送ajax请求，得到真实的城市信息，再返回。
  5. 获取到了城市信息，记得往缓存中存一份。
*/
import axios from 'axios'

const CURRENT_CITY = 'current_city'

export function setCity(city) {
  localStorage.setItem(CURRENT_CITY, JSON.stringify(city))
}

export function getCurrentCity(callback) {
  // 因为获取当前城市是异步的操作，直接返回一个承诺
  return new Promise((resolve, reject) => {
    const city = JSON.parse(localStorage.getItem(CURRENT_CITY))
    if (city) {
      resolve(city)
      callback && callback(city)
    } else {
      // 需要通过定位去获取
      const myCity = new window.BMap.LocalCity()
      myCity.get((result) => {
        axios
          .get(`http://localhost:8080/area/info?name=${result.name}`)
          .then((res) => {
            // 1. 把成功的城市信息存储器来
            const { body } = res.data
            setCity(body)
            resolve(body)
            callback && callback(body)
          })
          .catch((err) => {
            reject(err)
            callback && callback(err)
          })
      })
    }
  })
}

// export function getCurrentCity1(callback) {
//   const city = JSON.parse(localStorage.getItem('current_city'))
//   if (city) {
//     // 如果有city
//     // return city
//     callback(city)
//   } else {
//     // 需要通过定位去获取
//     const myCity = new window.BMap.LocalCity()
//     myCity.get(async (result) => {
//       const res = await axios.get(
//         `http://localhost:8080/area/info?name=${result.name}`
//       )
//       console.log(res)
//       // 如果成功了
//       const { status, body } = res.data
//       if (status === 200) {
//         localStorage.setItem('current_city', JSON.stringify(body))
//         callback(body)
//       }
//     })
//   }
// }
