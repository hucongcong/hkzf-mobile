import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Index from './Index/index.js'
import House from './House'
import News from './News'
import Profile from './Profile'
import NoMatch from '../NoMatch'
import './index.scss'
import { TabBar } from 'antd-mobile'
const tabs = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home',
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/house',
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news',
  },
  {
    title: '个人中心',
    icon: 'icon-my',
    path: '/home/profile',
  },
]
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 用于控制默认选中的tab栏
      // 不能写死这个默认高亮的 selectedTab, 这个值应该动态获取
      selectedTab: this.props.location.pathname,
    }
  }
  render() {
    return (
      <div className="home">
        {/* 配置嵌套路由 */}
        <Switch>
          <Route exact path="/home" component={Index}></Route>
          <Route path="/home/house" component={House}></Route>
          <Route path="/home/news" component={News}></Route>
          <Route path="/home/profile" component={Profile}></Route>
          <Route component={NoMatch}></Route>
        </Switch>

        {/* 使用antd-mobile的tabBar组件 */}
        <div className="tabBar">
          <TabBar
            unselectedTintColor="#333"
            tintColor="red"
            barTintColor="#fff"
          >
            {tabs.map((item) => (
              <TabBar.Item
                title={item.title}
                key={item.title}
                icon={<span className={'iconfont ' + item.icon}></span>}
                selectedIcon={<span className={`iconfont ${item.icon}`}></span>}
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                  this.setState({
                    selectedTab: item.path,
                  })
                  this.props.history.push(item.path)
                }}
              ></TabBar.Item>
            ))}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home
