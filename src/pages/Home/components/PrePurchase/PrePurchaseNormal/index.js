import React from 'react';
import style from './index.module.scss';

const PrePurchaseNormal = (props) => {
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
          <div>{data.name}</div>
        </div>
        <div className={style.time}>{data.time}</div>
        <div className={style.sub}>
          <div className={style.price1} onClick={handleBuy}>
            ￥<span>{data.price}</span>
          </div>
          <div className={style.price2}>
            ￥<span>{data.oldPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrePurchaseNormal;