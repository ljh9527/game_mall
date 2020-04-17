/* eslint-disable react/prop-types */
/**
 * 下组件
 *
 * */
import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import services from '../../../services';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestErrorHandler } from '../../../utils';

import styles from './index.module.scss';

const { ipcRenderer } = window.electron;
const DropDownMenu = (props) => {
  const { userAvatar, history } = props;

  const handleLoginOut = async () => {
    let time = new Date().getTime();
    let email = localStorage.getItem("EMAIL");
    const params = {
      time: time,
      email: email
    }
    // 发送请求
    try {
      // 发送请求
      const { data } = await services.updateUserInfo(params);
      if (data.code === 200) {
        console.log(data);
      }
    } catch (error) {
      requestErrorHandler(error);
    }
    ipcRenderer.send('loginOut');
    localStorage.removeItem('EMAIL');
    history.push('/');
  };


  const handleToMyGame = () => {
    history.push('/myGame/index');
  };


  const renderDropDownMenu = () => {
    return (
      <Menu style={{ textAlign: 'center' }}>
        <Menu.Item key="0" onClick={handleToMyGame}>
          我的应用
        </Menu.Item>
        <Menu.Item key="5" onClick={handleLoginOut}>
          退出当前账号
        </Menu.Item>
        {/* <Menu.Item key="1" onClick={handleChangePwd}>
          修改密码
        </Menu.Item> */}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={renderDropDownMenu()}>
      <span className={styles.dropdownLink}>
        <div className={styles.avatar}>
          <img src={userAvatar} alt='imgUrl' />
          <Icon type="down" />
        </div>
      </span>
    </Dropdown>
  );
};

const mapStateToProps = ({ common }) => {
  return {
    userUserInfo: common.userInfo,
  };
};

// const mapDispathToProps = ({ common }) => {
//   return {
//     initSystemData: common.initSystemData,
//   };
// };

export default connect(mapStateToProps)(withRouter(DropDownMenu));