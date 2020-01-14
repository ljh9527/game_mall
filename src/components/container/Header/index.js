/**
 * 头部组件
 *
 * @author: ljjunhong
 */

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import DropDownMenu from '../DropDownMenu';

// import classnames from 'classnames';
import styles from './index.module.scss';

const Home = (props) => {
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
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <span>游戏商城</span>
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
      <div className={styles.main}>{props.children}</div>
    </div>
  );
};

export default withRouter(Home);
