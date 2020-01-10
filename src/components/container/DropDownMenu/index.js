/* eslint-disable react/prop-types */
/**
 * 下组件
 *
 * */
import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import { login as loginServices } from '-/services';
// import { requestErrorHandler } from '../../../utils';

// import { AUTH_TOKEN, USERNAME, SSO_TOKEN } from '-/constants';

import styles from './index.module.scss';

const DropDownMenu = (props) => {
  // const { userUserInfo } = props;

  const handleLoginOut = async () => {
  //   const authToken = localStorage.getItem([AUTH_TOKEN]);
  //   const ssoToken = localStorage.getItem([SSO_TOKEN]);
  //   if (authToken || !ssoToken) {
  //     localStorage.removeItem([AUTH_TOKEN]);
  //     localStorage.removeItem([USERNAME]);
  //     props.history.push('/');
  //     window.location.reload();
  //   } else {
  //     try {
  //       const { code, data } = await loginServices.ssoLogOut({
  //         token: ssoToken,
  //       });
  //       if (code * 1 === 200) {
  //         localStorage.removeItem([SSO_TOKEN]);
  //         localStorage.removeItem([USERNAME]);
  //         window.location = data.loginUrl;
  //       }
  //     } catch (e) {
  //       requestErrorHandler(e);
  //     }
  //   }
  };

  // const handleChangePwd = () => {
  //   props.history.push('/updatepass');
  // };

  const renderDropDownMenu = () => {
    return (
      <Menu style={{ textAlign: 'center' }}>
        <Menu.Item key="0" onClick={handleLoginOut}>
          退出
        </Menu.Item>
        {/* <Menu.Item key="1" onClick={handleChangePwd}>
          修改密码
        </Menu.Item> */}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={ renderDropDownMenu() }>
      <span className={styles.dropdownLink}>
        欢迎您：'ljh' <Icon type="down"/>
      </span>
    </Dropdown>
  );
};

// const mapStateToProps = ({ common }) => {
//   return {
//     userUserInfo: common.userInfo,
//   };
// };

// const mapDispathToProps = ({ common }) => {
//   return {
//     initSystemData: common.initSystemData,
//   };
// };

// export default connect(mapStateToProps, mapDispathToProps)(withRouter(DropDownMenu));
export default withRouter(DropDownMenu);