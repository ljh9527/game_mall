import React from 'react';
import Rotation from './components/Rotation';
import style from './index.module.scss';

const Home = (props) => {
  return (
    <div className={style.wrap}>
      <Rotation/>
      <div>在{process.env.NODE_ENV}环境</div>
      <div>第三部分</div>
      <div>第四部分</div>
    </div>
  );
};

export default Home;