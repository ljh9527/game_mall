import React from 'react';
import moment from 'moment';
import { Table } from 'antd';

// import styles from './index.module.scss';

const tableComp = (props) => {
  const {
    loading = false,
    dataSource = [],
    // onSort = () => { },
    onDetails = () => { },
    onDelete = () => {},
    onEdit = () => {}
  } = props;
  const columns = [
    {
      title: '游戏名',
      dataIndex: 'gameName',
    },
    {
      title: '游戏价格',
      dataIndex: 'gamePrice',
    },
    {
      title: '开发商',
      dataIndex: 'developers',
    },
    {
      title: '运营商',
      dataIndex: 'operator',
    },
    {
      title: '上线日期',
      dataIndex: 'issueddate',
      // sorter: true,
      // defaultSortOrder: 'descend',
      render: (text) => {
        if (text) {
          return moment(new Date(text).getTime()).format('YYYY-MM-DD');
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 140,
      render: (text, record, index) => {
        return (<span>
          <span style={{ color: '#1890ff', cursor: "pointer", marginRight: "10px" }} onClick={() => { onDetails(record); }}>查看</span>
          <span style={{ color: '#1890ff', cursor: "pointer", marginRight: "10px" }} onClick={() => { onEdit(record); }}>编辑</span>
          <span style={{ color: '#1890ff', cursor: "pointer" }} onClick={() => { onDelete(record); }}>下架</span>
        </span>);
      },
    },
  ];
  // const handleChange = (pagination, filters, sorter, extra) => {
  //   onSort(sorter);
  // };

  return (
    <div>
      <Table
        loading={loading}
        rowKey="id"
        dataSource={dataSource}
        pagination={false}
        // onChange={handleChange}
        columns={columns.map(item => ({ ...item, align: 'left' }))}
      />
    </div>
  );
};

export default tableComp;