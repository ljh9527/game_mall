import React, { useState, useEffect, useRef } from 'react';
import style from './index.module.scss';
import classnames from 'classnames';

const Home = (props) => {
  const { rotationData = [], handleToDetail = () => { } } = props;
  const [curItem, setCurItem] = useState([true, false, false, false, false, false]);
  const [selectIndex, setSelectIndex] = useState(0);
  // const [wordData, setWordData] = useState([]);
  const intervalRef = useRef(null);
  const latestCount = useRef(selectIndex);
  // const [timer, setTimer] = useState(false);
  useEffect(() => {
    enter();
    return () => clearTimeout(intervalRef.current);
  }, [])
  // useEffect(() => {
  //   let temp = [];
  //   rotationData.map((value, index) => {
  //     temp.push(value[0])
  //     return '';
  //   })
  //   setWordData(temp);
  // }, [rotationData]);

  const leave = () => {
    clearTimeout(intervalRef.current);
  }
  const enter = () => {
    leave();
    if (latestCount.current === 5) {
      latestCount.current = 0;
    } else {
      latestCount.current++;
    }
    const defaultState = [false, false, false, false, false, false];
    defaultState[latestCount.current] = true;
    setCurItem(defaultState);
    let id = setTimeout(() => {
      enter();
    }, 3000);
    intervalRef.current = id;
  }

  const handleMouseEnter = (e, index) => {
    const defaultState = [false, false, false, false, false, false];
    defaultState[index] = true;
    latestCount.current = index;
    leave();
    setSelectIndex(index);
    setCurItem(defaultState);
  };
  const handleMouseLeave = (e, index) => {
    enter();
  }
  return (
    <div className={style.content}>
      <div className={style.wrap}>
        <div className={style.imgContainer}>
          {
            rotationData && rotationData.map((item, index) => (
              <img style={{ display: (index === latestCount.current) ? "block" : "none" }} src={item.banner_img} alt={index} key={index} onClick={() => handleToDetail(item.game_id)} />
            ))
          }
        </div>
        <div className={style.upperContainer}>
          <div className={style.upper}>
            {
              rotationData.map((item, index) => (
                <li
                  onMouseEnter={(e) => handleMouseEnter(e, index)}
                  onMouseLeave={handleMouseLeave}
                  className={classnames({ [style.upperItem]: true, [style.cur]: curItem[index] })}
                  key={index}>
                  <div style={{ color: (index === latestCount.current) ? '#40c4ff' : '#e0e0e0' }} className={style.title}>{item.game_name}</div>
                  <div style={{ opacity: (index === latestCount.current) ? 1 : 0 }} className={style.sub}>{item.subtitle}</div>
                </li>)
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;