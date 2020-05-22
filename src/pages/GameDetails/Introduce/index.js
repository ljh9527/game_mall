import React, { useState, useEffect } from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import services from '../../../services';
import moment from 'moment';
import { Button, message, Icon } from 'antd';
import style from './index.module.scss';
import Swiper from "swiper";
import "swiper/css/swiper.css";

const Introduce = (props) => {
  const {
    history,
    gameInfo,
    recommendRate = '',
    comment = [],
    getGameComment = () => { },
    download = () => { },
    getCartList = () => { }
  } = props;

  const id = gameInfo && gameInfo[0].id;
  const email = localStorage.getItem("EMAIL");
  const [isHasGame, setIsHasGame] = useState(false);
  console.log(gameInfo);
  // console.log(id);
  useEffect(() => {
    getGameComment(id);
    havaUserGame(id);
  }, [id]);
  // 前往购买
  const handleBuy = (id) => {
    console.log(id);
    history.push(`/game/order?id=${id}`);
  }

  const handleDownload = (name, url, id) => {
    download(name, url, id);
  }
  useEffect(() => {
    new Swiper('.gallery-top', {
      spaceBetween: 10,
      loop: true,
      autoplay: true,
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
      },
      observer: true, //修改swiper自己或子元素时，自动初始化swiper 
      observeParents: true, //修改swiper的父元素时，自动初始化swiper 
    })
  }, [gameInfo]);
  // 请求游戏数据
  const havaUserGame = async (id) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getMyGameDetail({ email, gameid: id });
      if (data.data !== null) {
        setIsHasGame(true);
      } else {
        setIsHasGame(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddCart = async (id) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.addGameCart({ email, gameid: id.toString() });
      if (data.code === 200) {
        getCartList({ email });
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={style.wrap}>
      {
        gameInfo && (
          <>
            <div className={style.imgwrap}>
              <div className="swiper-container gallery-top" id="Swiper-one">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <p className="ani" swiper-animate-effect="fadeInUp">
                      <img src={gameInfo[1].image1} alt="图片1" />
                    </p>
                  </div>
                  <div className="swiper-slide">
                    <p className="ani" swiper-animate-effect="fadeInLeft">
                      <img src={gameInfo[1].image2} alt="图片2" />
                    </p>
                  </div>
                  <div className="swiper-slide">
                    <p className="ani" swiper-animate-effect="fadeInDown">
                      <img src={gameInfo[1].image3} alt="图片3" />
                    </p>
                  </div>
                  <div className="swiper-slide">
                    <p className="ani" swiper-animate-effect="fadeInDown">
                      <img src={gameInfo[1].image4} alt="图片4" />
                    </p>
                  </div>
                  <div className="swiper-slide">
                    <p className="ani" swiper-animate-effect="fadeInDown">
                      <img src={gameInfo[1].image5} alt="图片5" />
                    </p>
                  </div>
                  <div className="swiper-slide">
                    <p className="ani" swiper-animate-effect="fadeInDown">
                      <img src={gameInfo[1].image6} alt="图片6" />
                    </p>
                  </div>
                </div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </div>
              <div className="swiper-container gallery-thumbs">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img className="bottom-img" src={gameInfo[1].image1} alt="图片1" />
                  </div>
                  <div className="swiper-slide">
                    <img className="bottom-img" src={gameInfo[1].image2} alt="图片2" />
                  </div>
                  <div className="swiper-slide">
                    <img className="bottom-img" src={gameInfo[1].image3} alt="图片3" />
                  </div>
                  <div className="swiper-slide">
                    <img className="bottom-img" src={gameInfo[1].image4} alt="图片4" />
                  </div>
                  <div className="swiper-slide">
                    <img className="bottom-img" src={gameInfo[1].image5} alt="图片5" />
                  </div>
                  <div className="swiper-slide">
                    <img className="bottom-img" src={gameInfo[1].image6} alt="图片6" />
                  </div>
                </div>
              </div>
            </div>
            <div className={style.info}>
              <div className={style.topInfo}>
                <div className={style.detail}>
                  <div className={style.item}>
                    <span className={style.name}>发行日期</span>
                    <span className={style.value}>{moment(gameInfo[0].issueddate).format('YYYY-MM-DD')}</span>
                  </div>
                  <div className={style.item}>
                    <span className={style.name}>推荐率</span>
                    <span className={style.value}>{recommendRate ? parseFloat(recommendRate).toFixed("1") : parseFloat(100).toFixed("1")}%（<span>共{comment.length}</span>条评测）</span>
                  </div>
                  <div className={style.item}>
                    <span className={style.name}>开发商</span>
                    <span className={style.value}>{gameInfo[0].developers}</span>
                  </div>
                  <div className={style.item}>
                    <span className={style.name}>运营商</span>
                    <span className={style.value}>{gameInfo[0].operator}</span>
                  </div>
                </div>
              </div>
              {
                gameInfo[0].gamePrice !== 0 ? (<div className={style.price}>
                  <span>￥</span>
                  <span>{gameInfo[0].gamePrice}</span>
                </div>) : (<></>)
              }
              {
                isHasGame ? (
                  <>
                    {
                      gameInfo[0].gamePrice !== 0 ? (<div className={style.hasbuy}>
                        <Button>已购买</Button>
                      </div>) : (<div className={style.dowlod}>
                        <Button>已下载</Button>
                      </div>)
                    }
                  </>
                ) : (
                    <>
                      {
                        gameInfo[0].gamePrice !== 0 ? (<div className={style.buy}>
                          <Button className={style.buyButton} onClick={() => handleBuy(id)}>立即购买</Button>
                          <Button className={style.cartButton} onClick={() => handleAddCart(id)}>
                            <Icon type="shopping-cart" />
                          </Button>
                        </div>) : (<div className={style.dowlod}>
                          <Button onClick={() => handleDownload(gameInfo[0].gameName, gameInfo[0].download, id)}>立即下载</Button>
                        </div>)
                      }
                    </>
                  )
              }
            </div>
          </>
        )
      }
    </div>
  );
};

const mapStateToProps = ({ comment }) => {
  return {
    recommendRate: comment.recommendRate,
    comment: comment.comment
  };
};

const mapDispathToProps = ({ comment, cart }) => {
  return {
    getGameComment: comment.getGameComment,
    getCartList: cart.getCartList
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Introduce);