import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import Index from './Index/index.js'
import House from './House'
import News from './News'
import Profile from './Profile'
import NoMatch from '../NoMatch'
import './index.scss'
class Home extends React.Component {
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
        <div className="tabBar">
          <ul>
            <li>
              <NavLink exact to="/home">
                <span className="iconfont icon-ind"></span>
                <p>首页</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/house">
                <span className="iconfont icon-findHouse"></span>
                <p>找房</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/news">
                <span className="iconfont icon-infom"></span>
                <p>资讯</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/profile">
                <span className="iconfont icon-my"></span>
                <p>我的</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
