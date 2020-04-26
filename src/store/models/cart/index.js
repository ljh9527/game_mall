import service from '../../../services';
import { requestErrorHandler } from '../../../utils';

const cart = {
  state: {
    count: '',
    cartGameList: [],
  },
  reducers: {
    setState(state, paylod) {
      return { ...state, ...paylod };
    },
  },
  effects: {
    async getCartList(paylod, rootState) {
      console.log(paylod);
      try {
        const { data } = await service.getCartList(paylod);
        this.setState({ cartGameList: data.data, count: data.data.length });
      } catch (e) {
        requestErrorHandler(e);
      }
    },
  },
};

export default cart;
