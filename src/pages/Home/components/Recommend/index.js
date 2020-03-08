import React from 'react';
import style from './index.module.scss';

const Recommend = (props) => {
  const {
    data,
    handleToDetail,
    handleBuy,
  } = props;
  return (
    <div className={style.wrap} onClick={handleToDetail}>
      <div className={style.img}>
        <img src={data.url} />
      </div>
      <div className={style.content}>
        <div className={style.title}>
          <p>{data.name}</p>
        </div>
        <div className={style.time}></div>
        <div className={style.sub}>
          <div className={style.price1}>
            ￥<span>{data.price}</span>
          </div>
          {/* <div className={style.price2}>
            ￥<span>{data.oldPrice}</span>
          </div> */}
          <span className={style.button} onClick={handleBuy}>购买</span>
        </div>
      </div>
    </div>
  );
};

export default Recommend;