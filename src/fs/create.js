import { open } from 'fs/promises';

export const create = async (file) => {
  await open(file, 'wx');
};
