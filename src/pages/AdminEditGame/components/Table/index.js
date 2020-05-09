import React from 'react';
import moment from 'moment';
import { Table } from 'antd';

// import styles from './index.module.scss';

const tableComp = (props) => {
  const {
    loading = false,
    dataSource = [],
    onSort = () => { },
    onDetails = () => { },
  } = props;
  const columns = [
    {
      title: '游戏名',
      dataIndex: 'game_name',
    },
    {
      title: '游戏价格',
      dataIndex: 'game_price',
    },
    {
      title: '开发商',
      dataIndex: 'operator',
    },
    {
      title: '运营商',
      dataIndex: 'headline',
    },
    {
      title: '上线日期',
      dataIndex: 'issueddate',
      // sorter: true,
      // defaultSortOrder: 'descend',
      // render: (text) => {
      //   if (text) {
      //     return moment(new Date(text).getTime()).format('YYYY-MM-DD HH:mm:ss');
      //   }
      // },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      render: (text, record, index) => {
        return (<>
          <a href="javascript:;" style={{ color: '#1890ff' }} onClick={() => { onDetails(record); }}>查看</a>
          <a href="javascript:;" style={{ color: '#1890ff' }} onClick={() => { onDetails(record); }}>编辑</a>
          <a href="javascript:;" style={{ color: '#1890ff' }} onClick={() => { onDetails(record); }}>下架</a>
        </>);
      },
    },
  ];
  const handleChange = (pagination, filters, sorter, extra) => {
    onSort(sorter);
  };

  return (
    <div>
      <Table
        loading={loading}
        rowKey="id"
        dataSource={dataSource}
        pagination={false}
        onChange={handleChange}
        columns={columns.map(item => ({ ...item, align: 'left' }))}
      />
    </div>
  );
};

export default tableComp;