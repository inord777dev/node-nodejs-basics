import os from 'os';

const eol = () => {
  console.log(JSON.stringify(os.EOL));
};

const cpus = () => {
  console.log(os.cpus());
};

const homedir = () => {
  console.log(os.homedir());
};

const username = () => {
  console.log(os.userInfo().username);
};

const arh = () => {
  console.log(os.arch());
};

export default {
  eol,
  cpus,
  homedir,
  username,
  arh,
};
