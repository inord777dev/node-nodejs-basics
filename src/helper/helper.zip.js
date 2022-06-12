import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';

export const compress = async (file, dir) => {
  const gzip = createGzip();
  const source = createReadStream(file);
  const destination = createWriteStream(
    path.join(dir, `${path.basename(file)}.gz`)
  );

  await pipeline(source, gzip, destination);
};

export const decompress = async (file, dir) => {
  const gunzip = createGunzip();
  const source = createReadStream(file);
  const destination = createWriteStream(
    path.join(dir, path.basename(file).replace('.gz', ''))
  );

  await pipeline(source, gunzip, destination);
};
