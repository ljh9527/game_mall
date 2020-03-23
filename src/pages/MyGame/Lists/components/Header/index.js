import React from 'react';
import style from './index.module.scss';

const Details = (props) => {

  // 去主页
  const handleToHome = () => {
    console.log("去主页");
  }
  // 去我的游戏
  const handleToMyGame = () => {
    console.log("去应用");
  }
  // 去我的评测
  const handleToEvaluation = () => {
    console.log("去评测");
  }
  return (
    <div className={style.wrap}>
      <div className={style.item} onClick={handleToHome}>主页</div>
      <div className={style.item} onClick={handleToMyGame}>应用</div>
      <div className={style.item} onClick={handleToEvaluation}>评测</div>
    </div>
  );
};

export default Details;