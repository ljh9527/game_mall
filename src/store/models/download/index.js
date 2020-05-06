import service from '../../../services';
import { requestErrorHandler } from '../../../utils';

const download = {
  state: {
    downloadList: [],
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
    setDownloadList(paylod, rootState) {
      console.log(paylod);
      let exect = this.state.downloadList.findIndex(item => {
        return item.id === paylod.id
      });
      if (exect !== -1) {

      }else{
        this.setState({ downloadList: paylod });
      }
    }
  },
};

export default download;
