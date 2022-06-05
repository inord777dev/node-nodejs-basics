import path from 'path';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { access, rename } from 'fs/promises';

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

export const renameFile = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));

  const src = path.join(wd, 'files', 'wrongFilename.txt');
  if (! await exists(src)) {
    throw new Error('FS operation failed');
  }

  const desc = path.join(wd, 'files', 'properFilename.md');
  if (await exists(desc)) {
    throw new Error('FS operation failed');
  }

  try {
    await rename(src, desc);
    console.log('Performed successfully');
  } catch (err) {
    console.error(err);
  }
};

renameFile();