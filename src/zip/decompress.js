import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';

export const decompress = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(wd, 'files', 'fileToCompress.txt.gz');

  const gunzip = createGunzip();
  const source = createReadStream(file);
  const destination = createWriteStream(file.replace('.gz', ''));

  try {
    await pipeline(source, gunzip, destination);
    console.log('Performed successfully');
  }
  catch(err)
  {
    throw new Error('FS operation failed', err)
  }
};

decompress();