import path from 'path';
import { isExist } from '../helper/helper.fs.js';
import { OPERATION_FAILED } from '../helper/helper.msg.js';
import { copyFile } from 'fs/promises';

export const copy = async (src, dir) => {
  if (!(await isExist(src)) || !(await isExist(dir))) {
    throw new Error(OPERATION_FAILED);
  }

  await copyFile(src, path.join(dir, path.basename(src)));
};
