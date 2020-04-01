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
  return (
    <div className={style.wrap}>
      <header className={style.header}>
        <div className={style.crumb}>面包屑</div>
        <div className={style.headinfo}>
          <div className={style.img}>
            <img src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿"/>
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
              游戏详情
            </div>
          </div>
        </div>
      </header>
      <div className={style.detail}>
        <div className={style.img}>headinfo</div>
        <div className={style.dowlod}>headinfo</div>

      </div>
    </div>
  );
};

export default Details;