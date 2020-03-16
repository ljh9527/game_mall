import React from 'react';
import style from './index.module.scss';

const Title = (props) => {
  const {
    name,
    searchTag,
    handleToMore = () => { },
  } = props;
  return (
    <div className={style.title_hd} onClick={()=>handleToMore(searchTag)}>
      <span className={style.title_h1}>{name}</span>
      <span className={style.more}>
        <u>更多</u>
        <i>></i>
      </span>
    </div>
  );
};

export default Title;