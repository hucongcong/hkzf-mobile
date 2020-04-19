import React from 'react'
import './index.scss'
class Map extends React.Component {
  render() {
    return <div className="map" id="map"></div>
  }
  componentDidMount() {
    // 创建百度地图
    // 如果想要访问全局变量，需要使用window.xxx
    var map = new window.BMap.Map('map')
    // 设置地图的中心点
    var point = new window.BMap.Point(121.59604367028464, 31.041932017108792)
    map.centerAndZoom(point, 15)
  }
}

export default Map
