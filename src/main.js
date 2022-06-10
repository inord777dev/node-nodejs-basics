import process from 'process';
import os from 'os';
import readline from 'readline';
import { fullPath } from './helper/helper.fs.js';
import { OPERATION_FAILED, INVALID_INPUT } from './helper/helper.msg.js';
import { list } from './fs/list.js';
import { cd } from './fs/cd.js';
import { up } from './fs/up.js';
import { read } from './fs/read.js';
import { create } from './fs/create.js';
import { rn } from './fs/rename.js';
import { copy } from './fs/copy.js';
import { move } from './fs/move.js';
import { remove } from './fs/delete.js';
import { calculateHash } from './hash/calcHash.js';

const main = async (args) => {
  const ARG_USERNAME = 'USERNAME';
  const ANONYMOUS = `Anonymous`;

  const userNameIndex = args.findIndex((arg) =>
    arg.toUpperCase().startsWith(`--${ARG_USERNAME}=`)
  );

  let userName = ANONYMOUS;

  if (userNameIndex > -1) {
    const argValues = args[userNameIndex].split('=');
    if (argValues.length === 2) {
      userName = argValues[1].trim();
    }
  }

  const close = () => {
    console.log(`Thank you for using File Manager, ${userName}!`);
    process.exit();
  };

  console.log(`Welcome to the File Manager, ${userName}!`);

  let currentDir = '.';
  try {
    currentDir = os.homedir();
  } catch (error) {
    console.log(error);
  }

  var rl = readline.createInterface(process.stdin, process.stdout);

  const prompt = () => {
    console.log(os.EOL + `You are currently in ${currentDir}`);
    rl.prompt();
  };

  const exec = async (matches) => {
    const command = matches[0];
    const params = matches.slice(1);
    try {
      if (command === 'up') {
        if (params.length !== 0) {
          console.log(INVALID_INPUT);
          return;
        }
        currentDir = await up(currentDir);
      } else if (command === 'cd') {
        if (params.length !== 1) {
          console.log(INVALID_INPUT);
          return;
        }
        currentDir = await cd(fullPath(currentDir, params[0]));
      } else if (command === 'ls') {
        if (params.length !== 0) {
          console.log(INVALID_INPUT);
          return;
        }
        await list(currentDir);
      } else if (command === 'cat') {
        if (params.length !== 1) {
          console.log(INVALID_INPUT);
          return;
        }
        await read(fullPath(currentDir, params[0]));
      } else if (command === 'add') {
        if (params.length !== 1) {
          console.log(INVALID_INPUT);
          return;
        }
        await create(fullPath(currentDir, params[0]));
      } else if (command === 'rn') {
        if (params.length !== 2) {
          console.log(INVALID_INPUT);
          return;
        }
        await rn(
          fullPath(currentDir, params[0]),
          fullPath(currentDir, params[1])
        );
      } else if (command === 'cp') {
        if (params.length !== 2) {
          console.log(INVALID_INPUT);
          return;
        }
        await copy(
          fullPath(currentDir, params[0]),
          fullPath(currentDir, params[1])
        );
      } else if (command === 'mv') {
        if (params.length !== 2) {
          console.log(INVALID_INPUT);
          return;
        }
        await move(
          fullPath(currentDir, params[0]),
          fullPath(currentDir, params[1])
        );
      } else if (command === 'rm') {
        if (params.length !== 1) {
          console.log(INVALID_INPUT);
          return;
        }
        await remove(fullPath(currentDir, params[0]));
      } else if (command === 'hash') {
        if (params.length !== 1) {
          console.log(INVALID_INPUT);
          return;
        }
        await calculateHash(fullPath(currentDir, params[0]));
      } else if (command === 'exit' || command === '.exit') {
        if (params.length !== 0) {
          console.log(INVALID_INPUT);
          return;
        }
        close();
      } else {
        console.log(INVALID_INPUT);
      }
    } catch (error) {
      console.log(OPERATION_FAILED);
    }
  };

  prompt();

  rl.on('line', async (input) => {
    const matches = input.match(/[^\s]+/g);
    if (matches.length) {
      await exec(matches);
    }
    prompt();
  });

  rl.on('SIGINT', () => {
    close();
  });
};

main(process.argv.slice(2));
