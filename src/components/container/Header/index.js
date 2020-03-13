/**
 * 头部组件
 *
 * @author: ljjunhong
 */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Icon } from 'antd';
import DropDownMenu from '../DropDownMenu';

import classnames from 'classnames';
import styles from './index.module.scss';
const { ipcRenderer } = window.electron;

const Home = (props) => {

  const { history } = props;
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
    console.log("去商店");
  }
  const handleToHome = () => {
    console.log("去主页");
  }
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
              <div className={styles.shopping}>
                <Icon type="shopping" onClick={handleToShopping} />
                {/* <div className={classnames({ [styles.shoppingWord]: true, [styles.word]: true })}>商店</div> */}
              </div>
              <div className={styles.home}>
                <Icon type="home" onClick={handleToHome} />
                {/* <div className={classnames({ [styles.shoppingWord]: true, [styles.word]: true })}>主页</div> */}
              </div>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.user}>
                <div className={styles.avatar}></div>
                <div className={styles.operate}>
                  <DropDownMenu />
                </div>
              </div>
              <Link to="/home" className={styles.home}>
                <i className={`iconfont el-icon-xj-icon-home-bai`}></i>
                首页
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main}>{props.children}</div>
    </div >
  );
};

export default withRouter(Home);
