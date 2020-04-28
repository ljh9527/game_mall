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
const GameDetails = AsyncComponent(() => import('../pages/GameDetails'));
// 游戏列表
const GameList = AsyncComponent(() => import('../pages/GameList'));
// 登录账号相关
const Login = AsyncComponent(() => import('../pages/Login'));
const ResetPassword = AsyncComponent(() => import('../pages/ResetPassword'));
const Register = AsyncComponent(() => import('../pages/Register'));
// 我的游戏 列表
const MyGameLists = AsyncComponent(() => import('../pages/MyGame/Lists'));
// 我的游戏 游戏详情
const MyGameDetails = AsyncComponent(() => import('../pages/MyGame/Details'));
// 主页
const MyDetails = AsyncComponent(() => import('../pages/MyGame/MyDetails'));
// 我的游戏 下载
const DownloadList = AsyncComponent(() => import('../pages/Download'));
// 我的游戏 下载
const Order = AsyncComponent(() => import('../pages/Order'));
// 支付成功页面
const PaySuccess = AsyncComponent(() => import('../pages/PaySuccess'));
// 订单页
const MyOrder = AsyncComponent(() => import('../pages/MyOrder'));

// 管理员页
const Admin = AsyncComponent(() => import('../pages/Admin'));

const routerData = [
  // 首页
  { path: '/index', component: Home, belong: 0 },
  // 游戏详情
  { path: '/game/details', component: GameDetails, belong: 0 },
  // 游戏详情
  { path: '/game/list', component: GameList, belong: 0 },
  // 我的订单页
  { path: '/game/order', component: Order, belong: 0 },
  // 我的订单成功页
  { path: '/pay/success', component: PaySuccess, belong: 0 },
  // 我的游戏 
  { path: '/myGame/index', component: MyGameLists, belong: 1 },
  { path: '/myGame/edit', component: MyDetails, belong: 1 },
  { path: '/myGame/details', component: MyGameDetails, belong: 1 },
  // 我的订单页
  { path: '/myorder', component: MyOrder, belong: 1 },

  // 我的订单页
  { path: '/admin', component: Admin, belong: 1 },
];

// belong属性用于判断该路由属于哪个大页面下，0表商城 1表我的
const newRouter = [
  // 登录
  { path: '/', component: Login },
  // 注册
  { path: '/register', component: Register },
  // 重置密码
  { path: '/resetPassword', component: ResetPassword },
  // 下载列表 
  { path: '/downloadList', component: DownloadList },
];

const RouterCom = (props) => {
  return (
    <Router history={history}>
      <Switch>
        {
          newRouter.map((item) => {
            return (<Route exact path={item.path} key={item.path} component={item.component} />);
          })
        }
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