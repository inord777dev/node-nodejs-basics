import { access } from 'fs/promises';
import path from 'path';
import { constants, createReadStream } from 'fs';
import { fileURLToPath } from 'url';

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

export const read = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(wd, 'files', 'fileToRead.txt');

  if (! await exists(file)) {
    throw new Error('FS operation failed');
  }

  const rs = createReadStream(file).pipe(process.stdout);
};

read();