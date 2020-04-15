import React, { useState } from 'react';
import style from './index.module.scss';

const Details = (props) => {
  const { gameInfo } = props;
  
  return (
    <div className={style.wrap}>
      <div className={style.game_detail}>
        <div className={style.title}>
          <strong>{gameInfo[0].gameIntroduction}</strong>
        </div>
        <div className={style.content}>
          {gameInfo[0].gameAbout}
        </div>
      </div>
    </div>
  );
};

export default Details;