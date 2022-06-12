import { rm } from 'fs/promises';

export const remove = async (file) => {
  await rm(file, { maxRetries: 5 });
};
