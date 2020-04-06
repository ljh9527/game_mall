import React, { useState } from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';
import style from './index.module.scss';

const Details = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const switchData = ['全部评测', '推荐', '不推荐'];
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={style.wrap}>
      <div className={style.discuss_hd}>
        <div className={style.creviewRatio}>
          <div className={style.discuss_tit}>
            <span>推荐率</span>
          </div>
          <div className={style.discuss_val}>
            <div className={style.discuss_score}>
              <strong>56<span>%</span></strong>
              <span className={style.discuss_count}>
                （<span>1234</span>条评测）
              </span>
            </div>
          </div>
        </div>
        <div className={style.discuss_button}>
          <div className={style.navwrap}>
            <div className={style.nav}>
              {
                switchData.map((item, index) => (
                  <div
                    className={classnames({ [style.item]: true, [style.bottom]: index === activeIndex })}
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    {item}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={style.allReviews}>
        <div className={style.reviewsContent}>
          <div className={style.img}>
            <div className={style.avater}>
              <img src={'https://shop.3dmgame.com/upload/ico/2019/0711/1562820172245302.jpg'} alert='图片' />
              <div className={style.name}>英雄联盟</div>
            </div>
          </div>
          <div className={style.content}>
            <div className={style.statusWaper}>
              <Icon type="smile" />
              <div className={style.status}>推荐</div>
            </div>
            <div className={style.time}>2020-02-30 20:20:10</div>
            <div className={style.con}>少时诵诗书</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;