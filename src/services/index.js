import axios from 'axios';
const service = axios.create({
    baseURL: 'http://localhost:9000',
    timeout: 500000,
});

export default {
    // 注册账号
    addAccount(params) {
        return service.post('/user/register', params);
    },
    // 登录账号
    login(params) {
        return service.post('/user/login', params);
    },
    // 重置账号密码
    resetPassword(params) {
        return service.post('/user/resetPassword', params);
    },
    // 获取注册验码
    verificationCode(params) {
        return service.post('/user/verificationCode', params);
    },
    getUserInfo(params) {
        return service.get('/user/info', {params});
    },
    // 测试
    isHasUser(params) {
        return service.post('/user/isHasUser', params);
    },
};
