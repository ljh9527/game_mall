/**
 * 头部组件
 *
 * @author: ljjunhong
 */

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import DropDownMenu from '../DropDownMenu';

import classnames from 'classnames';
import styles from './index.module.scss';

const { ipcRenderer, remote } = window.electron;
const { BrowserWindow } = remote;
console.log(ipcRenderer);
const Home = (props) => {

  const { history, routerData } = props;
  const [selectIndex, setSelectIndex] = useState(0); // 主页商城状态控制
  // const {
  //   // onSwitch = () => {},
  //   history,
  //   list = [],
  //   path = '',
  //   onLinkToBefore = () => {},
  // } = props;
  // const [pathActive, setPathActive] = useState(0);
  // useEffect(() => {
  //   if (list && list.length) {
  //     list.forEach((v, i) => {
  //       if (path.indexOf(v.path) > -1) {
  //         setPathActive(i);
  //       }
  //     });
  //   }
  // }, [path, list]);
  // 点击跳转，若有children，则路由下钻
  // const linkTo = (item) => {
  //   if (path.indexOf(item.path) <= -1) {
  //     const getUrl = (item) => {
  //       let url = item.path;
  //       if (item.children && item.children.length && !item.children[0].hide) {
  //         url = getUrl(item.children[0]);
  //       }
  //       return url;
  //     };
  //     onLinkToBefore();
  //     let url = getUrl(item);
  //     history.push(url);
  //   }
  // };
  useEffect(() => {
    const { pathname } = window.location;
    // eslint-disable-next-line array-callback-return
    routerData.map((item) => {
      if (pathname === item.path) {
        setSelectIndex(item.belong);
      }
    });
  }, [props, routerData]);
  const closeWindow = () => {
    window.close();
  };
  const minWindow = () => {
    ipcRenderer.send("min");
  };
  // 回退
  const handleBack = () => {
    history.goBack();
  };
  // 刷新
  const handleReload = () => {
    history.go(0);
  };
  const handleToShopping = () => {
    setSelectIndex(0);
    history.push('/index');
  };
  const handleToHome = () => {
    setSelectIndex(1);
    history.push('/myGame/index');
  };
  const download = () => {
    console.log('查看下载');
    let win = new BrowserWindow({
      width: 300,
      height: 400,
      frame: false,  //是否带工具栏
      webPreferences: {
        nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
      }
    })
    win.on('closed', () => {
      win = null
    })
    win.loadURL('http://localhost:9000/DownloadList');
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.top}>
            <div className={styles.topLeft}>FunGame</div>
            <div className={styles.topRight}>
              <Icon type="minus" className={styles.minus} onClick={minWindow} />
              <Icon type="close" className={styles.close} onClick={closeWindow} />
            </div>
          </div>
          <div className={styles.headerCenter}>
            <div className={styles.iconContainer}>
              <Icon type="left" onClick={handleBack} />
              <Icon type="reload" onClick={handleReload} />
            </div>
            <div className={styles.switchButton}>
              <div className={classnames({ [styles.active]: selectIndex === 0, [styles.selectIcon]: true })} onClick={handleToShopping}>
                <Icon type="shopping" className={styles.shoppingIcon} />
                <div className={classnames({ [styles.selected]: selectIndex === 0, [styles.word]: true })}>商店</div>
              </div>
              <div className={classnames({ [styles.active]: selectIndex === 1, [styles.selectIcon]: true })} onClick={handleToHome}>
                <Icon type="home" />
                <div className={classnames({ [styles.selected]: selectIndex === 1, [styles.word]: true })}>主页</div>
              </div>
            </div>
            <div className={styles.userInfo}>
              <DropDownMenu />
              <div onClick={download} className={styles.download} >
                <Icon type="download" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main}>{props.children}</div>
    </div >
  );
};

export default withRouter(Home);
