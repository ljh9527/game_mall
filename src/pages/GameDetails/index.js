import React, { useState } from 'react';
import classnames from 'classnames';
import Introduce from './Introduce';
import Info from './Info';
import Comment from './Comment';
import style from './index.module.scss';

const Details = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [gameInfo, setGameInfo] = useState(0);
  // 前往购买
  // const handleBuy = (e) => {
  //   console.log('买');
  //   e.stopPropagation();
  //   e.cancelBubble = true;
  // }

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  // 回到上一页
  const goBack = () => {

  };
  const data = [{
    name: '游戏介绍',
    component: <Introduce gameInfo={gameInfo} />
  }, {
    name: '游戏详情',
    component: <Info gameInfo={gameInfo}/>
  }, {
    name: '用户评测',
    component: <Comment gameInfo={gameInfo}/>
  },
  '应用特性'];
  return (
    <div className={style.wrap}>
      <header className={style.header}>
        <div className={style.crumb}>
          <span className={style.inner}>
            <span>
              <span className={style.center} onClick={goBack} >{'精选 >'} </span>
              <span>群雄逐鹿HD</span>
            </span>
            <span className={style.border}></span>
          </span>
        </div>
        <div className={style.detail_banner}>
          <img src="https://wegame.gtimg.com/g.2001097-r.488f0/info/caddcdd4d5241e50e085e0d84666721b.jpg" alt='bg' />
        </div>
        <div className={style.headinfo}>
          <div className={style.img}>
            <img src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
          </div>
          <div className={style.introduce}>
            <div className={style.name}>
              <h1 title="群雄逐鹿HD">群雄逐鹿HD</h1>
            </div>
          </div>
        </div>
        <div className={style.navwrap}>
          <div className={style.nav}>
            {
              data.map((item, index) => (
                <div
                  className={classnames({ [style.item]: true, [style.bottom]: index === activeIndex })}
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  {item.name}
                </div>
              ))
            }
          </div>
        </div>
      </header>
      <div className={style.detail}>
          {
            (data[activeIndex].component)
          }
      </div>
    </div>
  );
};

export default Details;