import { access } from 'fs/promises';
import path from 'path';
import { constants, createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const hash = createHash('sha256');

const exists = async (dir) => {
  let result = false;
  try {
    await access(dir, constants.F_OK);
    result = true;
  }
  catch {
  }
  return result;
}

export const calculateHash = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(wd, 'files', 'fileToCalculateHashFor.txt');

  if (! await exists(file)) {
    throw new Error('FS operation failed');
  }

  const input = createReadStream(file);
  input.on('readable', () => {
    const data = input.read();
    if (data)
      hash.update(data);
    else {
      console.log(hash.digest('hex'));
    }
  });
};

calculateHash();