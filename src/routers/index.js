/**
 * 路由主组件
 */

import React from 'react';
// import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';

import { AsyncComponent } from '../components';
// 首页
const Home = AsyncComponent(() => import('../pages/Home'));
// 登录
const Login = AsyncComponent(() => import('../pages/Login'));

const routerData = [
  // 首页
  { path: '/login', component: Login },

];

const RouterCom = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Switch>
          {
            routerData.map((item) => {
              return (<Route exact path={item.path} key={item.path} component={item.component} />);
            })
          }
        </Switch>
      </Switch>
    </Router>
  );
};

export default RouterCom;