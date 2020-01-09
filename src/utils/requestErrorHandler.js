/**
 * 错误处理函数
 *
 */
import { BusinessError, NetError, CancelError } from './requestErrors';

export default function(error, config) {
  let type;
  let handler;

  if (error instanceof BusinessError) {
    type = 'business';
  } else if (error instanceof CancelError) {
    type = 'cancel';
  } else if (error instanceof NetError) {
    type = 'net';
  }

  if (!type) {
    throw error;
  }
  /* $FlowFixMe */
  handler = config && config[type];
  /* $FlowFixMe */
  handler ? handler(error) : error.defaultHandler();

  // 将此类错误上报
  if (error.shouldReport) {
    // TODO: 上报
  }
}
