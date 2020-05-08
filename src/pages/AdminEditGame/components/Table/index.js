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
      dataIndex: 'userName',
    },
    {
      title: '管理部门',
      dataIndex: 'deptName',
    },
    {
      title: '标题',
      dataIndex: 'headline',
      render: (text, record, index) => {
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return <a href="javascript:;" style={{color: '#1890ff'}} onClick={() => { onDetails(record); }}>{text}</a>;
      },
    },
    {
      title: '发布时间',
      dataIndex: 'updateTime',
      sorter: true,
      defaultSortOrder: 'descend',
      render: (text) => {
        if (text) {
          return moment(new Date(text).getTime()).format('YYYY-MM-DD HH:mm:ss');
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      render: (text, record, index) => {
        return <a href="javascript:;" style={{color: '#1890ff'}} onClick={() => { onDetails(record); }}>查看</a>;
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