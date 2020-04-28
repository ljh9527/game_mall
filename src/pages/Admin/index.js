import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import moment from 'moment';
import services from '../../services';
import { Form, Input, DatePicker, Checkbox, Radio, Row, Col, Button, Upload, Icon, message } from 'antd';
import { AdminLayout, Title } from '../../components';
// import { getUrlParam } from '../../utils';
import style from './index.module.scss';
const { TextArea } = Input;
const Admin = (props) => {
  const { history, form } = props;
  const email = localStorage.getItem("EMAIL");
  const [radioStatus, setRadioStatus] = useState('url');
  const [fileList, setFileList] = useState([]);
  const [imageCover, setImageCover] = useState();
  const [bannerImage, setBannerImage] = useState();
  const {
    getFieldDecorator,
    resetFields,
    getFieldsValue,
  } = form;

  const handleChangeStatus = (e) => {
    console.log(e.target.value);
    setRadioStatus(e.target.value);
  }
  const handleSubmit = () => {
    let data = getFieldsValue();
    if (data.issueddate) {
      data.issueddate = data.issueddate.valueOf().toString();
    }
    console.log(data);
    if (radioStatus === "upload") {
      data.image_cover = updataFormat(data.image_cover)[0];
      data.banner_img = updataFormat(data.banner_img)[0];

      updataFormat(data.list_img).map((item, index) => data['image' + index] = item)
    }
    addGame(data);
  }
  const addGame = async (prams) => {
    try {
      const { data } = await services.addGame(prams);
      if (data.code === 200) {
        message.success("添加成功");
        handleReset();
      } else {
        message.error("添加失败");
      };
    } catch (error) {
      console.log(error);
    }
  }
  const updataFormat = (data) => {
    const array = [];
    data.fileList.map((item, index) => {
      array.push(`http://localhost:9000${item.response.data.filename}`);
    })
    return array;
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
    console.log(fileList);
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  // 重置
  const handleReset = () => {
    resetFields();
    setBannerImage();
    setImageCover();
    setFileList([]);
  };
  const beforeUpload = (file) => {
    if (file.size / 1024 / 1024 > 10) {
      message.error('最多不能超过10M');
      return false;
    }
    return true;
  };

  return (
    <div className={style.wrap}>
      <AdminLayout>
        <div className={style.content}>

          <Title data="添加游戏" />
          <Form layout="inline" className={style.form}>
            <Form.Item label="游戏名">
              {getFieldDecorator('game_name', {
                rules: [{ required: true, message: '请输入游戏名!' }],
              })(<Input placeholder="请输入游戏名" allowClear />)}
            </Form.Item>
            <Form.Item label="副标题">
              {getFieldDecorator('subtitle', {
                rules: [{ required: true, message: '请输入游戏副标题!' }],
              })(<Input placeholder="请输入游戏副标题" allowClear />)}
            </Form.Item>
            <Form.Item label="开发商">
              {getFieldDecorator('developers', {
                rules: [{ required: true, message: '请输入游戏开发商!' }],
              })(<Input placeholder="请输入游戏开发商" allowClear />)}
            </Form.Item>
            <Form.Item label="运营商">
              {getFieldDecorator('operator', {
                rules: [{ required: true, message: '请输入游戏运营商!' }],
              })(<Input placeholder="请输入游戏运营商" allowClear />)}
            </Form.Item>
            <Form.Item label="游戏价格">
              {getFieldDecorator('game_price', {
                rules: [
                  { required: true, message: '请输入游戏价格，免费为0' },
                ],
              })(<Input placeholder="请输入游戏价格" allowClear />)}
            </Form.Item>
            <Form.Item label="上线日期">
              {getFieldDecorator('issueddate', {
                rules: [{ required: true, message: '请输入游戏上线日期!' }],
              })(<DatePicker />)}
            </Form.Item>
            <Form.Item label="游戏介绍">
              {getFieldDecorator('game_introduction', {
                rules: [],
              })(<TextArea
                placeholder="请输入游戏介绍"
                autoSize={{ minRows: 3 }}
                allowClear
              />)}
            </Form.Item>
            <Form.Item label="游戏详情">
              {getFieldDecorator('game_about', {
                rules: [],
              })(<TextArea
                placeholder="请输入游戏介绍"
                autoSize={{ minRows: 3 }}
                allowClear
              />)}
            </Form.Item>
            <Form.Item label="推荐状态" style={{ width: '100%', justifyContent: "flex-start", }}>
              {getFieldDecorator('status', {
                rules: [],
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
            <Form.Item label="游戏图片" style={{ justifyContent: "flex-start", }}>
              {getFieldDecorator('picstatus', {
                initialValue: 'url',
                rules: [],
              })(
                <Radio.Group onChange={(e) => handleChangeStatus(e)}>
                  <Radio value="url">图片链接</Radio>
                  <Radio value="upload">本地上传</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
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
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片2" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image2', {
                      rules: [],
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片3" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image3', {
                      rules: [],
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片4" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image4', {
                      rules: [],
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片5" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image5', {
                      rules: [],
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
                <Form.Item label="详情图片6" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                  {
                    getFieldDecorator('image6', {
                      rules: [],
                    })(<Input placeholder="请输入游戏详情图片链接" allowClear />)
                  }
                </Form.Item>
              </>)
                : (<>
                  <Form.Item label="封面图片" style={{ width: '100%', justifyContent: "flex-start", margin: "0 0 0 10px" }}>
                    {
                      getFieldDecorator('image_cover', {
                        rules: [],
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
              <Button type="primary" onClick={handleSubmit}>提交</Button>
              <Button type="primary" onClick={handleReset}>重置</Button>
            </div>
          </Form>
        </div>
      </AdminLayout>
    </div>
  );
};

// const mapStateToProps = ({ user }) => {
//   return {
//     userInfo: user.userInfo
//   };
// };

// const mapDispathToProps = ({ user }) => {
//   return {
//     getUserInfo: user.getUserInfo
//   };
// };
export default Form.create({ name: 'addform' })(Admin);
