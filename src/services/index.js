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
    // 注册验码
    verificationCode(params) {
        return service.post('/user/verificationCode', params);
    },
    // 测试
    hello(params) {
        return service.get('/user/hello');
    },
};
