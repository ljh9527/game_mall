/**
 * 路由主组件
 */

import React from 'react';
// import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';

import { AsyncComponent, Header } from '../components';
// 首页
const Home = AsyncComponent(() => import('../pages/Home'));
// 登录账号相关
const Login = AsyncComponent(() => import('../pages/Login'));
const ResetPassword = AsyncComponent(() => import('../pages/ResetPassword'));
const Register = AsyncComponent(() => import('../pages/Register'));

const routerData = [
  // 登录相关
  { path: '/login', component: Login },
  { path: '/resetPassword', component: ResetPassword },
  { path: '/register', component: Register },

];

const RouterCom = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <Header>
          <Route exact path="/" component={Home} />
          <Switch>
            {
              routerData.map((item) => {
                return (<Route exact path={item.path} key={item.path} component={item.component} />);
              })
            }
          </Switch>
        </Header>
      </Switch>
    </Router>
  );
};

export default RouterCom;