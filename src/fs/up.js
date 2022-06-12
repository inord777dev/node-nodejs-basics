import path from 'path';

export const up = async (currentDir) => {
  return path.dirname(currentDir);
};
