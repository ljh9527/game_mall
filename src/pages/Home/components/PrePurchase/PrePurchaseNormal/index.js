import React from 'react';
import moment from 'moment';
import style from './index.module.scss';

const PrePurchaseNormal = (props) => {
  const {
    data,
    handleToDetail,
  } = props;
  return (
    <div className={style.wrap} onClick={() => handleToDetail(data.game_id)}>
      <div className={style.img}>
        <img src={data.banner_img} alt="banner" />
      </div>
      <div className={style.content}>
        <div className={style.title}>
          <p className={style.name}>{data.game_name}</p>
          <p>{data.subtitle}</p>
        </div>
        <div className={style.time}>
          {moment(data.issueddate).format('YYYY-MM-DD')}
        </div>
        <div className={style.sub}>
          {
            data.game_price === 0 ? (
              <div className={style.free}>
                <span>免费</span>
              </div>) : (
                <div className={style.price1}>
                ￥<span>{data.game_price}</span>
              </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default PrePurchaseNormal;