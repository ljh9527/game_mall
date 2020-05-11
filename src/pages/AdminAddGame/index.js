import React, { useState, useEffect } from 'react';
import moment from 'moment';
import services from '../../services';
import { requestUrl } from '../../config';
import { Form, Input, DatePicker, Checkbox, Radio, Row, Col, Button, Upload, Icon, message } from 'antd';
import { AdminLayout, Title } from '../../components';
import { getUrlParam, requestErrorHandler } from '../../utils';
import style from './index.module.scss';
const { TextArea } = Input;

const AdminAddGame = (props) => {
  const { history, form } = props;
  const id = getUrlParam("id");
  const type = getUrlParam("type");
  const [radioStatus, setRadioStatus] = useState('url');
  const [fileList, setFileList] = useState([]);
  const [imageCover, setImageCover] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [defaultData, setDefaultData] = useState({}); // 初始数据
  const [defaultCheckBoxData, setDefaultCheckBoxData] = useState([]); // 初始多选框数据
  const {
    getFieldDecorator,
    resetFields,
    getFieldsValue,
  } = form;
  useEffect(() => {
    if (id !== '') {
      getGameInfo(id);
    }
  }, [id])

  const handleChangeStatus = (e) => {
    setRadioStatus(e.target.value);
  }
  const handleSubmit = () => {
    let data = getFieldsValue();
    if (data.issueddate) {
      data.issueddate = data.issueddate.valueOf().toString();
    }
    if (id !== '' && type === "edit") {
      data.id = id;
    }
    if (radioStatus === "upload") {
      let coverResult = updataFormat(data.image_cover);
      let bannerResult = updataFormat(data.banner_img);
      data.image_cover = coverResult instanceof Array ? coverResult[0] : coverResult;
      data.banner_img = bannerResult instanceof Array ? bannerResult[0] : bannerResult;

      updataFormat(data.list_img).map((item, index) => {
        index = index + 1;
        data['image' + index] = item
      })
    }
    data.game_price = data.game_price.toString();
    addGame(data);
  }
  const addGame = async (prams) => {
    try {
      const { data } = await services.addGame(prams);
      if (data.code === 200) {
        if (type === "edit") {
          message.success("修改成功");
          handleBack();
        } else {
          message.success("添加成功");
        }
        handleReset();
      } else {
        message.error("添加失败");
      };
    } catch (error) {
      requestErrorHandler(error);
    }
  }
  const updataFormat = (data) => {
    const array = [];
    if (data.fileList) {
      data.fileList.map((item) => {
        if (!item.url) {
          array.push(`${requestUrl}${item.response.data.filename}`);
        } else {
          array.push(item.url);
        }
      })
      return array;
    } else {
      if (data instanceof Array) {
        data.map((item) => {
          array.push(item.url);
        })
        return array;
      }
      return data;
    }
  }
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleCoverChange = (info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        setImageCover(imageUrl)
      );
    }
  };
  const handleBannerChange = (info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        setBannerImage(imageUrl)
      );
    }
  }
  const handleFileListChange = ({ fileList }) => {
    setFileList(fileList)
  };
  const getGameInfo = async (id) => {
    try {
      const { data } = await services.getGameAllInfo({ id });
      if (data.code === 200) {
        const game = data.data;
        setDefaultData(game);
        let array = [];
        game.recommend === "1" && array.push("recommend");
        game.sellwell === "1" && array.push("sellWell");
        game.prepurchase === "1" && array.push("prePurchase");
        game.masterpiece === "1" && array.push("masterpiece");
        game.single === "1" && array.push("single");

        setDefaultCheckBoxData(array);
        setBannerImage(game.banner_img);
        setImageCover(game.image_cover);
        setFileList([{
          uid: "-1",
          url: game.image1
        }, {
          uid: "-2",
          url: game.image2
        }, {
          uid: "-3",
          url: game.image3
        }, {
          uid: "-4",
          url: game.image4
        }, {
          uid: "-5",
          url: game.image5
        }, {
          uid: "-6",
          url: game.image6
        }]);
        setRadioStatus("upload");
      }
    } catch (error) {
      requestErrorHandler(error);
    }
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  // 重置
  const handleReset = () => {
    resetFields();
    if (type === 'edit') {
      setBannerImage(defaultData.banner_img);
      setImageCover(defaultData.image_cover);
      setFileList([{
        uid: "-1",
        url: defaultData.image1
      }, {
        uid: "-2",
        url: defaultData.image2
      }, {
        uid: "-3",
        url: defaultData.image3
      }, {
        uid: "-4",
        url: defaultData.image4
      }, {
        uid: "-5",
        url: defaultData.image5
      }, {
        uid: "-6",
        url: defaultData.image6
      }]);
    } else {
      setBannerImage();
      setImageCover();
      setFileList([]);
    }
  };
  const handleBack = () => {
    history.push("/game/edit");
  }
  const beforeUpload = (file) => {
    if (file.size / 1024 / 1024 > 10) {
      message.error('最多不能超过10M');
      return false;
    }
    return true;
  };

  return (
    <div className={style.wrap}>
      <AdminLayout history={history}>
        <div className={style.content}>
          {
            type === "detail" ? (<Title data="游戏信息" />) : type === "edit" ? (<Title data="更改游戏" />) : (<Title data="添加游戏" />)
          }

          <Form layout="inline" className={style.form}>
            <Form.Item label="游戏名">
              {getFieldDecorator('game_name', {
                rules: [{ required: true, message: '请输入游戏名!' }],
                initialValue: defaultData.game_name
              })(<Input placeholder="请输入游戏名" allowClear />)}
            </Form.Item>
            <Form.Item label="副标题">
              {getFieldDecorator('subtitle', {
                rules: [{ required: true, message: '请输入游戏副标题!' }],
                initialValue: defaultData.subtitle
              })(<Input placeholder="请输入游戏副标题" allowClear />)}
            </Form.Item>
            <Form.Item label="开发商">
              {getFieldDecorator('developers', {
                rules: [{ required: true, message: '请输入游戏开发商!' }],
                initialValue: defaultData.developers
              })(<Input placeholder="请输入游戏开发商" allowClear />)}
            </Form.Item>
            <Form.Item label="运营商">
              {getFieldDecorator('operator', {
                rules: [{ required: true, message: '请输入游戏运营商!' }],
                initialValue: defaultData.operator
              })(<Input placeholder="请输入游戏运营商" allowClear />)}
            </Form.Item>
            <Form.Item label="游戏价格">
              {getFieldDecorator('game_price', {
                rules: [
                  { required: true, message: '请输入游戏价格，免费为0' },
                ],
                initialValue: defaultData.game_price
              })(<Input placeholder="请输入游戏价格" allowClear />)}
            </Form.Item>
            <Form.Item label="上线日期">
              {getFieldDecorator('issueddate', {
                rules: [{ required: true, message: '请输入游戏上线日期!' }],
                initialValue: defaultData.issueddate ? moment(defaultData.issueddate, 'YYYY/MM/DD') : null
              })(<DatePicker />)}
            </Form.Item>
            <Form.Item label="游戏介绍" style={{ width: "415px" }}>
              {getFieldDecorator('game_introduction', {
                rules: [],
                initialValue: defaultData.game_introduction
              })(<TextArea
                placeholder="请输入游戏介绍"
                autoSize={{ minRows: 3 }}
                allowClear
                style={{ width: "350px" }}
              />)}
            </Form.Item>
            <Form.Item label="游戏详情" style={{ width: "415px" }}>
              {getFieldDecorator('game_about', {
                rules: [],
                initialValue: defaultData.game_about
              })(<TextArea
                placeholder="请输入游戏介绍"
                autoSize={{ minRows: 3 }}
                allowClear
                style={{ width: "350px" }}
              />)}
            </Form.Item>
            <Form.Item label="推荐状态" style={{ width: '100%', justifyContent: "flex-start", }}>
              {getFieldDecorator('status', {
                rules: [],
                initialValue: defaultCheckBoxData
              })(<Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col >
                    <Checkbox value="recommend">热门推荐</Checkbox>
                  </Col>
                  <Col >
                    <Checkbox value="sellWell">本周热销</Checkbox>
                  </Col>
                  <Col >
                    <Checkbox value="prePurchase">火爆新品</Checkbox>
                  </Col>
                  <Col >
                    <Checkbox value="masterpiece">大型网游</Checkbox>
                  </Col>
                  <Col >
                    <Checkbox value="single">单机</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>)}
            </Form.Item>
            {
              type !== 'detail' ? (<Form.Item label="游戏图片" style={{ justifyContent: "flex-start", }}>
                {getFieldDecorator('picstatus', {
                  initialValue: radioStatus,
                  rules: [],
                })(
                  <Radio.Group onChange={(e) => handleChangeStatus(e)}>
                    <Radio value="url">图片链接</Radio>
                    <Radio value="upload">图片上传</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>) : (<></>)
            }
            {
              radioStatus === "url" ? (<>
                <Form.Item label="封面图片" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image_cover', {
                      rules: [{ required: true, message: '请输入游戏封面图片!' }],
                    })(<Input placeholder="请输入游戏封面图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="横向封面" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('banner_img', {
                      rules: [{ required: true, message: '请输入游戏横向封面图片链接' }],
                    })(<Input placeholder="请输入游戏横向封面图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片1" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image1', {
                      rules: [],
                      initialValue: fileList.length > 0 && fileList[0].url
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片2" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image2', {
                      rules: [],
                      initialValue: fileList.length > 0 && fileList[1].url
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片3" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image3', {
                      rules: [],
                      initialValue: fileList.length > 0 && fileList[2].url
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片4" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image4', {
                      rules: [],
                      initialValue: fileList.length > 0 && fileList[3].url
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片5" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image5', {
                      rules: [],
                      initialValue: fileList.length > 0 && fileList[4].url
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片6" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image6', {
                      rules: [],
                      initialValue: fileList.length > 0 && fileList[5].url
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
              </>)
                : (<>
                  <Form.Item label="封面图片" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                    {
                      getFieldDecorator('image_cover', {
                        rules: [],
                        initialValue: defaultData.image_cover
                      })(<Upload
                        action={services.uploadFile}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onPreview={(file) => beforeUpload(file)}
                        onChange={handleCoverChange}
                      >
                        {imageCover ? <img src={imageCover} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                      </Upload>)
                    }
                  </Form.Item>
                  <Form.Item label="横向封面" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                    {
                      getFieldDecorator('banner_img', {
                        rules: [],
                        initialValue: defaultData.banner_img
                      })(<Upload
                        action={services.uploadFile}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onPreview={(file) => beforeUpload(file)}
                        onChange={handleBannerChange}
                      >
                        {bannerImage ? <img src={bannerImage} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                      </Upload>)
                    }
                  </Form.Item>
                  <Form.Item label="详情图片" className="clearfix" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                    {
                      getFieldDecorator('list_img', {
                        rules: [],
                        initialValue: fileList
                      })(<Upload
                        action={services.uploadFile}
                        listType="picture-card"
                        className="avatar-uploader"
                        fileList={fileList}
                        onPreview={(file) => beforeUpload(file)}
                        onChange={handleFileListChange}
                      >
                        {fileList.length >= 6 ? null : uploadButton}
                      </Upload>)
                    }
                  </Form.Item>
                </>)
            }
            <div className={style.btn}>
              {
                type !== "detail" ? (<>
                  <Button type="primary" onClick={handleSubmit}>提交</Button>
                  <Button type="primary" onClick={handleReset}>重置</Button>
                </>) : (<>
                  <Button type="primary" onClick={handleBack}>返回</Button>
                </>)
              }
            </div>
          </Form>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Form.create({ name: 'addGame' })(AdminAddGame);
