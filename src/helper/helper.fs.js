import { access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const getCurrentExecInfo = (importMeta) => {
  const filename = fileURLToPath(importMeta.url);
  const dirname = path.dirname(__filename);

  return {
    dirname,
    filename,
  };
};

export const isExist = async (path) => {
  let result = false;
  try {
    await access(path);
    result = true;
  } catch {}
  return result;
};

export const fullPath = (dir, segment) => {
  return path.isAbsolute(segment) ? segment : path.join(dir, segment);
};
