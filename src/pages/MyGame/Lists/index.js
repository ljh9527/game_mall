import React, { useState } from 'react';
import { Form, Button, Input, Icon } from 'antd';
import Game from './components/MyGame';
import Progress from './components/Progress';
import Evaluation from './components/Evaluation';
import style from './index.module.scss';

const imgUrl = 'http://www.gravatar.com/avatar/5de1db3c896e5fdd7833c2c5d255783a?s=46&d=identicon';
const Details = (props) => {
  const { history } = props;
  const [activeIndex, setActiveIndex] = useState(false);
  const {
    gameList = [{
      name: "英雄联盟",
      time: "100",
      lastLoginTime: "2"
    }, {
      name: "英雄联盟",
      time: "100",
      lastLoginTime: "2"
    }, {
      name: "英雄联盟",
      time: "100",
      lastLoginTime: "2"
    }, {
      name: "英雄联盟",
      time: "100",
      lastLoginTime: "2"
    }],
  } = props;
  const handleEdit = () => {
    history.push('/myGame/edit');
  };
  const handleEvaluation = () => {
    setActiveIndex(!activeIndex);
  };
  return (
    <div className={style.wrap}>
      <div className={style.background}>
        <div className={style.avatar}>
          <img src={imgUrl} alt='头像' />
        </div>
        <div className={style.cover}>
          <div className={style.userName}>
            我是谁
          </div>
          <div className={style.buttonBox}>
            <Button type="ghost" shape='round' size='small' onClick={handleEdit}>编辑资料</Button>
            <Button type="ghost" shape='round' size='small' onClick={handleEvaluation}>查看评测</Button>
          </div>
        </div>
      </div>
      <div className={style.content}>
        {
          !activeIndex ? (<div className={style.con}>
            <div className={style.game}>
              {
                gameList.map((item, index) => (
                  <Game data={item} key={item + index} />
                ))
              }
            </div>
            <div className={style.progress}>
              <Progress/>
            </div>
          </div>) : (<Evaluation />)
        }
      </div>
    </div>
  );
};

export default Details;