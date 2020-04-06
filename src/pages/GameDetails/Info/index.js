import React, { useState } from 'react';
import style from './index.module.scss';

const Details = (props) => {

  return (
    <div className={style.wrap}>
      <div className={style.game_detail}>
        <div className={style.title}>
          <strong>超能英雄</strong>
        </div>
        <div className={style.content}>
          16位英雄还原超能幻想，每个拥有奇特外形的天诺英雄都有着独特的定位和属性。选择不同的超能英雄进行游戏，获得不同超凡体验。
        </div>
      </div>
    </div>
  );
};

export default Details;