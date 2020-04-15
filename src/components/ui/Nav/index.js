import React, { useState, useEffect } from 'react';
import { getUrlParam } from '../../../utils';
import { Input } from 'antd';
import classnames from 'classnames';
import style from './index.module.scss';
const { Search } = Input;

const data = [{
  name: '精选',
  searchTag: ''
}, {
  name: '本周热门',
  searchTag: 'recommend'
}, {
  name: '火爆新品',
  searchTag: 'prePurchase'
}, {
  name: '大型网游',
  searchTag: 'masterpiece'
}, {
  name: '单机',
  searchTag: 'single'
}];

const Details = (props) => {
  const {
    // onCheck = () => { },
    history,
  } = props;
  const param = getUrlParam('searchTag');
  const [bottomIndex, setBottomIndex] = useState(0);

  useEffect(() => {
    let temp = data.findIndex((item,index)=>(item.searchTag === param));
    setBottomIndex(temp);
  }, [param]);
  const handleCheck = (index) => {
    let temp = data.find((item,indexItem)=>(indexItem === index));
    // onCheck(temp.searchTag);
    console.log(temp.searchTag);
    temp.searchTag ? history.push(`/game/list?searchTag=${temp.searchTag}`) : history.push(`/index`);
    
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
              {item.name}
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