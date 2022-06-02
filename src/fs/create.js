import { access, appendFile } from 'fs/promises';
import path from 'path';
import { constants } from 'fs';
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

export const create = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(wd, 'files', 'fresh.txt');

  if (await exists(file)) {
    throw new Error('FS operation failed');
  }

  try {
    appendFile(file, 'I am fresh and young');
    console.log('Performed successfully');
  }
  catch(err) {
    console.error(err);
  }
};

create();