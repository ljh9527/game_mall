import React from 'react';
import style from './index.module.scss';

const PrePurchaseBig = (props) => {
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
        <div className={style.sub}>
          <p className={style.price1} onClick={handleBuy}>
            ￥<span>{data.price}</span>
          </p>
          <p className={style.price2}>
            ￥<span>{data.oldPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrePurchaseBig;