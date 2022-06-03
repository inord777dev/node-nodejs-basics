import { Transform } from 'stream';
import { EOL } from 'os';

export const transformStream = async () => {
  const transStream = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().trim().split('').reverse().join('') + EOL);
      callback();
    }
  });

  console.log('Type text, press Ctrl + C to terminate:');

  process.stdin.pipe(transStream).pipe(process.stdout);
};

transformStream();