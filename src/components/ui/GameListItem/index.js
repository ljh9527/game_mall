import React from 'react';
import moment from 'moment';
import style from './index.module.scss';

const Item = (props) => {
  const { item, handleToDetail } = props;

  return (
    <div className={style.gameItem} onClick={() => handleToDetail(item[0].id)}>
      <div className={style.figure}>
        <img src={item[1].bannerImg} />
      </div>
      <div className={style.info}>
        <div className={style.table_row}>
          <div className={style.table_cell}>
            <div className={style.desc}>
              <div className={style.tit}>{item[0].gameName}</div>
              <div className={style.subtit}>{item[0].subtitle}</div>
              <div className={style.time}>
                {moment(item[0].issueddate).format('YYYY-MM-DD')}
                <span>上线</span>
              </div>
            </div>
          </div>
          <div className={style.table_cell}>
            <div className={style.other}>
              <div className={style.price}>
              {
                item[0].gamePrice === 0 ? (<span>免费</span>) : (
                    <div className={style.price1}>
                      ￥<span>{item[0].gamePrice}</span>
                    </div>)
              }
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;