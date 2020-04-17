import React from 'react';
import moment from 'moment';
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
        <img src={data[1].bannerImg} alt={5555} />
      </div>
      <div className={style.content}>
        <div className={style.title}>
          <p className={style.name}>{data[0].gameName}</p>
          <p>{data[0].subtitle}</p>
        </div>
        <div className={style.time}>
          {moment(data[0].issueddate).format('YYYY-MM-DD')}
        </div>
        <div className={style.sub}>
          {
            data[0].gamePrice === 0 ? (
              <div className={style.free}>
                <span>免费</span>
              </div>) : (
                <p className={style.price1} onClick={handleBuy}>
                  ￥<span>{data[0].gamePrice}</span>
                </p>)
          }
        </div>
      </div>
    </div>
  );
};

export default PrePurchaseBig;