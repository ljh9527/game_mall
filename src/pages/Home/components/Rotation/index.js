import React, { useState, useEffect, useRef } from 'react';
import { Icon } from 'antd';
import style from './index.module.scss';
import classnames from 'classnames';

const wordData = [{
  title: "龙之谷0",
  sub: "暖春大作战",
}, {
  title: "龙之谷1",
  sub: "暖春大作战",
}, {
  title: "龙之谷2",
  sub: "暖春大作战",
}, {
  title: "龙之谷3",
  sub: "暖春大作战",
}, {
  title: "龙之谷4",
  sub: "暖春大作战",
}, {
  title: "龙之谷5",
  sub: "暖春大作战",
}];
const imgData = [{
  url: "http://t3.market.mi-img.com/thumbnail/jpeg/l750/AppStore/01d0753ba603691e181c670f5adb40a825f423298",
}, {
  url: "http://t5.market.xiaomi.com/thumbnail/jpeg/l750/AppStore/0bf90e50d072f440325a207587fbaf44f3e0c87c1",
}, {
  url: "https://wegame.gtimg.com/g.2001141-r.87b21/adm/15813455283882.jpeg",
}, {
  url: "https://wegame.gtimg.com/g.514-r.ef470/adm/15795103504167.jpeg",
}, {
  url: "https://wegame.gtimg.com/g.36-r.37185/adm/15830371103882.jpeg?nosharpp=1",
}, {
  url: "https://wegame.gtimg.com/g.2000931-r.46a1c/adm/15829011673882.jpeg",
}];
const Home = (props) => {
  // const { } = props;
  const [curItem, setCurItem] = useState([true, false, false, false, false, false]);
  const [selectIndex, setSelectIndex] = useState(0);
  const intervalRef = useRef(null);
  const latestCount = useRef(selectIndex);
  // const [timer, setTimer] = useState(false);
  useEffect(() => {
    enter();
    return () => clearTimeout(intervalRef.current);
  }, [])

  const leave = () => {
    clearTimeout(intervalRef.current);
  }
  const enter = () => {
    leave();
    if (latestCount.current === imgData.length - 1) {
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
    <div className={style.wrap}>
      <div className={style.imgContainer}>
        {
          imgData.map((item, index) => (
            <img style={{ display: (index === latestCount.current) ? "block" : "none" }} src={item.url} alt={index} key={index} />
          ))
        }
      </div>
      <div className={style.upperContainer}>
        <div className={style.upper}>
          {
            wordData.map((item, index) => (
              <li
                onMouseEnter={(e) => handleMouseEnter(e, index)}
                onMouseLeave={handleMouseLeave}
                className={classnames({ [style.upperItem]: true, [style.cur]: curItem[index] })}
                key={index}>
                  <div style={{ color: (index === latestCount.current) ? '#40c4ff' : '#e0e0e0'}} className={style.title}>{item.title}</div>
                  <div style={{ opacity: (index === latestCount.current) ? 1 : 0}} className={style.sub}>{item.sub}</div>
              </li>)
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Home;