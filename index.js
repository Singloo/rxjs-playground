/*
 * File: /Users/origami/Desktop/rxjs-playground/index.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday March 25th 2019 3:04:12 pm
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
} = require('rxjs/operators');
const randomNumber = (n, m) => {
  const c = m - n + 1;
  return parseInt(Math.random() * c + n, 10);
};
const normalPromise = v =>
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

const arrOfPromises = [
  normalPromise('1'),
  normalPromise('2'),
  normalPromise('3'),
  normalPromise('4'),
];
const source = concat(...arrOfPromises).pipe(
  tap(() => console.warn('side effect')),
);
const multi = source.pipe(multicast(() => new Subject()));
source.subscribe(SUBSCRIBE(x => console.warn('11', x)));
source.subscribe(SUBSCRIBE(x => console.warn('22', x)));
source.pipe(share());
