/*
 * File: /Users/origami/Desktop/rxjs-playground/index.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Thursday March 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday March 25th 2019 8:16:01 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const { from, of, Subject } = require('rxjs');
const {
  switchMap,
  concatMap,
  tap,
  catchError,
  map,
  mergeAll,
  mapTo,
} = require('rxjs/operators');
const normalPromise = () => new Promise(resolve => setTimeout(resolve, 1000));
const normalRejectPromise = () =>
  new Promise((resolve, reject) => setTimeout(reject, 100));

of(1)
  .pipe(
    switchMap(x => {
      const next = [];
      next.push(of({}));
      next.push(of({}));
      next.push(from(normalPromise()).pipe(map(_ => 'cccc')));
      return next;
    }),
    mergeAll(),
  )
  .subscribe(x => console.warn('ne0', x));
