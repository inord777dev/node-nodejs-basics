import path from 'path';
import { readdir } from 'fs/promises';
import { isExist } from '../helper/helper.fs.js'
import {OPERATION_FAILED} from '../helper/helper.msg.js';

export const list = async (dir) => {

  if (! await isExist(dir)) {
    throw new Error(OPERATION_FAILED);
  }

  const files = await readdir(dir, { withFileTypes: true });
  for (const file of files) {
    console.log(file.name);
  }
};
