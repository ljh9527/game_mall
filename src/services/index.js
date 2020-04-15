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
    // 校验注册验码
    checkCode(params) {
        return service.post('/user/checkCode', params);
    },
    // 获取用户信息
    getUserInfo(params) {
        return service.get('/user/info', {params});
    },
    // 验证账号是否存在
    isHasUser(params) {
        return service.post('/user/isHasUser', params);
    },
    // 更新头像
    updateUserInfo(params) {
        return service.post('/user/update', params);
    },

    // 获取首页展示数据
    getIndexGameData(params) {
        return service.get('/game/index', {params});
    },
    // 获取游戏的信息
    getGameInfo(params) {
        return service.get('/game/info', {params});
    },
    // 获取游戏的评论
    getGameComment(params) {
        return service.get('/comment/game', {params});
    },

    // 上传文件
    uploadFile: `${service.baseURL}/file/upload`,
};
