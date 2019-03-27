/*
 * File: /Users/origami/Desktop/rxjs-playground/index.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Wednesday March 27th 2019 12:03:22 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const { from, of, Subject, merge, forkJoin, race, concat } = require('rxjs');
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
} = require('rxjs/operators');
const randomNumber = (n, m) => {
  const c = m - n + 1;
  return parseInt(Math.random() * c + n, 10);
};
const normalPromise = v => () =>
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

const arrOfPromises = [];
for (let i = 0; i < 100; i++) {
  arrOfPromises.push(normalPromise(i + 1));
}
console.warn(arrOfPromises.length);
from(arrOfPromises)
  .pipe(
    bufferCount(10),
    concatMap(arr => {
      console.warn('arr');
      return merge(...arr.map(x => x())).pipe(toArray());
    }),
    tap(x => console.log('tap', x)),
  )
  .subscribe({
    // next: x => console.warn('nxt'),
    complete: () => {
      console.warn('compelte');
    },
  });
