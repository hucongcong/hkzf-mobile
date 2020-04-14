import React from 'react'
// 导入路由信息
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import City from './pages/City'
import Home from './pages/Home'
import Map from './pages/Map'
import NoMatch from './pages/NoMatch'
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          {/* 路由规则 */}
          <Switch>
            {/* 路由重定向 */}
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/home" component={Home}></Route>
            <Route path="/city" component={City}></Route>
            <Route path="/map" component={Map}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
