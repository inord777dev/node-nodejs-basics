import path from 'path';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { access, rm } from 'fs/promises';

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

export const remove = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(wd, 'files', 'fileToRemove.txt');

  if (! await exists(file)) {
    throw new Error('FS operation failed');
  }

  try {
    await rm(file, {maxRetries: 5});
    console.log('Performed successfully');
  }
  catch(err) {
    console.error(err);
  }
};

remove();