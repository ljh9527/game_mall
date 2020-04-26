import React, { useState, useEffect } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import style from './index.module.scss';

const Item = (props) => {
  const { item, handleToDetail=()=>{}, selected } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    if (item[0] !== undefined && item[1] !== undefined) {
      setData({
        id: item[0].id,
        bannerImg: item[1].bannerImg,
        issueddate: item[0].issueddate,
        gameName: item[0].gameName,
        subtitle: item[0].subtitle,
        gamePrice: item[0].gamePrice
      })
    } else {
      setData({
        id: item.id,
        bannerImg: item.banner_img,
        issueddate: item.issueddate,
        gameName: item.game_name,
        subtitle: item.subtitle,
        gamePrice: item.game_price
      })
    }
  }, [item]);
  return (
    <div className={classnames({ [style.gameItem]: true, [style.selected]: selected })} onClick={() => handleToDetail(data.id)}>
      <div className={style.figure}>
        <img src={data.bannerImg} />
      </div>
      <div className={style.info}>
        <div className={style.table_row}>
          <div className={style.table_cell}>
            <div className={style.desc}>
              <div className={style.tit}>{data.gameName}</div>
              <div className={style.subtit}>{data.subtitle}</div>
              <div className={style.time}>
                {moment(data.issueddate).format('YYYY-MM-DD')}
                <span>上线</span>
              </div>
            </div>
          </div>
          <div className={style.table_cell}>
            <div className={style.other}>
              <div className={style.price}>
                {
                  data.gamePrice === 0 ? (<span>免费</span>) : (
                    <div className={style.price1}>
                      ￥<span>{data.gamePrice}</span>
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