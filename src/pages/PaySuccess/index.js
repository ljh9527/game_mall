import React, { useState, useEffect } from 'react';
import services from '../../services';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import style from './index.module.scss';
import { getUrlParam, requestErrorHandler } from '../../utils';

const PaySuccess = (props) => {
  const { getCartList } = props;
  const email = localStorage.getItem("EMAIL");
  const gameid = sessionStorage.getItem("gameid").split(",");
  const order = {
    out_trade_no: getUrlParam("out_trade_no"),
    total_amount: getUrlParam("total_amount"),
    gameid: gameid,
    email: email
  }
  useEffect(() => {
    addOrder(order);
  }, []);
  const addOrder = async (order) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.addOrder(order);
      if (data.code === 200) {
        gameid.map((item) => {
          addGame(item);
        })
      }
    } catch (error) {
      requestErrorHandler(error);
    }
  };
  // 添加游戏数据
  const addGame = async (id) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.addMyGame({ gameid: id, email, status: (0).toString() });
      if (data.code === 200) {
        deleteCart(id);
      } else {
        // message.error("购买失败，您已经购买了该游戏。");
      }
    } catch (error) {
      requestErrorHandler(error);
    }
  };
  const deleteCart = async (gameid) => {
    // console.log("gameid", gameid);
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.deleteCart({ gameid: gameid.toString(), email });
      if(data.code === 200){
        getCartList({ email });
      }
    } catch (error) {
      requestErrorHandler(error);
    }
  }
  return (
    <div className={style.wrap}>
      <div className={style.content}>
        <div className={style.check}>
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
        </div>
        <h2 className={style.title}>支付成功</h2>
        <div>您购买的游戏已经在主页中，请前往<a herf="/myGame/index">主页</a>查看吧</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }) => {
  return {
  };
};

const mapDispathToProps = ({ cart }) => {
  return {
    getCartList: cart.getCartList
  };
};
export default connect(mapStateToProps, mapDispathToProps)(PaySuccess);