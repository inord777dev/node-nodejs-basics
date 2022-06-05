import {workerData, parentPort } from 'worker_threads';

// n should be received from main thread
export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = (val) => {
  let data = null;
  let status = 'error';;
  try {
    data = nthFibonacci(val);
    status = 'resolved';
  }
  catch  {
    status = 'error';
  }
  
  parentPort.postMessage({ status, data });
};

sendResult(workerData);