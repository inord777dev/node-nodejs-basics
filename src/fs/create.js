import path from 'path';
import { appendFile } from 'fs/promises';

import { isExist, getCurrentExecInfo } from '../helper/helper.fs'
import { OPERATION_FAILED } from '../helper/helper.msg'

export const create = async (filename, text) => {
  const { dirname } = getCurrentExecInfo(import.meta);
  const filename = path.join(dirname, filename);

  if (await isExist(filename)) {
    throw new Error(OPERATION_FAILED);
  }

  await appendFile(filename, text);
};
