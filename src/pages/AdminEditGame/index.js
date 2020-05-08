import React, { useState, useEffect } from 'react';
import moment from 'moment';
import services from '../../services';
import { Form, message, Input, Select, Button } from 'antd';
import { AdminLayout, Title } from '../../components';
import Search from './components/Search';
import Table from './components/Table';
import style from './index.module.scss';

const { Option } = Select;

const AdminEditGame = (props) => {
  const { history, form } = props;

  const {
    getFieldDecorator,
    resetFields,
    getFieldsValue,
  } = form;

  // const addGame = async (prams) => {
  //   try {
  //     const { data } = await services.addGame(prams);
  //     if (data.code === 200) {
  //       message.success("添加成功");
  //       handleReset();
  //     } else {
  //       message.error("添加失败");
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // 查询
  const handleQuery = () => {
    const value = getFieldsValue();
    value.game_name = value.game_name.trim();
    console.log(value);
    // onSearch({ ...value });
  };

  return (
    <div className={style.wrap}>
      <AdminLayout history={history}>
        <div className={style.content}>
          <Title data="编辑游戏" />
          <div className={style.search}>
            <Search />
          </div>
          <div className={style.tableBoxs}>
            <Table
              // onDetails={(row) => handleDetails(row)}
              // loading={loading}
              // onSort={handleSort}
              // dataSource={tableList}
            />
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Form.create({ name: 'editGame' })(AdminEditGame);
