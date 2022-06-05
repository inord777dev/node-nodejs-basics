import path from 'path';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { access, readdir } from 'fs/promises';

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

export const list = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));

  const src = path.join(wd, 'files');
  if (! await exists(src)) {
    throw new Error('FS operation failed');
  }

  try {
    const files = await readdir(src, { withFileTypes: true });
    for (const file of files) {
      console.log(file.name);
    }
  } catch (err) {
    console.error(err);
  }
};

list();