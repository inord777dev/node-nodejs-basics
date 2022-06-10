import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { isExist } from '../helper/helper.fs.js';
import { OPERATION_FAILED } from '../helper/helper.msg.js';

export const calculateHash = async (file) => {
  if (!(await isExist(file))) {
    throw new Error(OPERATION_FAILED);
  }
  const hash = createHash('sha256');
  const readStream = createReadStream(file);

  const chunks = [];
  for await (const chunk of readStream) {
    hash.update(chunk);
  }

  console.log(hash.digest('hex'));
};
