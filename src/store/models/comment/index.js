import services from '../../../services';
import { requestErrorHandler } from '../../../utils';

const user = {
  state: {
    comment: [],
    commentRecommend: [],
    commentUnRecommend: [],
    recommendRate: ''
  },
  reducers: {
    setState(state, paylod) {
      return { ...state, ...paylod };
    },
  },
  effects: {
    async getGameComment(paylod, rootState) {
      // 发送请求
      try {
        // 发送请求
        const { data } = await services.getGameComment({ id:paylod });
        if (data.code === 200) {

          let recommend = data.data.filter((item) => {
            return item.recommendstatu === 0;
          });

          let unrecommend = data.data.filter((item) => {
            return item.recommendstatu === 1;
          });
          this.setState({ comment: data.data, commentRecommend: recommend, commentUnRecommend: unrecommend, recommendRate: recommend.length*100/data.data.length});
        }
      } catch (error) {
        requestErrorHandler(error);
      }
    },
  },
};

export default user;
