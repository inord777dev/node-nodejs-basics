import process from 'process';
import os from 'os';
import readline from 'readline';
import { OPERATION_FAILED, INVALID_INPUT } from './helper/helper.msg.js';
import { list } from './fs/list.js';

const main = async (args) => {
  const ARG_USERNAME = 'USERNAME';
  const ANONYMOUS = `Anonymous`;

  const userNameIndex = args.findIndex((arg) =>
    arg.toUpperCase().startsWith(`--${ARG_USERNAME}=`)
  );

  let userName = ANONYMOUS;

  if (userNameIndex > -1) {
    const argValues = args[userNameIndex].spite('=');
    if (argValues.length === 2) {
      userName = argValues[2].trim();
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
    try {
      if (command === 'ls') {
        if (matches.length > 1) {
          console.log(INVALID_INPUT);
          return;
        }
        await list(currentDir);
      } else if (command === 'exit' || command === '.exit') {
        if (matches.length > 1) {
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
    const matches = input.match(/\w+/g);
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
