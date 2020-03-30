import React from 'react';
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
      <div className={style.resultWaper}>
        <div className={style.result}></div>
        <div className={style.total}></div>
      </div>
      <div className={style.gameWaper}>
        <ul className={style.gameList}>
          <div className={style.gameItem}>
            <a href="/store/2001141/" className={style.figure}>
              <img alt="梦三国2" src="//wegame.gtimg.com/g.2001141-r.87b21/info/d7b2e4007ba4fe0159ee968dd1e5ebed.jpg/320" />
            </a>
            <div className={style.info}>
              <div className={style.table_row}>
                <div className={style.table_cell}>
                  <div className={style.desc}>
                    <div className={style.tit}>梦三国</div>
                    <div className={style.time}>2020-01-19</div>
                  </div>
                </div>
                <div className={style.table_cell}>
                  <div className={style.other}>
                    <div className={style.price}>免费</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Details;