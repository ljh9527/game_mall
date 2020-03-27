import React from 'react';
import { Form, Button, Input, Icon } from 'antd';
import style from './index.module.scss';

const imgUrl = 'http://www.gravatar.com/avatar/5de1db3c896e5fdd7833c2c5d255783a?s=46&d=identicon';
const Details = (props) => {
  const handleChangeAvatar = () => {
    console.log('切换头像');
  };
  const handleCancel = () => {
    console.log('取消修改');
  };
  const handleSave = () => {
    console.log('保存修改');
  };
  return (
    <div className={style.wrap}>
      <div className={style.background}>
        <div className={style.avatar}>
          <img src={imgUrl} alt='头像' />
          <div className={style.changeAvatar} onClick={handleChangeAvatar}>
            <Icon type="camera" theme="filled" />
            <div>更换头像</div>
          </div>
        </div>
        <div className={style.cover}>
          <div className={style.userName}>
            我是谁
          </div>
          <div className={style.buttonBox}>
            <Button type="ghost" shape='round' size='small' onClick={handleCancel}>取消</Button>
            <Button type="ghost" shape='round' size='small' className={style.save} onClick={handleSave}>保存</Button>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.from}>

        </div>
      </div>
    </div>
  );
};

export default Details;