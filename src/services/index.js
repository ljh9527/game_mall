import axios from 'axios';
const service = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 500000,
});

export default {
    // 注册账号
    addAccount(params) {
        return service.post('/users/register', params);
    },
    // 登录账号
    login(params) {
        return service.post('/user/login', params);
    },
};
