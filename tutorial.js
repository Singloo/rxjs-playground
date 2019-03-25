/*
 * File: /Users/origami/Desktop/rxjs-playground/tutorial.js
 * Project: /Users/origami/Desktop/rxjs-playground
 * Created Date: Monday March 25th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday March 25th 2019 2:30:26 pm
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
const LOG = log => (...logs) => console.log(log, ...logs);
const SUBSCRIBE = (next, complete, error) => ({
  next: next || LOG('next'),
  error: error || LOG('error'),
  complete: complete || LOG('complete'),
});
from([1, 2, 3, 4, 5]).subscribe(SUBSCRIBE());
of([1, 2, 3, 4, 5]).subscribe(SUBSCRIBE());
of(1, 2, 3, 4, 5).subscribe(SUBSCRIBE());
