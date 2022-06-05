import path from 'path';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { access, readFile } from 'fs/promises';

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

  try {
    console.log(await readFile(file, { encoding: 'utf8' }));
  }
  catch(err) {
    console.error(err);
  }
};

read();