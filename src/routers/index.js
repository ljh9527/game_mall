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
// 游戏详情
const GameDetails = AsyncComponent(() => import('../pages/Details'));
// 登录账号相关
const Login = AsyncComponent(() => import('../pages/Login'));
const ResetPassword = AsyncComponent(() => import('../pages/ResetPassword'));
const Register = AsyncComponent(() => import('../pages/Register'));
// 我的游戏 列表
const MyGameLists = AsyncComponent(() => import('../pages/MyGame/Lists'));
// 我的游戏 详情
const MyGameDetails = AsyncComponent(() => import('../pages/MyGame/Details'));

const routerData = [
  // 首页
  { path: '/index', component: Home },
  // 游戏详情
  { path: '/game/details', component: GameDetails },
  // 我的游戏 
  { path: '/myGame/index', component: MyGameLists },
  { path: '/myGame/details', component: MyGameDetails },
];

const RouterCom = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <Header>
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