import React, { useState, useEffect } from 'react';
import services from '../../services';
import { Modal, Button, message, Checkbox, Icon } from 'antd';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { GameListItem } from '../../components';
import style from './index.module.scss';
import { getUrlParam, requestErrorHandler } from '../../utils';

const Order = (props) => {
  const { userInfo, getUserInfo, history, getCartList, count, cartGameList, setOrder, setGameid, order, gameid } = props;
  const email = localStorage.getItem("EMAIL");
  const [id] = useState(getUrlParam('id')); // 立即购买过来的id
  const [gameInfo, setGameInfo] = useState(); // 单个游戏时游戏信息
  const [allprice, setAllprice] = useState(0); // 总价格
  const [single, setSingle] = useState(1); // 单个游戏时选中数
  const [listNum, setListNum] = useState(0); // 购物车选中数
  const [selected, setSelected] = useState([]); // 购物车选中项数组
  const [payPage, setPayPage] = useState(); // 接口返回页面
  const [visible, setVisible] = useState(false); // modle的展示控制

  sessionStorage.setItem("gameid", gameid);
  useEffect(() => {
    // const email = localStorage.getItem("EMAIL");
    getUserInfo({ email });
    getCartList({ email });
    if (id !== '') {
      getGameInfo(id);
    }
  }, [id]);
  //   const handleClick = (index) => {
  //     setActiveIndex(index);
  //   };
  // 回到上一页
  const goBack = () => {
    history.push(`/game/details?id=${id}`);
  };
  // 前往购买
  const handlePay = (id) => {
    // addGame(id);
    if (allprice === 0) {
      message.info("请先选择商品");
      return;
    }
    setVisible(true);
    pay();
  }

  // 请求游戏数据
  const getGameInfo = async (id) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getGameInfo({ id });
      if (data.code === 200) {
        setGameInfo(data.data[0]);
        setAllprice(data.data[0][0].gamePrice);
      }
    } catch (error) {
      requestErrorHandler(error);
    }
  };
  const pay = async () => {
    let trade = new Date().getTime();
    // 发送请求
    const order = {
      out_trade_no: trade.toString(),
      total_amount: allprice.toString(),
      subject: "游戏",
      body: ''
    }
    setOrder(order);
    if (gameInfo) {
      setGameid([gameInfo[0].id]);
    } else {
      let idArray = [];
      selected.map((item, index) => {
        idArray.push(item.id);
      });
      // cartGameList
      setGameid(idArray);
    }
    try {
      // 发送请求
      const { data } = await services.pay(order);
      setPayPage(data);
    } catch (error) {
      requestErrorHandler(error);
    }
  };
  const handleRadioChange = (e) => {
    if (gameInfo) {
      if (e.target.checked) {
        setSingle(1);
      } else {
        setSingle(0);
      }
    } else {
      let num = listNum;
      if (e.target.checked) {
        setListNum(++num);
      } else {
        setListNum(--num);
      }
    }
    if (e.target.checked) {
      let temparray = selected;
      cartGameList.map((item) => {
        if (item.id === e.target.value) {
          temparray.push(item);
          setSelected(temparray);
          setAllprice(allprice + item.game_price);
        }
      });
    } else {
      let temparray = selected;
      selected.map((item, index) => {
        if (item.id === e.target.value) {
          temparray.splice(index, 1);
          setSelected(temparray);
          setAllprice(allprice - item.game_price);
        }
      });
    }
  }
  const deleteCart = async (gameid) => {
    // console.log("gameid", gameid);
    if (gameInfo) {
      // getGameInfo(0);
    } else {
      // 发送请求
      try {
        // 发送请求
        const { data } = await services.deleteCart({ gameid: gameid.toString(), email });
        if (data.code === 200) {
          getCartList({ email });
        } else {
          message.error("删除失败");
        }
      } catch (error) {
        requestErrorHandler(error);
      }
    }

  }
  const handleCancel = () => {
    setVisible(false);
  };
  const radioStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px'
    // height: '30px',
    // lineHeight: '30px',
  };

  return (
    <div className={style.wrap}>
      <header className={style.header}>
        <div className={style.crumb}>
          <span className={style.inner}>
            <span>
              {
                gameInfo ? (
                  <span className={style.back} onClick={goBack} >{gameInfo[0].gameName} ></span>
                ) : (<span className={style.back} >购物车 ></span>)
              }
              <span className={style.buy}>{' 购买'} </span>
            </span>
            <span className={style.border}></span>
          </span>
        </div>
      </header>
      <div className={style.detail}>
        <div className={style.panel_hd}>
          {
            gameInfo ? (
              <h2 className={style.total}>
                您已选择{single}款内容
              </h2>
            ) : (<>
              {
                listNum == 0 ? (<h2 className={style.total}>
                  总共有{count}款内容
                </h2>) : (<h2 className={style.total}>
                  您已选择{listNum}款内容
                </h2>)
              }
            </>)
          }
        </div>
        <div className={style.panel_bd}>
          {
            gameInfo ? (<div className={classnames({ [style.gcell]: true })}>
              <Checkbox style={radioStyle} value={gameInfo[0].gamePrice} defaultChecked onChange={handleRadioChange}>
                <GameListItem item={gameInfo} key={gameInfo} />
              </Checkbox >
              {/* <Icon type="delete" onClick={() => deleteCart(gameInfo[0].id)} /> */}
            </div>) :
              (
                <>
                  {
                    cartGameList && cartGameList.map((item, index) => (
                      <div className={classnames({ [style.gcell]: true })} key={index}>
                        <Checkbox style={radioStyle} value={item.id} onChange={handleRadioChange}>
                          <GameListItem item={item} key={item + index} />
                        </Checkbox>
                        <Icon type="delete" onClick={() => deleteCart(item.id)} />
                      </div>
                    ))
                  }
                </>
              )
          }
        </div>
        <div className={style.operate}>
          <div className={style.operate_info}>
            <span className={style.before}>购买至：</span>
            <div className={style.info}>
              <div className={style.avatar}>
                <img src={userInfo.avatar} />
              </div>
              <div className={style.name}>
                {userInfo.nickname}
              </div>
              <div className={style.email}>
                (邮箱：{userInfo.email})
              </div>
            </div>
          </div>
          <div className={style.pay}>
            <div className={style.price_tip}>
              <span>应付金额：</span>
              <div className={style.price}>
                <span className={style.mint}>￥</span>
                <span className={style.value}>{allprice}</span>
              </div>
            </div>
            <div className={style.button}>
              <Button onClick={() => handlePay(id)}>确认购买</Button>
            </div>

          </div>
        </div>
      </div>
      <div>
        <Modal
          title="FunGame应用购买"
          visible={visible}
          footer={null}
          onCancel={handleCancel}
        >
          <p>
            <span className={style.price_tip}>
              <span>应付金额：</span>
              <span className={style.price}>
                <span className={style.mint}>￥</span>
                <span className={style.value}>{allprice}</span>
              </span>
            </span>
          </p>
          <div className={style.fromWrap} dangerouslySetInnerHTML={{ __html: payPage }} >
          </div>
        </Modal>
      </div>
    </div >
  );
};

const mapStateToProps = ({ user, cart, pay }) => {
  return {
    userInfo: user.userInfo,
    count: cart.count,
    cartGameList: cart.cartGameList,
    order: pay.order,
    gameid: pay.gameid
  };
};

const mapDispathToProps = ({ user, cart, pay }) => {
  return {
    getUserInfo: user.getUserInfo,
    getCartList: cart.getCartList,
    deleteCart: cart.deleteCart,
    setOrder: pay.setOrder,
    setGameid: pay.setGameid
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Order);