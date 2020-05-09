import React from 'react';
import style from './index.module.scss';
import moment from 'moment';

const Recommend = (props) => {
  const {
    data,
    handleToDetail,
  } = props;
  return (
    <div className={style.wrap} onClick={() => handleToDetail(data.game_id)}>
      <div className={style.img}>
        <img src={data.banner_img} alt="banner"/>
      </div>
      <div className={style.content}>
        <div className={style.title}>
          <p>{data.game_name}</p>
        </div>
        <div className={style.subtitle}>
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
          {/* <span className={style.button} onClick={() => handleToDetail(data[0].id)}>查看</span> */}
        </div>
      </div>
    </div>
  );
};

export default Recommend;