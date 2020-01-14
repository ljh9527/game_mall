import React from 'react';
import style from './index.module.scss';

const Home = (props) => {
  return (
    <div className={style.wrap}>
      <div className={style.first}>第一部分</div>
      <div>第二部分</div>
      <div>第三部分</div>
      <div>第四部分</div>
    </div>
  );
};

export default Home;