import React, { useState } from 'react';
import { Input } from 'antd';
import classnames from 'classnames';
import style from './index.module.scss';
const { Search } = Input;

const Details = (props) => {
  const {
    onCheck = () => {},
  } = props;
  const [bottomIndex, setBottomIndex] = useState(0);
  const data = ['首页', '热门推荐', '大型网游', '火爆新品', '单机'];
  const handleCheck = (index) => {
    onCheck(index);
    setBottomIndex(index);
  };
  return (
    <div className={style.wrap}>
      <div className={style.nav}>
        {
          data.map((item, index) => (
            <div
              className={classnames({ [style.item]: true, [style.bottom]: bottomIndex === index })}
              key={index}
              onClick={() => handleCheck(index)}
            >
              {item}
            </div>))
        }
        <div className={style.search}>
          <Search placeholder="搜索想玩的游戏" onSearch={value => console.log(value)} enterButton />
        </div>
      </div>
    </div>
  );
};

export default Details;