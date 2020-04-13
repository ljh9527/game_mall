import React from 'react';
import moment from 'moment';
import style from './index.module.scss';

const Details = (props) => {
  const { userInfo } = props;
  return (
    <div className={style.wrap}>
      <div className={style.header}>
        我的历程
      </div>
      <div className={style.allTime}>
        <div className={style.content}>
          <div className={style.time}>{userInfo.playtime}</div>
          <span>小时</span>
        </div>
        <div className={style.subContent}>启动应用总时长</div>
      </div>
      <div className={style.lastLogin}>
        最近登录：
        <span>{moment(userInfo.lastTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>
    </div>
  );
};

export default Details;