import React from 'react';
import classnames from 'classnames';
import style from './index.module.scss';

// const recommendData = [{
//   url: 'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg',
//   name: '全面战争三国/Total War: THREE KINGDOMS',
//   time: '发售时间：2019-05-23',
//   price: '228.00',
//   oldPrice: '268.00',
// }];

const Details = (props) => {
  // 前往购买
  // const handleBuy = (e) => {
  //   console.log('买');
  //   e.stopPropagation();
  //   e.cancelBubble = true;
  // }
  // 回到上一页
  const goBack = () => {

  };
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
          <img src="https://wegame.gtimg.com/g.2001097-r.488f0/info/caddcdd4d5241e50e085e0d84666721b.jpg" alt='bg'/>
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
            <div className={classnames({ [style.item]: true, [style.bottom]: true })}>
              游戏介绍
            </div>
            <div className={classnames({ [style.item]: true, [style.bottom]: true })}>
              游戏详情
            </div>
            <div className={classnames({ [style.item]: true, [style.bottom]: true })}>
              用户评测
            </div>
            <div className={classnames({ [style.item]: true, [style.bottom]: true })}>
              应用特性
            </div>
          </div>
        </div>
      </header>
      <div className={style.detail}>
        <div className={style.img}>headinfo</div>
        <div className={style.info}>
          <div className={style.dowlod}>headinfo</div>
        </div>
      </div>
    </div>
  );
};

export default Details;