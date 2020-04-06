/*
 * @Author: your name
 * @Date: 2020-02-13 10:01:05
 * @LastEditTime : 2020-02-13 18:00:13
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hik-supervise-xinjiang-react\src\pages\BusinessHall\TruckPassport\Auditing\components\ImgList\index.js
 */
import React, { useState, useEffect } from 'react';
import { Empty } from 'antd';
import styles from './index.module.scss';

export default (props) => {
  const {
    data = [],
    title,
    width,
    height,
    index = 0, // 默认展示图片序号
    multiple = true, // 是否展示多张
  } = props;
  const styleObj = {};
  // width && (styleObj.width = `${width}px`, styleObj.height = height ? `${height}px` : 'auto');
  // height && (styleObj.height = `${height}px`, styleObj.width = width ? `${width}px` : 'auto');
  const [imgTitle, setImgTitle] = useState('');
  const [imgData, setImgData] = useState([]);
  const [imageindex, setImageindex] = useState(index);
  const [showViewImage, setShowViewImaget] = useState(false);
  const [viewImageList, setViewImageList] = useState([]);
  // 预览图片
  const openImageViewer = (index, data) => {
    const list = data.map((item) => ({
      src: item.src,
      alt: item.name || item.alt || item.label
    }))
    setImageindex(index);
    setViewImageList(list);
    setImageindex(index);
    setImgTitle(title);
    setShowViewImaget(true);
  };
  // 关闭图片
  const closeImageViewer = () => {
    setImageindex(0);
    setViewImageList([]);
    setImgTitle('');
    setShowViewImaget(false);
  };
  useEffect(() => {
    const pics = data.map((item, index) => {
      if (typeof item === 'object') {
        return item
      } else if (typeof item === 'string') {
        return {
          src: item,
          name: title ? ((data.length > 1 && multiple) ? `${title}${index + 1}` : title) : ''
        }
      }
    })

    setImgData(pics);
  }, [data]);

  return (
    imgData.length ? <div>
      {
        multiple ? <ul className={styles.imgPanel}>
          {

            imgData.map((item, index) => (
              <li className={styles.imgItem} key={`img${index}`}>
                <span className={styles.img} style={styleObj} onClick={() => { openImageViewer(index, imgData) }}>
                  <img src={item.src} />
                </span>
                {item.name && <span className={styles.text}>{item.require && <span className={styles.require}>*</span>}{item.name}</span>}
              </li>
            ))
          }
        </ul> :
          <div className={styles.imgPanel}>
            <div className={styles.imgItem}>
              <span className={styles.img} style={styleObj} onClick={() => { openImageViewer(imageindex, imgData) }}>
                <img src={imgData[imageindex].src} />
              </span>
              {imgData[imageindex].name && <span className={styles.text}>{imgData[imageindex].require && <span className={styles.require}>*</span>}{imgData[imageindex].name}</span>}
            </div>
          </div>

      }
    </div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  )
}