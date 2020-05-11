/* eslint-disable react/prop-types */
import React from 'react';

import { Form, Select, Button, Input } from 'antd';
import style from './index.module.scss';

const { Option } = Select;

const Search = (props) => {
  const {
    form,
    onSearch = () => { },
    onReset = () => { },
  } = props;
  const { getFieldDecorator, resetFields, getFieldsValue } = form;

  const handleReset = () => {
    resetFields();
    onReset();
  };
  // 查询
  const handleQuery = () => {
    const value = getFieldsValue();
    value.game_name = value.game_name.trim();
    console.log(value);
    onSearch({ ...value });
  };
  return (
    <div className={style.formWraper}>
      <Form layout="inline" className={style.form}>
        <Form.Item label="游戏名">
          {getFieldDecorator('game_name', {
            rules: [],
          })(<Input placeholder="请输入游戏名" allowClear />)}
        </Form.Item>
        <Form.Item label="游戏类型">
          {getFieldDecorator('type', {
            rules: [],
          })(<Select placeholder="请选择游戏类型">
            <Option value="recommend">热门推荐</Option>
            <Option value="sellwell">本周热销</Option>
            <Option value="prepurchase">火爆新品</Option>
            <Option value="masterpiece">大型网游</Option>
            <Option value="single">单机</Option>
          </Select>)}
        </Form.Item>
        <div className={style.btn}>
          <Button type="primary" onClick={handleQuery}>查询</Button>
          <Button onClick={handleReset}>重置</Button>
        </div>
      </Form>
    </div>
  );
};

export default Form.create({ name: 'searchForm' })(Search);