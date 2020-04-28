import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import style from './index.module.scss';
const { Content, Sider } = Layout;

const AdminLayout = (props) => {
  const {  } = props;


  return (
    <div className={style.wrap}>
      <Layout
        style={{ height: "100%" }}
        >
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">添加游戏</span>
            </Menu.Item>
            
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