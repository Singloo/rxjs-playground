/*
 * File: /Users/origami/Desktop/rxjs-playground/index.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday June 6th 2019 1:07:59 pm
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
const SUBSCRIBE = (next, complete, error) => ({
  next: next || LOG('next'),
  error: error || LOG('error'),
  complete: complete || LOG('complete'),
});
const arrOfPromises = [];
for (let i = 0; i < 10; i++) {
  if (Math.random() > 0.7) {
    arrOfPromises.push(normalRejectPromise(i));
  } else {
    arrOfPromises.push(normalCurryingPromise(i));
  }
}
// from([1, 2, 3, 4, 5, 6])
//   .pipe(
//     concatMap(o => of(o).pipe(delay(800 + randomNumber(100, 500)))),
//     TAP(),
//     switchMap((o, index) => {
//       return of(o).pipe(delay(1000));
//     }),
//     TAP(),
//   )
//   .subscribe(SUBSCRIBE());

// subjct.subscribe(SUBSCRIBE());
const obs1 = merge(normalPromise(2), normalPromise(3)).pipe(
  toArray(),
  map(([v1, v2]) => [v1 > 2, v2 > 2]),
);

from(obs1).subscribe(SUBSCRIBE());
