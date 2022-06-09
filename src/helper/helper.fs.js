import { access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { constants } from 'fs';

export const getCurrentExecInfo = (importMeta) => {
  const filename = fileURLToPath(importMeta.url);
  const dirname = path.dirname(__filename);

  return {
    dirname,
    filename
  };
}; 

export const isExist = async (path) => {
  let result = false;
  try {
    await access(path, constants.F_OK);
    result = true;
  }
  catch {
  }
  return result;
}

