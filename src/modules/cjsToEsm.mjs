import path from 'path';
import { readFile } from 'fs/promises';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import { fileURLToPath } from 'url';

const random = Math.random();

const __file = fileURLToPath(import.meta.url);
export let unknownObject;


readFile(path.join(path.dirname(__file), random > 0.5 ? 'files/a.json' : 'files/b.json')).then((res) => {
  unknownObject = JSON.parse(res);
});

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__file}`);
console.log(`Path to current directory is ${process.cwd()}`);

const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const cjsToEsm = {
    unknownObject,
    createMyServer,
};

export default cjsToEsm;


