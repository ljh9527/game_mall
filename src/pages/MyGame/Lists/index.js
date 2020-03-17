import React from 'react';
import style from './index.module.scss';

const Details = (props) => {
  return (
    <div className={style.wrap}>
      <div className={style.background}>背景</div>
      <div className={style.content}>内容</div>
    </div>
  );
};

export default Details;