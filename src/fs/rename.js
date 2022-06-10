import { rename } from 'fs/promises';
import { isExist } from '../helper/helper.fs.js';
import { OPERATION_FAILED } from '../helper/helper.msg.js';

export const rn = async (src, desc) => {
  if (!(await isExist(src))) {
    throw new Error(OPERATION_FAILED);
  }

  if (await isExist(desc)) {
    throw new Error(OPERATION_FAILED);
  }

  await rename(src, desc);
};
