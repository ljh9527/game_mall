import React, { useState, useEffect } from 'react';
import moment from 'moment';
import services from '../../services';
import { Form, message, Pagination } from 'antd';
import { AdminLayout, Title } from '../../components';
import Search from './components/Search';
import Table from './components/Table';
import style from './index.module.scss';

const AdminEditGame = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({});

  const [tableList, setTableList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState();

  useEffect(() => {
    getAllGame(searchParams);
  }, []);

  const getAllGame = async (searchParams) => {
    setLoading(true);
    try {
      const { data } = await services.getAllGame(searchParams);
      if (data.code === 200) {
        setTableList((sliceData(data.data, page, pageSize)));
        setData(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // 查询
  const handleQuery = (value) => {
    console.log(value);
    setSearchParams(value);
  };
  // 重置
  const handleReset = () => {
    setSearchParams({});
  }

  const handleDelete = async (record) => {
    console.log(record);
    try {
      const { data } = await services.deleteGame({ gameId: record.id });
      if (data.code === 200) {
        message.success("下架成功");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDetails = (row) => {
    history.push(`/game/add?id=${row.id}&type=detail`);
  }
  const handleEdit = (row) => {
    history.push(`/game/add?id=${row.id}&type=edit`);
  }

  const sliceData = (data, page, pageSize) => {
    let datatemp = data.slice((page - 1) * pageSize, page * pageSize);
    return datatemp;
  };
  const onShowSizeChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
    setTableList(sliceData(data, page, pageSize))
  }
  const onChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
    setTableList(sliceData(data, page, pageSize))
  }

  return (
    <div className={style.wrap}>
      <AdminLayout history={history}>
        <div className={style.content}>
          <Title data="游戏列表" />
          <div className={style.search}>
            <Search
              onSearch={handleQuery}
              onReset={handleReset}
            />
          </div>
          <div className={style.tableBoxs}>
            <Table
              loading={loading}
              onDetails={(record) => handleDetails(record)}
              onDelete={(record) => handleDelete(record)}
              onEdit={(record) => handleEdit(record)}
              dataSource={tableList}
            />
          </div>
          {
            tableList && tableList.length > 1 ? (
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
            ) : (<></>)
          }
        </div>
      </AdminLayout>
    </div>
  );
};

export default Form.create({ name: 'editGame' })(AdminEditGame);
