import { access } from 'fs/promises';
import path from 'path';
import { constants, createWriteStream } from 'fs';
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

export const write = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(wd, 'files', 'fileToWrite.txt');

  if (! await exists(file)) {
    throw new Error('FS operation failed');
  }

  console.log('Type text, press Ctrl + C for terminate:');

  const ws = createWriteStream(file);
  process.stdin.pipe(ws).on('end', () => process.exit());
};

write();