import React from 'react';
import style from './index.module.scss';

const Details = (props) => {
  return (
    <div className={style.wrap}>
      <div className={style.header}>
        我的历程
      </div>
      <div className={style.allTime}>
        <div className={style.content}>
          <div className={style.time}>992</div>
          <span>小时</span>
        </div>
        <div className={style.subContent}>启动应用总时长</div>
      </div>
      <div className={style.lastLogin}>
        最近登录：2020-1-3 22:2:2
      </div>
    </div>
  );
};

export default Details;