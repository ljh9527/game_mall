import axios from 'axios';
import { requestUrl } from '../config';

const service = axios.create({
    baseURL: requestUrl,
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
        return service.get('/user/info', { params });
    },
    // 验证账号是否存在
    isHasUser(params) {
        return service.post('/user/isHasUser', params);
    },
    // 更新信息
    updateUserInfo(params) {
        return service.post('/user/update', params);
    },
    // // 登录账号
    // loginOut(params) {
    //     return service.post('/user/loginout', params);
    // },

    // 获取首页展示数据
    // getIndexGameData(params) {
    //     return service.get('/game/index', { params });
    // },
    // 获取游戏的信息
    getGameInfo(params) {
        return service.get('/game/info', { params });
    },
    // 获取首页展示数据列表
    getIndexGameList(params) {
        return service.get('/game/index/type', { params });
    },
    // 获取首页游戏下拉框列表
    getAllGame(params) {
        return service.post('/game/listall', params);
    },

    // 获取游戏的评论
    getGameComment(params) {
        return service.get('/comment/game', { params });
    },
    // 获取用户游戏评论
    getUserComment(params) {
        return service.post('/comment/user', params );
    },
    // 删除用户游戏评论
    deleteUserComment(params) {
        return service.post('/comment/delete', params );
    },
    // 添加用户游戏评论
    addComment(params) {
        return service.post('/comment/add', params );
    },
    // 追加用户游戏评论
    appendComment(params) {
        return service.post('/comment/append', params );
    },

    // 获取游戏列表 
    getGameList(params) {
        return service.post('/game/list', params );
    },
    // 获取搜索的游戏
    getSearchGame(params) {
        return service.post('/game/name', params );
    },
    addGame(params) {
        return service.post("/game/add", params);
    },

    // 搜索我的的游戏
    getMyGame(params) {
        return service.get('/usergame/mygame', {params} );
    },
    // 搜索我的游戏详情
    getMyGameDetail(params) {
        return service.get('/usergame/mygame/detail', {params} );
    },
    // 添加到我的游戏
    addMyGame(params) {
        return service.post('/usergame/game/add', params );
    },
    // 更新游戏时间
    updateOpenTime(params) {
        return service.post('/usergame/updateTime', params );
    },
    // 更新游戏状态
    updateStatus(params) {
        return service.post('/usergame/updateStatus', params );
    },

    // 添加到购物车 
    addGameCart(params) {
        return service.post('/cart/add', params );
    },
    // 获取购物车信息
    getCartList(params) {
        return service.get('/cart/list', {params} );
    },
    // 删除购物车
    deleteCart(params) {
        return service.post('/cart/delete', params );
    },

    // 获取购物车信息
    pay(params) {
        return service.post('/pay', params );
    },

    // 添加订单
    addOrder(params) {
        return service.post('/order/add', params );
    },
    // 获取订单列表
    getOrderList(params) {
        return service.get('/order/list', {params} );
    },

    // 上传文件
    uploadFile: `http://localhost:9000/fileUpload`,
};
