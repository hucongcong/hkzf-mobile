import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Index from './Index/index.js'
import House from './House'
import News from './News'
import Profile from './Profile'
import NoMatch from '../NoMatch'
import './index.scss'
import { TabBar } from 'antd-mobile'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 用于控制默认选中的tab栏
      selectedTab: 'blueTab',
      // 用于控制tabBar显示或者隐藏的
      hidden: false,
      // 用于控制tabBar是否是全屏的
      fullScreen: false,
    }
  }
  // 渲染每个tabBar中显示的内容
  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
        <a
          style={{
            display: 'block',
            marginTop: 40,
            marginBottom: 20,
            color: '#108ee9',
          }}
          onClick={(e) => {
            e.preventDefault()
            this.setState({
              hidden: !this.state.hidden,
            })
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a
          style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault()
            this.setState({
              fullScreen: !this.state.fullScreen,
            })
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    )
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
        <div
          style={
            this.state.fullScreen
              ? { position: 'fixed', height: '100%', width: '100%', top: 0 }
              : { height: 400 }
          }
        >
          {/* 
            TabBar组件
            unselectedTintColor 没有选中的文字的颜色
            tintColor： 选中文字的颜色
            barTintColor: 整体的tabBar的背景色
            hidden： 用于控制整体tabBar是否渲染的
          */}
          <TabBar
            unselectedTintColor="red"
            tintColor="green"
            barTintColor="pink"
            hidden={this.state.hidden}
          >
            {/* 
              配置一个tab选项
              title: 选项显示的文字
              key: 唯一，和title一致就行
              icon: 控制选项的图标
              selectedIcon: 选中的图标
              selected ： 控制当前tabBar是否选中
              badge： 徽章 角标
              onPress: 点击事件
            */}
            <TabBar.Item
              title="生活"
              key="生活"
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              selected={this.state.selectedTab === 'blueTab'}
              badge={100}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                })
              }}
            >
              1
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              title="Koubei"
              key="Koubei"
              badge={'new'}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                })
              }}
              data-seed="logId1"
            >
              2
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
                  }}
                />
              }
              title="Friend"
              key="Friend"
              dot
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                })
              }}
            >
              {this.renderContent('Friend')}
            </TabBar.Item>
            <TabBar.Item
              icon={{
                uri:
                  'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
              }}
              selectedIcon={{
                uri:
                  'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
              }}
              title="My"
              key="my"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                })
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home
