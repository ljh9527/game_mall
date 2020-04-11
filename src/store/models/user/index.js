import service from '../../../services';
import { requestErrorHandler } from '../../../utils';

const userInfo = {
  id: '',
  nickname: '',
  email: '',
  avatar: '',
  introduction: '',
};

const user = {
  state: {
    userInfo: userInfo,
  },
  reducers: {
    setState(state, paylod) {
      return { ...state, ...paylod };
    },
  },
  effects: {
    async getUserInfo(paylod, rootState) {
      console.log(paylod);
      try {
        const { data } = await service.getUserInfo(paylod);
        this.setState({ userInfo: data.data });
      } catch (e) {
        requestErrorHandler(e);
      }
    },
  },
};

export default user;
