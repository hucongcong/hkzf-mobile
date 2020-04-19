import React from 'react'
import './index.scss'
import { NavBar, Icon, Toast } from 'antd-mobile'
import axios from 'axios'
import { getCurrentCity, setCity } from 'utils/city'
import { List, AutoSizer } from 'react-virtualized'

// const list = Array.from(new Array(100)).map(
//   (item, index) => `我是第${index}条数据`
// )
const TITLE_HEIGHT = 36
const CITY_HEIGHT = 50
const HOT = ['北京', '上海', '广州', '深圳']
class City extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityObj: {},
      cityArr: [],
      // 当前高亮的下标
      currentIndex: 0,
    }
    // 创建ref
    this.listRef = React.createRef()
  }

  componentDidMount() {
    this.getCityList()
  }

  // 获取城市列表数据
  async getCityList() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    // console.log(res.data)
    const { status, body } = res.data
    if (status === 200) {
      const { cityObj, cityArr } = this.parseCityList(body)

      // 处理热门城市数据
      const result = await axios.get('http://localhost:8080/area/hot')
      cityArr.unshift('hot')
      cityObj.hot = result.data.body

      // 处理当前定位城市
      // 1. 优先从localStorage中获取当前城市信息
      // 2. 如果获取到了，直接使用
      // 3. 如果没有获取到，调用百度地图的API，去定位当前城市
      // 4. 把当前城市信息存储到缓存里面。
      cityArr.unshift('#')
      // getCurrentCity((city) => {
      //   console.log(city)
      // })
      const city = await getCurrentCity()
      // console.log(city)
      cityObj['#'] = [city]
      // 如何获取当前定位的城市
      this.setState(
        {
          cityObj,
          cityArr,
        },
        () => {
          // 等cityObj和cityArr数据修改完并且渲染完成
          // 测量所有的行
          this.listRef.current.measureAllRows()
        }
      )
    }
  }

  // 用于处理城市数据
  parseCityList(body) {
    // console.log(body)
    // 这是一个对象，这个对象格式： {a: [], b:[]}

    // 思路：
    // 1. 遍历数据
    // 2. 获取到城市的short简写第一个字符
    // 3. 判断这个字符在对象中是否存在。
    // 4. 如果不存在。 给对象新增加一个属性  cityObj['b'] = [item]
    // 5. 如果存在， 直接给这个属性的值 push一个值   cityObj['b'].push(item)

    // 除了cityObj, 还需要得到一个数组， 这个数组存储了所有的城市的简写，这个数组还要有顺序
    const cityObj = {}
    body.forEach((item) => {
      const short = item.short.slice(0, 1)
      // console.log(short)
      if (short in cityObj) {
        // 有
        cityObj[short].push(item)
      } else {
        // 没有
        cityObj[short] = [item]
      }
    })

    const cityArr = Object.keys(cityObj).sort()
    // 把解析得到的对象和数组返回
    return {
      cityObj,
      cityArr,
    }
  }

  // 处理标题
  parseTitle(title) {
    if (title === '#') {
      return '当前定位'
    } else if (title === 'hot') {
      return '热门城市'
    } else {
      return title.toUpperCase()
    }
  }

  selctCity(city) {
    // console.log(city)
    if (HOT.includes(city.label)) {
      // 把城市存到localStorage中即可。需要一个处理，只有热门的4个城市有数据
      // localStorage.setItem('current_city', JSON.stringify(city))
      setCity(city)
      // 跳转到上一页
      this.props.history.go(-1)
    } else {
      // 给一个提示
      // alert('该城市没有更多的房源信息')
      Toast.info('该城市没有更多的房源信息', 1)
    }
  }

  // key: 因为长列表是遍历出来的，渲染的元素肯定是需要加key的
  // index: 需要渲染的数据的下标
  // isScrolling: 是否正在滚动
  // isVisiable: 指定当前这条数据是否可见
  // style用于控制每一项数据的样式，位置
  rowRenderer({ key, index, style }) {
    // console.log(this)
    const short = this.state.cityArr[index]
    const citys = this.state.cityObj[short]
    // console.log(short, citys)s
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.parseTitle(short)}</div>
        {citys.map((item) => (
          <div
            key={item.value}
            className="name"
            onClick={this.selctCity.bind(this, item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 动态的计算每一行的高度
  caclHeight({ index }) {
    const title = this.state.cityArr[index]
    const arr = this.state.cityObj[title]
    // console.log(arr)
    // 每一行的高度 = 标题的高度 + 一个城市的高度 * 城市的个数
    return TITLE_HEIGHT + arr.length * CITY_HEIGHT
  }

  // 当List长列表的行发生改变的时候会触发
  onRowsRendered({ startIndex }) {
    // console.log('行改变了', obj)
    // startIndex获取到的是开始的行的下标
    if (this.state.currentIndex !== startIndex) {
      // console.log(startIndex)
      this.setState({
        currentIndex: startIndex,
      })
    }
  }

  handleClick(index) {
    // console.log(index)
    // console.log('点击事件')
    // 调用List组件的方法： ScrollToRow
    // console.log(this.listRef.current)
    this.listRef.current.scrollToRow(index)
  }

  render() {
    return (
      <div className="city">
        {/* 导航条 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          城市选择
        </NavBar>
        {/* 
          城市列表
          width: 长列表的宽度
          height: 长列表的高度
          rowCount: 用于指定有多少条数据
          rowHeight： 指定每一行的高度, 可以是一个固定的高度，或者一个函数
          rowRenderer： 用于控制每一行数据渲染的具体的内容
          scrollToAlignment: 配置scrollToRow的对其方式  start end center
        */}
        <AutoSizer>
          {({ width, height }) => (
            <List
              height={height}
              width={width}
              rowCount={this.state.cityArr.length}
              rowHeight={this.caclHeight.bind(this)}
              rowRenderer={this.rowRenderer.bind(this)}
              onRowsRendered={this.onRowsRendered.bind(this)}
              ref={this.listRef}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>

        {/* 右侧快捷导航 */}
        <ul className="city-index">
          {this.state.cityArr.map((item, index) => (
            <li key={item} className="city-index-item">
              <span
                className={
                  index === this.state.currentIndex ? 'index-active' : ''
                }
                onClick={this.handleClick.bind(this, index)}
              >
                {item === 'hot' ? '热' : item.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default City
