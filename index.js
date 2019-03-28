/*
 * File: /Users/origami/Desktop/rxjs-playground/index.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday March 28th 2019 1:01:12 pm
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
const normalPromise = v => () =>
  new Promise(resolve =>
    setTimeout(() => resolve(v || 'resolve'), randomNumber(500, 1000)),
  );
const normalRejectPromise = v =>
  new Promise((resolve, reject) => setTimeout(() => reject('reject'), 100));
const LOG = log => (...logs) => console.log(log, ...logs);
const SUBSCRIBE = (next, complete, error) => ({
  next: next || LOG('next'),
  error: error || LOG('error'),
  complete: complete || LOG('complete'),
});

const arrOfPromises = [];
for (let i = 0; i < 100; i++) {
  arrOfPromises.push(normalPromise(i + 1));
}
console.warn(arrOfPromises.length);
const source1 = interval(1000);
const source2 = interval(2000);
from(arrOfPromises)
  .pipe(
    bufferCount(5),
    concatMap(promss => merge(...promss.map(o => o())).pipe(toArray())),
  )
  .subscribe(x => console.warn(x));
