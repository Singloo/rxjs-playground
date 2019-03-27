/*
 * File: /Users/origami/Desktop/rxjs-playground/index.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Wednesday March 27th 2019 2:58:01 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const {
  from,
  of,
  Subject,
  merge,
  forkJoin,
  race,
  concat,
  zip,
  interval,
  timer,
} = require('rxjs');
const {
  switchMap,
  concatMap,
  tap,
  catchError,
  map,
  mergeAll,
  mapTo,
  mergeMap,
  multicast,
  share,
  bufferCount,
  toArray,
  take,
} = require('rxjs/operators');
const randomNumber = (n, m) => {
  const c = m - n + 1;
  return parseInt(Math.random() * c + n, 10);
};
const normalPromise = v =>
  new Promise(resolve =>
    setTimeout(() => resolve(v || 'resolve'), randomNumber(500, 3000)),
  );
const normalRejectPromise = v =>
  new Promise((resolve, reject) => setTimeout(() => reject('reject'), 100));
const LOG = log => (...logs) => console.log(log, ...logs);
const SUBSCRIBE = (next, complete, error) => ({
  next: next || LOG('next'),
  error: error || LOG('error'),
  complete: complete || LOG('complete'),
});

// const arrOfPromises = [];
// for (let i = 0; i < 100; i++) {
//   arrOfPromises.push(normalPromise(i + 1));
// }
// console.warn(arrOfPromises.length);
const source1 = interval(1000);
const source2 = interval(2000);
zip(source1, source2).subscribe(x => console.warn('zip', x));
forkJoin(source1.pipe(take(2)), source2.pipe(take(2))).subscribe(x =>
  console.warn('forkJoin', x),
);
