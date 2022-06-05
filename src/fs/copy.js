import path from 'path';
import { constants } from 'fs';
import { fileURLToPath } from 'url';
import { access, readdir, copyFile, mkdir } from 'fs/promises';

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

export const copy = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));

  const src = path.join(wd, 'files');
  if (! await exists(src)) {
    throw new Error('FS operation failed');
  }

  const desc = path.join(wd, 'files_copy');
  if (await exists(desc)) {
    throw new Error('FS operation failed');
  }

  try {
    await mkdir(desc);
    const files = await readdir(src, { withFileTypes: true });
    for (const file of files) {
      await copyFile(path.join(src, file.name), path.join(desc, file.name));
    }
    console.log('Performed successfully');
  } catch (err) {
    console.error(err);
  }
};

copy();