import React from 'react';
import { Form, Button, Input } from 'antd';
import style from './index.module.scss';

const imgUrl = 'http://www.gravatar.com/avatar/5de1db3c896e5fdd7833c2c5d255783a?s=46&d=identicon';
const Details = (props) => {
  const handleCancel = ()=>{

  };
  const handleSave = ()=>{

  };
  return (
    <div className={style.wrap}>
      <div className={style.background}>
        <div className={style.avatar}>
          <img src={imgUrl} alt='imgUrl' />
        </div>
        <div className={style.cover}>
          <div className={style.userName}>
            我是谁
          </div>
          <div className={style.buttonBox}>
            <Button type="ghost" shape='round' size='small' onClick={handleCancel}>取消</Button>
            <Button type="ghost" shape='round' size='small' onClick={handleSave}>保存</Button>
          </div>
        </div>
      </div>
      <div className={style.content}>内容</div>
    </div>
  );
};

export default Details;