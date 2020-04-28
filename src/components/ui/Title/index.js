import React from 'react';
import style from './index.module.scss';

const Title = (props)=> {
    const { data } = props;
    return (
        <div className={style.title_hd}>
          <span className={style.title_h1}>{data}</span>
        </div>
    );
}

export default Title;