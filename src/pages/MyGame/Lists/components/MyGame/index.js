import React from 'react';
import style from './index.module.scss'

const Game = (props) => {
  const { data,history } = props;
  console.log(data);
  const handleToDetail = (id) => {
    history.push(`/game/details?id=${id}`);
  };
  const handleToStart = (id) => {
    let date = new Date().getTime();
    console.log(date);
    console.log(id);
  };
  return (
    <div className={style.wrap}>
      <div className={style.imgBox}>
        <img src={data.image_cover} alt={data.game_name}/>
      </div>
      <div className={style.bottom}>
        <div className={style.name} onClick={()=>handleToDetail(data.id)}>{data.game_name}</div>
        <div className={style.lastTime}>上次登录{data.lastplay}</div>
        <div className={style.totalTime}>已玩{data.playtime}小时</div>
      </div>
      <div className={style.button} onClick={()=>handleToStart(data.id)}>启动游戏</div>
    </div>
  );
};

export default Game;