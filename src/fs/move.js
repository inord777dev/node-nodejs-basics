import path from 'path';
import { isExist } from '../helper/helper.fs.js';
import { OPERATION_FAILED } from '../helper/helper.msg.js';
import { rn } from './rename.js';

export const move = async (src, dir) => {
  if (!(await isExist(src)) || !(await isExist(dir))) {
    throw new Error(OPERATION_FAILED);
  }

  await rn(src, path.join(dir, path.basename(src)));
};
