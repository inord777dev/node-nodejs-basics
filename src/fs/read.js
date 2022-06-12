import { readFile } from 'fs/promises';
import { isExist } from '../helper/helper.fs.js';
import { OPERATION_FAILED } from '../helper/helper.msg.js';

export const read = async (file) => {
  if (!(await isExist(file))) {
    throw new Error(OPERATION_FAILED);
  }
  console.log(await readFile(file, { encoding: 'utf8' }));
};
