import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import { ImgList } from '../../../components'
import style from './index.module.scss';
// let Swiper = window.Swiper;
import Swiper from "swiper";
import "swiper/css/swiper.css";

const Details = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // 前往购买
  // const handleBuy = (e) => {
  //   console.log('买');
  //   e.stopPropagation();
  //   e.cancelBubble = true;
  // }
  useEffect(() => {
    new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: {
          el: '.gallery-thumbs',
          spaceBetween: 10,
          slidesPerView: 4,
          watchSlidesVisibility: true,/*避免出现bug*/
        },
      }
    })
  }, []);

  return (
    <div className={style.wrap}>
      <div className={style.imgwrap}>
        <div className="swiper-container gallery-top" id="Swiper-one">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <p className="ani" swiper-animate-effect="fadeInUp">
                <img src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
              </p>
            </div>
            <div className="swiper-slide">
              <p className="ani" swiper-animate-effect="fadeInLeft">
                <img src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
              </p>
            </div>
            <div className="swiper-slide">
              <p className="ani" swiper-animate-effect="fadeInDown">
                <img src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
              </p>
            </div>
            <div className="swiper-slide">
              <p className="ani" swiper-animate-effect="fadeInDown">
                <img src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
              </p>
            </div>
            <div className="swiper-slide">
              <p className="ani" swiper-animate-effect="fadeInDown">
                <img src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
              </p>
            </div>
            <div className="swiper-slide">
              <p className="ani" swiper-animate-effect="fadeInDown">
                <img src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
              </p>
            </div>
          </div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
        <div className="swiper-container gallery-thumbs">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img className="bottom-img" src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
            </div>
            <div className="swiper-slide">
              <img className="bottom-img" src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
            </div>
            <div className="swiper-slide">
              <img className="bottom-img" src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
            </div>
            <div className="swiper-slide">
              <img className="bottom-img" src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
            </div>
            <div className="swiper-slide">
              <img className="bottom-img" src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
            </div>
            <div className="swiper-slide">
              <img className="bottom-img" src="https://wegame.gtimg.com/g.2001021-r.571df/info/fcb5e716838944213a8a6450140965c2.jpg" alt="群雄逐鹿" />
            </div>
          </div>
        </div>
      </div>
      <div className={style.info}>
        <div className={style.topInfo}>
          <div className={style.detail}>
            <div className={style.item}>
              <span className={style.name}>发行日期</span>
              <span className={style.value}>2222-22-22</span>
            </div>
          </div>
        </div>
        <div className={style.dowlod}>
          <Button>立即下载</Button>
        </div>
      </div>
    </div>
  );
};

export default Details;