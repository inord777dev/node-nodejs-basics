import path from 'path';
import {  createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

export const compress = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(wd, 'files', 'fileToCompress.txt');

  const gzip = createGzip();
  const source = createReadStream(file);
  const destination = createWriteStream(`${file}.gz`);

  try {
    await pipeline(source, gzip, destination);
    console.log('Performed successfully');
  }
  catch(err)
  {
    throw new Error('FS operation failed', err)
  }
};

compress();