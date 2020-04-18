import services from '../../../services';
import { requestErrorHandler } from '../../../utils';

const usergame = {
  state: {
    myGameList: [],
    myGameDetail: {},
  },
  reducers: {
    setState(state, paylod) {
      return { ...state, ...paylod };
    },
  },
  effects: {
    async getMyGameList(paylod, rootState) {
        try {
          const { data } = await services.getMyGame(paylod);
          if (data.code === 200) {
            this.setState({ myGameList: data.data});
          } else {
          };
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    async getMyGameDetail(paylod, rootState) {
        try {
          const { data } = await services.getMyGameDetail(paylod);
          if (data.code === 200) {
            this.setState({ myGameDetail: data.data});
          } else {
          };
        } catch (error) {
            requestErrorHandler(error);
        }
    }
  },
};

export default usergame;
