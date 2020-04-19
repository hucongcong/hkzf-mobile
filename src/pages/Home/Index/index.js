import React from 'react'
import axios from 'axios'
import { Carousel, Flex, Grid } from 'antd-mobile'
import nav1 from 'assets/images/nav-1.png'
import nav2 from 'assets/images/nav-2.png'
import nav3 from 'assets/images/nav-3.png'
import nav4 from 'assets/images/nav-4.png'
import './index.scss'
import { getCurrentCity } from 'utils/city'
/* 
  思路：
    1. 进入到首页，首先根据百度地图获取到当前的城市
    2. 获取到城市信息后，需要发送请求，去获取城市的详细信息，包含了城市名字和城市的id
    3. 有了城市id，我们才去发送请求获取小组数组和资讯
*/
const navList = [
  {
    title: '整租',
    path: '/home/house',
    icon: nav1,
  },
  {
    title: '合租',
    path: '/home/house',
    icon: nav2,
  },
  {
    title: '地图找房',
    path: '/map',
    icon: nav3,
  },
  {
    title: '去出租',
    path: '/rent',
    icon: nav4,
  },
]

class Index extends React.Component {
  state = {
    swiperList: [],
    imgHeight: (212 / 375) * window.innerWidth,
    groupList: [],
    newsList: [],
    // 当前城市的信息
    city: {
      label: '北京',
      value: '',
    },
  }
  async componentDidMount() {
    this.getSwipers()

    const city = await getCurrentCity()
    this.setState(
      {
        city: city,
      },
      () => {
        // 等获取到了城市的id，才获取小组信息和资讯
        this.getGroups()
        this.getNews()
      }
    )

    // // 根据百度地图获取到城市（ip定位)
    // console.log(window.BMap)
    // var myCity = new window.BMap.LocalCity()
    // // 参数：回调函数
    // myCity.get(async (result) => {
    //   // const cityName = result.name
    //   // console.log(cityName)
    //   // 根据城市的名字发送请求，换区城市的信息
    //   const res = await axios.get('http://localhost:8080/area/info', {
    //     params: {
    //       name: result.name,
    //     },
    //   })
    //   console.log(res.data)
    //   // 保存label和value值
    //   const { status, body } = res.data
    //   // 首页多做一件事情，把百度地图获取到的地理位置存储到localStorage中
    //   localStorage.setItem('current_city', JSON.stringify(body))
    //   if (status === 200) {
    //     this.setState(
    //       {
    //         city: body,
    //       },
    //       () => {
    //         // 等获取到了城市的id，才获取小组信息和资讯
    //         this.getGroups()
    //         this.getNews()
    //       }
    //     )
    //   }
    // })
  }

  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    const { status, body } = res.data
    if (status === 200) {
      // this.swiperList = body
      // console.log(this.swiperList)
      this.setState({
        swiperList: body,
      })
    }
  }

  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: this.state.city.value,
      },
    })
    // console.log(res.data)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        groupList: body,
      })
    }
  }

  async getNews() {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: this.state.city.value,
      },
    })
    // console.log(res.data)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        newsList: body,
      })
    }
  }

  // 渲染轮播图
  renderSwiper() {
    if (this.state.swiperList.length === 0) {
      return null
    }
    return (
      <Carousel autoplay infinite>
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
              src={'http://localhost:8080' + item.imgSrc}
              alt={item.alt}
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  renderSearch() {
    return (
      <Flex className="search-box">
        <Flex className="search-form">
          <div
            className="location"
            onClick={() => this.props.history.push('/city')}
          >
            <span className="name">{this.state.city.label}</span>
            <span className="iconfont icon-arrow"> </span>
          </div>
          <div className="search-input">
            <span className="iconfont icon-seach" />
            <span className="text">请输入小区地址</span>
          </div>
        </Flex>
        {/* 地图小图标 */}
        <span
          className="iconfont icon-map"
          onClick={() => this.props.history.push('/map')}
        />
      </Flex>
    )
  }
  // 渲染导航
  renderNav() {
    return (
      <Flex>
        {navList.map((item) => (
          <Flex.Item
            key={item.title}
            onClick={() => {
              this.props.history.push(item.path)
            }}
          >
            <img src={item.icon} alt="" />
            <p>{item.title}</p>
          </Flex.Item>
        ))}
      </Flex>
    )
  }
  // 渲染租房小组
  renderGroup() {
    return (
      <>
        {/* 标题 */}
        <h3 className="group-title">
          租房小组
          <span className="more">更多</span>
        </h3>
        {/* 内容 */}
        <div className="group-content">
          {/* 
              data: 需要渲染的数据
              columnNum: 控制显示几列数据
              square:是否固定为正方形
              renderItem： 自定义需要渲染的内容
              hasLine: 是否需要有边框线
              activeStyle={false}: 控制点击高亮的样式
            */}
          <Grid
            data={this.state.groupList}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={(el) => (
              <Flex className="group-item" justify="around">
                {/* {JSON.stringify(el)} --{index} */}
                <div className="desc">
                  <p className="title">{el.title}</p>
                  <span className="info">{el.desc}</span>
                </div>
                <img src={'http://localhost:8080' + el.imgSrc} alt="" />
              </Flex>
            )}
          />
        </div>
      </>
    )
  }
  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="carousel" style={{ height: this.state.imgHeight }}>
          {this.renderSearch()}
          {this.renderSwiper()}
        </div>

        {/* 导航模块 */}
        <div className="nav">{this.renderNav()}</div>

        {/* 租房小组 */}
        <div className="group">{this.renderGroup()}</div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="news-title">最新资讯</h3>
          {this.state.newsList.map((item) => (
            <div className="news-item" key={item.id}>
              <div className="imgwrap">
                <img
                  className="img"
                  src={'http://localhost:8080' + item.imgSrc}
                  alt=""
                />
              </div>
              <Flex className="content" direction="column" justify="between">
                <h3 className="title">{item.title}</h3>
                <Flex className="info" justify="between">
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </Flex>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Index
