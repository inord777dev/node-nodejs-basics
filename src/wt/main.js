import { cpus } from 'os';
import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

export const performCalculations = async () => {
  const wd = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(wd, 'worker.js');

  const result = [];

  for (let i = 0; i < cpus().length; i++) {
    result.push(null);
    const worker = new Worker(file, { workerData: 10 + i });
    worker.once('message', (message) => {
      result[i] = message;
    });
  }

  process.on('beforeExit', ()=> {
    console.dir(result);
  });
};

performCalculations();