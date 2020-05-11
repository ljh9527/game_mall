import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import style from './index.module.scss';
const { Content, Sider } = Layout;

const menus = [{
  title: "游戏列表",
  path: "/game/edit",
  icon: "edit"
},{
  title: "编辑游戏",
  path: "/game/add",
  icon: "plus"
}, {
  title: "游戏首页",
  path: "/game/index",
  icon: "appstore"
}];

const AdminLayout = (props) => {
  const { history } = props;
  const menuList = menus;
  const path = window.location.pathname.split('/')[2];
  const activeMainMenu = menus.find((item) => (item.path === `/game/${path}`));

  const handleClickMenu = (item) => {
    history.push(item.keyPath[0]);
  };
  const handleSelectMenu = (item) => {
    history.push(item.keyPath[0]);
  }

  return (
    <div className={style.wrap}>
      <Layout
        style={{ height: "100%" }}
      >
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <Menu
            theme="light"
            mode="inline"
            // defaultSelectedKeys={activeMainMenu}
            selectedKeys={[activeMainMenu.path]}
            onSelect={handleSelectMenu}
            onClick={handleClickMenu}
          >
            {
              menuList.map((item) => (
                <Menu.Item key={item.path}>
                  <Icon type={item.icon} />
                  <span className="nav-text">{item.title}</span>
                </Menu.Item>
              ))
            }

          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '24px 16px 16px' }}>
            {
              props.children
            }
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;