import { isExist } from '../helper/helper.fs.js';
import { OPERATION_FAILED } from '../helper/helper.msg.js';

export const cd = async (dir) => {
  if (!(await isExist(dir))) {
    throw new Error(OPERATION_FAILED);
  }

  return dir;
};
