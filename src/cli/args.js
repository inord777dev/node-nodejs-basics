import { argv } from 'process';

export const parseArgs = () => {
  const result = [];
  argv.forEach((val, index) => {
    if (index > 1) {
      if (index % 2) {
        result.push(`${result.pop()} is ${val}`);
      } else {
        result.push(`${argv[index].replace(/^--/g, '')}`);
      }
    }
  });
  console.log(result.length > 0 ? result.join(', ') : 'No args' );
};

parseArgs();