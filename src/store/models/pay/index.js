// import service from '../../../services';
// import { requestErrorHandler } from '../../../utils';

const pay = {
  state: {
    order: {
      out_trade_no: '',
      total_amount: '',
      subject: '',
      body: ''
    },
    gameid: [],
  },
  reducers: {
    setState(state, paylod) {
      return { ...state, ...paylod };
    },
  },
  effects: {
    setOrder(paylod, rootState) {
      // console.log(paylod);
      this.setState({ order: paylod });
    },
    setGameid(paylod, rootState) {
      // console.log(paylod);
      this.setState({ gameid: paylod });
    },
  },
};

export default pay;
