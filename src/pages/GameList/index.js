import React, { useState, useEffect } from 'react';
import services from '../../services';
import { Pagination, Empty } from 'antd';
import { Nav, GameListItem } from '../../components';
import { getUrlParam } from '../../utils';
import style from './index.module.scss';

const Details = (props) => {
  const { history } = props;
  const param = getUrlParam('searchTag');
  const name = decodeURIComponent(getUrlParam('name'));
  const [data, setData] = useState();
  const [pageData, setPageData] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  console.log(param);
  console.log(name);
  useEffect(() => {
    if(param){
      getGameList(param);
      return;
    }
    if(name){
      getGame(name);
    }
  }, [param]);
  // 请求列表数据
  const getGameList = async (param) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getGameList({ param });
      if (data.code === 200) {
        setPageData(sliceData(data.data, page, pageSize));
        setData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 请求对应名字的游戏
  const getGame = async (name) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getSearchGame({ name });
      if (data.code === 200) {
        setPageData(sliceData(data.data, page, pageSize));
        setData(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sliceData = (data, page, pageSize) => {
    let datatemp = data.slice((page - 1) * pageSize, page * pageSize);
    return datatemp;
  };
  // 前往详情
  const handleToDetail = (id) => {
    history.push(`/game/details?id=${id}`);
  };

  const onShowSizeChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
    setPageData(sliceData(data, page, pageSize))
  }
  const onChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
    setPageData(sliceData(data, page, pageSize))
  }
  return (
    <div className={style.wrap}>
      <Nav history={history} />
      <div className={style.resultWaper}>
        <div className={style.result}>搜索结果</div>
        <div className={style.total}>共{data ? data.length : '0'}种</div>
      </div>
      {
        data ? (
          <>
            <div className={style.gameWaper}>
              <ul className={style.gameList}>
                {
                  pageData && pageData.map((item, index) => (
                    <GameListItem item={item} key={item + index} handleToDetail={handleToDetail} />
                  ))
                }
              </ul>
            </div>
            {
              pageData && pageData.length > 1 ? (
                <div className={style.page}>
                  <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    onChange={onChange}
                    pageSize={pageSize}
                    defaultCurrent={1}
                    current={page}
                    total={data ? data.length : 0}
                  />
                </div>
              ):(<></>)
            }
          </>
        ) : (
          <Empty></Empty>
        )
      }
    </div>
  );
};

export default Details;