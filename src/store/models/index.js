/**
 * 统一暴露models中的state
 *
 * */

// 公用store
import common from './common';
import user from './user';
import comment from './comment';
import usergame from './usergame';
import cart from "./cart";
import pay from './pay';
import dowload from './dowload';

export default {
  common,
  user,
  comment,
  usergame,
  cart,
  pay,
  dowload
};
