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
// 游戏列表
const GameList = AsyncComponent(() => import('../pages/GameList'));
// 登录账号相关
const Login = AsyncComponent(() => import('../pages/Login'));
const ResetPassword = AsyncComponent(() => import('../pages/ResetPassword'));
const Register = AsyncComponent(() => import('../pages/Register'));
// 我的游戏 列表
const MyGameLists = AsyncComponent(() => import('../pages/MyGame/Lists'));
// 我的游戏 详情
const MyGameDetails = AsyncComponent(() => import('../pages/MyGame/Details'));
// 我的游戏 详情
const DownloadList = AsyncComponent(() => import('../pages/Download'));

const routerData = [
  // 首页
  { path: '/index', component: Home, belong:0 },
  // 游戏详情
  { path: '/game/details', component: GameDetails, belong:0 },
  // 游戏详情
  { path: '/game/list', component: GameList, belong:0 },
  // 我的游戏 
  { path: '/myGame/index', component: MyGameLists, belong:1 },
  { path: '/myGame/details', component: MyGameDetails, belong:1 },
  // 下载列表
  { path: '/DownloadList', component: DownloadList },
];
// belong属性用于判断该路由属于哪个大页面下，0表商城 1表我的

const RouterCom = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <Header routerData={routerData}>
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