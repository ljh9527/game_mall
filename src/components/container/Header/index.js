/**
 * 头部组件
 *
 * @author: ljjunhong
 */

import React, { useState, useEffect } from 'react';
import services from '../../../services';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Modal, Progress } from 'antd';
import moment from 'moment';
import DropDownMenu from '../DropDownMenu';
import { requestErrorHandler } from '../../../utils';

import classnames from 'classnames';
import styles from './index.module.scss';

const { ipcRenderer, remote } = window.electron;
const { BrowserWindow } = remote;
const Home = (props) => {

  const { userInfo, getUserInfo, history, routerData, count, getCartList, percentComplete, game } = props;
  const [selectIndex, setSelectIndex] = useState(0); // 主页商城状态控制
  const [visible, setVisible] = useState(false); // modle的展示控制
  const [fullscreen, setFullscreen] = useState(false); // modle的展示控制
  const userAvatar = sessionStorage.getItem("AVATAR");
  const email = localStorage.getItem("EMAIL");
  console.log(userInfo.isadmin);
  useEffect(() => {
    const { pathname } = window.location;
    // eslint-disable-next-line array-callback-return
    routerData.map((item) => {
      if (pathname === item.path) {
        setSelectIndex(item.belong);
      }
    });
  }, [props, routerData]);
  useEffect(() => {
    getCartList({ email });
    getUserInfo({ email });
  }, []);
  const closeWindow = () => {
    updateUserInfo();
  };
  const updateUserInfo = async (down) => {
    let time = new Date().getTime();
    let opentime = sessionStorage.getItem("OPENTIME");
    let durtime = time - opentime;
    let playtime = moment.duration(durtime).hours() + moment.duration(durtime).minutes() / 60;
    const params = {
      time: time,
      email: email,
      playtime: playtime.toFixed(2)
    }
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.updateUserInfo(params);
      if (data.code === 200) {
        if (!down) {
          window.close();
        }
      }
    } catch (error) {
      requestErrorHandler(error);
    }
  };
  const minWindow = () => {
    ipcRenderer.send("min");
  };
  // 切换全屏
  const switchFullscreen = () => {
    setFullscreen(!fullscreen);
    console.log("fullscreen",fullscreen);
    ipcRenderer.send("window-max");
  };
  ipcRenderer.on('main-window-max', (event) => {
    setFullscreen(true);
  });
  ipcRenderer.on('main-window-unmax', (event) => {
    setFullscreen(false);
  });
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
  const handleToCart = () => {
    history.push('/game/order');
  };
  const download = () => {
    // let win = new BrowserWindow({
    //   width: 400,
    //   height: 400,
    //   frame: false,  //是否带工具栏
    //   webPreferences: {
    //     nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
    //   }
    // })
    // win.on('closed', () => {
    //   win = null
    // })
    // win.loadURL('http://localhost:3456/DownloadList');
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.top}>
            <div className={styles.topLeft}>FunGame</div>
            <div className={styles.topRight}>
              <div className={styles.minus} onClick={minWindow}>
                <Icon type="minus" />
              </div>
              <div className={styles.minus} onClick={switchFullscreen}>
                {
                  fullscreen ? (<Icon type="fullscreen-exit" />) : (<Icon type="fullscreen" />)
                }
              </div>
              <div className={styles.close} onClick={closeWindow}>
                <Icon type="close" />
              </div>
            </div>
          </div>
          <div className={styles.headerCenter}>
            <div className={styles.iconContainer}>
              <Icon type="left" onClick={handleBack} />
              <Icon type="reload" onClick={handleReload} />
            </div>
            {
              !userInfo.isadmin ? (<>
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
                  <DropDownMenu userAvatar={userAvatar} updateUserInfo={updateUserInfo} />
                  <div onClick={handleToCart} className={classnames({ [styles.iconBox]: true, [styles.shoppingCart]: true })} >
                    <Icon type="shopping-cart" />
                    <span className={styles.count}>{count}</span>
                  </div>
                  <div onClick={download} className={styles.iconBox} >
                    <Icon type="download" />
                  </div>
                </div>
              </>) : (<div className={styles.userInfo}>
                <DropDownMenu userAvatar={userAvatar} updateUserInfo={updateUserInfo} isadmin={userInfo.isadmin} />
              </div>)
            }
          </div>
        </div>
      </div>
      <Modal
        title="应用下载"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
      >
        <div className={styles.item}>
          <div className={styles.name}>
            {game}
          </div>
          <div className={styles.progress}>
            <Progress percent={(percentComplete * 100).toFixed("2")} />
          </div>
        </div>
      </Modal>
      <div className={styles.main}>
        {/* {
          !selectIndex ? <Nav history={history} /> : ''
        } */}
        <div className={styles.container}>{props.children}</div>
      </div>
    </div >
  );
};


const mapStateToProps = ({ cart, user, dowload }) => {
  return {
    count: cart.count,
    userInfo: user.userInfo,
    percentComplete: dowload.percentComplete,
    game: dowload.game
  };
};

const mapDispathToProps = ({ cart, user }) => {
  return {
    getUserInfo: user.getUserInfo,
    getCartList: cart.getCartList
  };
};
export default connect(mapStateToProps, mapDispathToProps)(withRouter(Home));
