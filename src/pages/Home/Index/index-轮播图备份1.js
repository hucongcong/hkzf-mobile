import React from 'react'
import { Carousel } from 'antd-mobile'
import axios from 'axios'

class Index extends React.Component {
  state = {
    // 图片的地址
    swiperList: [],
    // 轮播图的初始高度
  }
  // 模拟发请求的，轮播图的数据都是后台返回的
  componentDidMount() {
    // 发送ajax请求，获取轮播图数据
    this.getSwipers()
  }

  // 获取轮播图
  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        swiperList: body,
        imgHeight: 212,
      })
    }
  }

  render() {
    return (
      <div className="index">
        {/* 
          轮播图部分 
            autoplay: 控制轮播图是否自动播放
            infinite: 无限滚动
            autoplayInterval: 轮播图的切换间隔
            beforeChange： 滚动前执行的函数
            afterChange: 滚动后执行的函数 
        */}
        <div style={{ height: this.state.imgHeight }}>
          <Carousel autoplay infinite autoplayInterval={1000}>
            {this.state.swiperList.map((item) => (
              <img
                key={item.id}
                src={'http://localhost:8080' + item.imgSrc}
                alt={item.alt}
                onLoad={() => {
                  // 当图片加载完成,动态的设置轮播图的高度
                  this.setState({
                    imgHeight: 'auto',
                  })
                }}
              ></img>
            ))}
          </Carousel>
        </div>
        123123123
      </div>
    )
  }
}

export default Index
