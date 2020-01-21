import React from 'react';
import { Icon } from 'antd';
import style from './index.module.scss';
import classnames from 'classnames';

const Home = (props) => {
  // const { } = props;
  const handleSwitch = (index) => {
    console.log(index);
  };

  return (
    <div className={style.wrap}>
      <div className={style.imgContainer}>
        <img src="http://t3.market.mi-img.com/thumbnail/jpeg/l750/AppStore/01d0753ba603691e181c670f5adb40a825f423298" alt="1" />
        <img src="http://t5.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/0bf90e50d072f440325a207587fbaf44f3e0c87c1" alt="2" />
      </div>
      <div className={classnames({ [style.leftButton]: true, [style.button]: true })} onClick={() => { handleSwitch("left") }}>
        <Icon type="left" />
      </div>
      <div className={classnames({ [style.rightButton]: true, [style.button]: true })} onClick={() => { handleSwitch("right") }}>
        <Icon type="right" />
      </div>
      <div className={style.pointContainer}>
        <span className={style.point} onClick={() => { handleSwitch("1") }}></span>
        <span className={style.point} onClick={() => { handleSwitch("2") }}></span>
        <span className={style.point} onClick={() => { handleSwitch("3") }}></span>
      </div>
    </div>
  );
};

export default Home;