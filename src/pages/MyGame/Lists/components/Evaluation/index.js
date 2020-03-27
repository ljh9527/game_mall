import React from 'react';
import { Icon, Button } from 'antd';
import style from './index.module.scss';

const Details = (props) => {
  const {
    handleAdd = () => { },
    handleDelete = () => { }
  } = props
  return (
    <div className={style.wrap}>
      <div className={style.img}>
        <img src={'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg'} alert='图片' />
        <div className={style.name}>英雄联盟</div>
      </div>
      <div className={style.content}>
        <div className={style.statusWaper}>
          <Icon type="smile" />
          <div className={style.status}>推荐</div>
        </div>
        <div className={style.time}>2020-02-30 20:20:10</div>
        <div className={style.con}>少时诵诗书</div>
      </div>
      <div className={style.buttons}>
        <Button type="ghost" shape='round' size='small' onClick={handleAdd}>追加评测</Button>
        <Button type="ghost" shape='round' size='small' onClick={handleDelete}>删除此条</Button>
      </div>
    </div>
  );
};

export default Details;