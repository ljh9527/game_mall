import service from '../../../services';
import { requestErrorHandler } from '../../../utils';

const download = {
  state: {
    downloadList: [],
    percentComplete: '',
    name: '',
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
    setName(paylod, rootState) {
      this.setState({ name: paylod });
    },
    setDownloadList(paylod, rootState) {
      // console.log(rootState.download.downloadList);
      let existence = rootState.download.downloadList && rootState.download.downloadList.findIndex(item => {
        return item.id === paylod.id
      });
      // console.log(existence);
      if (existence !== -1) {
        let array = rootState.download.downloadList;
        array[existence].percentComplete = paylod.percentComplete;
        this.setState({ downloadList: array });
      } else {
        let array = rootState.download.downloadList;
        array.push(paylod);
        this.setState({ downloadList: array });
      }
    }
  },
};

export default download;
