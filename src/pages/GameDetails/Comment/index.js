import React, { useState, useEffect } from 'react';
// import services from '../../../services';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Icon } from 'antd';
import style from './index.module.scss';

const Comment = (props) => {
  const {
    gameInfo = {},
    comment = [],
    commentRecommend = [],
    commentUnRecommend = [],
    recommendRate = '',
    getGameComment = () => {}
  } = props;
  // const id = gameInfo[0].id;

  const [data, setData] = useState(comment);
  const [activeIndex, setActiveIndex] = useState(0);
  const switchData = ['全部评测', '推荐', '不推荐'];

  // useEffect(() => {
  //   getGameComment(id);
  // }, [id]);
  useEffect(() => {
    setData(comment);
  }, [comment]);
  const handleClick = (index) => {
    setActiveIndex(index);
    if (index === 1) {
      setData(commentRecommend);
    } else if(index === 2) {
      setData(commentUnRecommend);
    } else {
      setData(comment);
    }
  };

  return (
    <div className={style.wrap}>
      <div className={style.discuss_hd}>
        <div className={style.creviewRatio}>
          <div className={style.discuss_tit}>
            <span>推荐率</span>
          </div>
          <div className={style.discuss_val}>
            <div className={style.discuss_score}>
              <strong>{comment.length>0 ? parseFloat(recommendRate).toFixed("1") : '100'}<span>%</span></strong>
              <span className={style.discuss_count}>
                （<span>共{comment.length}</span>条评测）
              </span>
            </div>
          </div>
        </div>
        <div className={style.discuss_button}>
          <div className={style.navwrap}>
            <div className={style.nav}>
              {
                switchData.map((item, index) => (
                  <div
                    className={classnames({ [style.item]: true, [style.bottom]: index === activeIndex })}
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    {item}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={style.allReviews}>
        {
          data.length > 0 ? data.map((item, index) => (
            <div className={style.reviewsContent} key={item + index}>
              <div className={style.img}>
                <div className={style.avater}>
                  <img src={item.avatar} alert='头像' />
                  <div className={style.name}>{item.nickname}</div>
                </div>
              </div>
              <div className={style.content}>
                <div className={style.statusWaper}>
                  {
                    item.recommendstatu === 0 ? (
                      <>
                        <Icon type="smile" />
                        <div className={style.status}>推荐</div>
                      </>) : (
                        <>
                          <Icon type="frown" />
                          <div className={style.status}>不推荐</div>
                        </>
                      )
                  }
                </div>
                <div className={style.time}>{item.commentdate}</div>
                <div className={style.con}>{item.content}</div>
              </div>
            </div>
          )) : (<div className={style.empty}> 暂无评测</div>)
        }
      </div>
    </div>
  );
};


const mapStateToProps = ({ comment }) => {
  return {
    comment: comment.comment,
    commentRecommend: comment.commentRecommend,
    commentUnRecommend: comment.commentUnRecommend,
    recommendRate: comment.recommendRate
  };
};

const mapDispathToProps = ({ comment }) => {
  return {
    getGameComment: comment.getGameComment,
  };
};

export default connect(mapStateToProps,mapDispathToProps)(Comment);