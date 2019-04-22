/*
 * File: /Users/origami/Desktop/rxjs-playground/index.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday April 22nd 2019 12:45:08 pm
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
  filter,
} = require('rxjs/operators');
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
const source1 = interval(1000);
const source2 = interval(2000);
let time = Date.now();
merge(
  normalPromise(2),
  new Promise(resolve => setTimeout(() => resolve(), randomNumber(800, 2000))),
).subscribe(SUBSCRIBE());
