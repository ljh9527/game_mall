import service from '../../../services';
import { requestErrorHandler } from '../../../utils';

const dowload = {
  state: {
    percentComplete: '',
    game: '',
  },
  reducers: {
    setState(state, paylod) {
      return { ...state, ...paylod };
    },
  },
  effects: {
    setPercentComplete(paylod, rootState) {
      this.setState({ percentComplete: paylod });
    },
    setGame(paylod, rootState) {
      this.setState({ game: paylod });
    },
  },
};

export default dowload;
