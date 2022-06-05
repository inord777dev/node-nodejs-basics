import { env } from 'process';

export const parseEnv = () => {
  const result = [];
  for (let x in env) {
    if (x.startsWith('RSS_')) {
      result.push(`${x}=${env[x]}`);
    }
  }
  console.log(result.length > 0 ? result.join('; ') : 'No RSS_ variables' );
};

parseEnv();