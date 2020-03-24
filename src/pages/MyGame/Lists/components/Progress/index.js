import React from 'react';
import style from './index.module.scss';

const Details = (props) => {
  return (
    <div className={style.wrap}>
      <div className={style.header}>
        我的历程
      </div>
      <div className={style.allTime}>
        我的总时长
      </div>
      <div className={style.lastLogin}>
        最近登录
      </div>
    </div>
  );
};

export default Details;