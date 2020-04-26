import React from 'react';
import style from './index.module.scss'

const Game = (props) => {
  const { data, history, onstart, status } = props;
  const handleToDetail = (id) => {
    history.push(`/myGame/details?id=${id}`);
  };
  const handleToStart = (id) => {
    onstart(id);
    console.log(id);
  };
  return (
    <div className={style.wrap}>
      <div className={style.imgBox} onClick={() => handleToDetail(data.id)}>
        <img src={data.image_cover} alt={data.game_name} />
      </div>
      <div className={style.bottom} onClick={() => handleToDetail(data.id)}>
        <div className={style.name}>{data.game_name}</div>
        <div className={style.lastTime}>上次登录{data.lastplay}</div>
        <div className={style.totalTime}>已玩{data.playtime}小时</div>
      </div>
      {
        status == 1 ? (<div className={style.button} onClick={() => handleToStart(data.id)}>启动游戏</div>) 
        : (<div className={style.button} onClick={() => handleToStart(data.id)}>下载游戏</div>)
      }
    </div>
  );
};

export default Game;