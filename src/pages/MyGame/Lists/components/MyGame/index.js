import React from 'react';
import style from './index.module.scss';
import Item from 'antd/lib/list/Item';

const Game = (props) => {
  const { data } = props;
  return (
    <div className={style.wrap}>
      <div className={style.imgBox}>
        <img src={data.url} alt={data.name}/>
      </div>
      <div className={style.bottom}>
        <div className={style.name}>{data.name}</div>
        <div className={style.lastTime}>{data.lastLoginTime}小时前登录</div>
        <div className={style.totalTime}>已玩{data.time}小时</div>
      </div>
      <div className={style.button}>进入专区</div>
    </div>
  );
};

export default Game;