import { Transform } from 'stream';

export const transformStream = async () => {
  const transStream = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().trim().split('').reverse().join('') + '\n');
      callback();
    }
  });

  console.log('Type text, press Ctrl + C to terminate:');

  process.stdin.pipe(transStream).pipe(process.stdout);
};

transformStream();