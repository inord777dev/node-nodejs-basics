import { fork } from 'child_process'
import path from 'path';
import { stdout } from 'process';
import { fileURLToPath } from 'url';

export const spawnChildProcess = async (args) => {
  const wd = path.dirname(fileURLToPath(import.meta.url));
  const file = path.join(wd, 'files', 'script.js');
  const controller = new AbortController();
  const { signal } = controller;
  const cp = fork(file, args);
  console.log('Type CLOSE to terminate:');
};

spawnChildProcess(process.argv);