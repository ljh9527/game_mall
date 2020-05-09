import React, { useState, useEffect } from 'react';
import moment from 'moment';
import services from '../../services';
import { Form, message, Input, Select, Button } from 'antd';
import { AdminLayout, Title } from '../../components';
import style from './index.module.scss';

const { Option } = Select;

const AdminGameIndex = (props) => {
  const { history, form } = props;
  const { getFieldDecorator, resetFields, getFieldsValue } = form;
  const [rotationList, setRotationList] = useState([]); // 轮播图初始数据
  const [recommendList, setRecommendList] = useState([]); // 轮播图初始数据
  const [sellwellList, setSellwellList] = useState([]); // 轮播图初始数据
  const [prepurchaseList, setPrepurchaseList] = useState([]); // 轮播图初始数据
  const [allGame, setAllGame] = useState([]); // 下拉框所有游戏数据
  const [recommendGame, setRecommendGame] = useState([]); // 下拉框热门推荐游戏数据
  const [sellWellGame, setSellWellGame] = useState([]); // 下拉框本周热销游戏数据
  const [prePurchaseGame, setPrePurchaseGame] = useState([]); // 下拉框火爆新品游戏数据

  useEffect(() => {
    getIndexGameList({ type: 1 });
    getIndexGameList({ type: 2 });
    getIndexGameList({ type: 3 });
    getIndexGameList({ type: 4 });
    getAllGame();
    getGameList("recommend");
    getGameList("sellWell");
    getGameList("prePurchase");
  }, [])

  const getIndexGameList = async (prams) => {
    try {
      const { data } = await services.getIndexGameList(prams);
      if (data.code === 200) {
        if (prams.type === 1) {
          setRotationList(data.data);
        } else if (prams.type === 2) {
          setRecommendList(data.data);
        } else if (prams.type === 3) {
          setSellwellList(data.data);
        } else if (prams.type === 4) {
          setPrepurchaseList(data.data);
        }
        // handleReset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllGame = async () => {
    try {
      const { data } = await services.getAllGame({});
      if (data.code === 200) {
        setAllGame(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getGameList = async (param) => {
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.getGameList({ param });
      if (data.code === 200) {
        if (param === "recommend") {
          setRecommendGame(data.data);
        } else if (param === "sellWell") {
          setSellWellGame(data.data);
        } else if (param === "prePurchase") {
          setPrePurchaseGame(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = () => {
    resetFields();
  };
  // 保存
  const handleSave = (type) => {
    let value;
    if (type === "1") {
      value = getFieldsValue(["1", "2", "3", "4", "5", "6"]);
      console.log(value);
    } else if (type === "2") {
      value = getFieldsValue(["7", "8", "9", "10"]);
      console.log(value);
    } else if (type === "3") {
      value = getFieldsValue(["11", "12", "13", "14"]);
      console.log(value);
    } else if (type === "4") { 
      value = getFieldsValue(["15", "16", "17"]);
      console.log(value);
    }
    // onSearch({ ...value });
  };

  return (
    <div className={style.wrap}>
      <AdminLayout history={history}>
        <div className={style.content}>
          <Title data="商城首页" />
          <div className={style.rotation}>
            <div className={style.title}>
              轮播图
            </div>
            <div className={style.info}>
              <Form layout="inline" className={style.form}>
                {
                  rotationList.length > 0 && rotationList.map((item, index) => (<Form.Item label={`轮播游戏${index + 1}`} key={index}>
                    {getFieldDecorator(`${item.id}`, {
                      rules: [],
                      initialValue: item.game_id
                    })(<Select placeholder="请选择轮播图游戏" showSearch>
                      {
                        allGame.length > 0 && allGame.map((item) => (<Option value={item.id} key={item.id}>{item.gameName}</Option>))
                      }
                    </Select>)}
                  </Form.Item>))
                }
                <div className={style.btn}>
                  <Button type="primary" onClick={() => handleSave("1")}>保存</Button>
                  <Button onClick={handleReset}>重置</Button>
                </div>
              </Form>
            </div>
          </div>
          <div className={style.rotation}>
            <div className={style.title}>
              热门推荐
            </div>
            <div className={style.info}>
              <Form layout="inline" className={style.form}>
                {
                  recommendList.length > 0 && recommendList.map((item, index) => (<Form.Item label={`热门游戏${index + 1}`} key={index}>
                    {getFieldDecorator(`${item.id}`, {
                      rules: [],
                      initialValue: item.game_id
                    })(<Select placeholder="请选择热门推荐游戏" showSearch>
                      {
                        recommendGame.length > 0 && recommendGame.map((item) => (<Option value={item[0].id} key={item[0].id}>{item[0].gameName}</Option>))
                      }
                    </Select>)}
                  </Form.Item>))
                }
                <div className={style.btn}>
                  <Button type="primary" onClick={() => handleSave("2")}>保存</Button>
                  <Button onClick={handleReset}>重置</Button>
                </div>
              </Form>
            </div>
          </div>
          <div className={style.rotation}>
            <div className={style.title}>
              本周热销
            </div>
            <div className={style.info}>
              <Form layout="inline" className={style.form}>
                {
                  sellwellList.length > 0 && sellwellList.map((item, index) => (<Form.Item label={`热销游戏${index + 1}`} key={index}>
                    {getFieldDecorator(`${item.id}`, {
                      rules: [],
                      initialValue: item.game_id
                    })(<Select placeholder="请选择本周热销游戏" showSearch>
                      {
                        sellWellGame.length > 0 && sellWellGame.map((item) => (<Option value={item[0].id} key={item[0].id}>{item[0].gameName}</Option>))
                      }
                    </Select>)}
                  </Form.Item>))
                }
                <div className={style.btn}>
                  <Button type="primary" onClick={() => handleSave("3")}>保存</Button>
                  <Button onClick={handleReset}>重置</Button>
                </div>
              </Form>
            </div>
          </div>
          <div className={style.rotation}>
            <div className={style.title}>
              火爆新品
            </div>
            <div className={style.info}>
              <Form layout="inline" className={style.form}>
                {
                  prepurchaseList.length > 0 && prepurchaseList.map((item, index) => (<Form.Item label={`新品游戏${index + 1}`} key={index}>
                    {getFieldDecorator(`${item.id}`, {
                      rules: [],
                      initialValue: item.game_id
                    })(<Select placeholder="请选择火爆新品游戏" showSearch>
                      {
                        prePurchaseGame.length > 0 && prePurchaseGame.map((item) => (<Option value={item[0].id} key={item[0].id}>{item[0].gameName}</Option>))
                      }
                    </Select>)}
                  </Form.Item>))
                }
                <div className={style.btn}>
                  <Button type="primary" onClick={() => handleSave("4")}>保存</Button>
                  <Button onClick={handleReset}>重置</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Form.create({ name: 'gameIndex' })(AdminGameIndex);
