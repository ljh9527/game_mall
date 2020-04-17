import React from 'react';
import style from './index.module.scss';
import moment from 'moment';

const Recommend = (props) => {
  const {
    data,
    handleToDetail,
  } = props;
  return (
    <div className={style.wrap} onClick={() => handleToDetail(data[0].id)}>
      <div className={style.img}>
        <img src={data[1].bannerImg} />
      </div>
      <div className={style.content}>
        <div className={style.title}>
          <p>{data[0].gameName}</p>
        </div>
        <div className={style.subtitle}>
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
              <div className={style.price1}>
                ￥<span>{data[0].gamePrice}</span>
              </div>)
          }
          {/* <span className={style.button} onClick={() => handleToDetail(data[0].id)}>查看</span> */}
        </div>
      </div>
    </div>
  );
};

export default Recommend;