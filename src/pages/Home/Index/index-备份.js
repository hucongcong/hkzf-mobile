import React from 'react'
import { Carousel, Flex } from 'antd-mobile'
import axios from 'axios'

// 轮播图要求在渲染的时候有内容，才会自动播放，渲染的时候如果没有内容，就不会自动播放。
// 当有数据的时候，才去渲染轮播图组件
class Index extends React.Component {
  state = {
    // 图片的地址
    swiperList: [],
    // 轮播图的初始高度
    // 轮播图初始的高度,,,,因为图片没高度
    // 375/212
    // 375 212
    imgHeight: (212 / 375) * window.innerWidth,
  }
  componentDidMount() {
    // 发送ajax请求，获取轮播图数据
    this.getSwipers()
  }

  // 获取轮播图
  getSwipers() {
    setTimeout(async () => {
      const res = await axios.get('http://localhost:8080/home/swiper')
      const { status, body } = res.data
      if (status === 200) {
        this.setState({
          swiperList: body,
        })
      }
    }, 1000)
  }

  renderSwiper() {
    if (this.state.swiperList.length > 0) {
      return (
        <Carousel autoplay infinite autoplayInterval={1000}>
          {this.state.swiperList.map((item) => (
            <a
              key={item.id}
              href="http://www.alipay.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight,
              }}
            >
              <img
                src={`http://localhost:8080` + item.imgSrc}
                alt={item.alt}
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="carousel" style={{ height: this.state.imgHeight }}>
          {this.renderSwiper()}
        </div>
        {/* 导航模块 */}
        <div className="nav">
          <Flex>
            <Flex.Item>1</Flex.Item>
            <Flex.Item>2</Flex.Item>
            <Flex.Item>3</Flex.Item>
            <Flex.Item>4</Flex.Item>
          </Flex>
        </div>
      </div>
    )
  }
}

export default Index
