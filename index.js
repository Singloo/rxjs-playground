/*
 * File: /Users/origami/Desktop/rxjs-playground/index.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday July 11th 2019 2:57:58 pm
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
  throwError,
  empty,
  range,
} = require('rxjs');
const {
  throttle,
  throttleTime,
  debounceTime,
  debounce,
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
  filter,
  pluck,
  delay,
  startWith,
  concatAll,
  takeUntil,
  takeWhile,
} = require('rxjs/operators');
const subjct = new Subject();
const TAP = (x = '') => tap(n => console.log(x + n));
const randomNumber = (n, m) => {
  const c = m - n + 1;
  return parseInt(Math.random() * c + n, 10);
};
const normalPromise = v =>
  new Promise(resolve =>
    setTimeout(() => resolve(v || 'resolve'), randomNumber(800, 2000)),
  );
const normalCurryingPromise = v => () =>
  new Promise(resolve =>
    setTimeout(() => resolve(v || 'resolve'), randomNumber(800, 1500)),
  );
const normalRejectPromise = v => () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject(v || 'reject'), randomNumber(800, 1500)),
  );
const LOG = log => (...logs) => console.log(log, ...logs);
let START;
const LOG_TIME = (...logs) => {
  if (!START) {
    START = Date.now();
    console.log(...logs);
  } else {
    console.log(((Date.now() - START) / 1000).toFixed(2) + 's ', ...logs);
  }
};
const SUBSCRIBE = (next, complete, error) => ({
  next: next || LOG('next'),
  error: error || LOG('error'),
  complete: complete || LOG('complete'),
});
const arrOfPromises = [];
for (let i = 0; i < 50; i++) {
  // if (Math.random() > 0.7) {
  // arrOfPromises.push(normalRejectPromise(i));
  // } else {
  arrOfPromises.push(normalCurryingPromise(i));
  // }
}

from(arrOfPromises)
  .pipe(
    bufferCount(5),
    concatMap(val => forkJoin(...val.map(o => o()))),
    tap(x => console.log(x)),
    toArray(),
    map(x=>x.flat())
  )
  .subscribe(SUBSCRIBE());
