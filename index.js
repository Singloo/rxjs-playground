/*
 * File: /Users/origami/Desktop/rxjs-playground/index.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday July 11th 2019 3:20:44 pm
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
  repeatWhen,
  repeat,
} = require('rxjs/operators');
const subjct = new Subject();
const TAP = (x = '') => tap(n => console.log(x, n));
const randomNumber = (n, m) => {
  const c = m - n + 1;
  return Math.floor(Math.random() * c + n);
};
const normalPromise = (v, time) =>
  new Promise(resolve =>
    setTimeout(() => resolve(v), time || randomNumber(800, 2000)),
  );
const normalCurryingPromise = (v, time) => () =>
  new Promise(resolve =>
    setTimeout(() => resolve(v), time || randomNumber(800, 1500)),
  );
const normalRejectPromise = (v, time) =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject(v), time || randomNumber(800, 1500)),
  );
const normalCurryingRejectPromise = (v, time) => () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject(v), time || randomNumber(800, 1500)),
  );
const LOG = log => (...logs) => console.log(log, ...logs);
let START;
const LOG_TIME = (...logs) => {
  if (!START) {
    START = Date.now();
    console.log('start', ...logs);
  } else {
    console.log(((Date.now() - START) / 1000).toFixed(2) + 's ', ...logs);
  }
};
const SUBSCRIBE = (next, complete, error) => ({
  next: next || LOG('NEXT'),
  error: error || LOG('ERROR'),
  complete:
    complete ||
    function() {
      console.log('COMPLETE');
    },
});

timer(500)
  .pipe(
    catchError(err => {
      console.warn('cathed', err);
      return empty();
    }),
    switchMap(() => normalRejectPromise(1)),
  )
  .subscribe(SUBSCRIBE());
