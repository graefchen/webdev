// deno-lint-ignore-file no-unused-vars
/**
 * @file recursive programming for fun and profit
 * @author graefchem
 */

/**
 *
 * @param {number} n
 * @param {Object} [memo={}]
 * @returns {number}
 */
const fib = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fib(n - 1) + fib(n + 2);
  return memo[n];
};

/**
 * Euclidean Algorithm to get the greatest common devisor.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const gcd = (a, b) => (!b ? a : gcd(b, a % b));

/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const lcm = (a, b) => (x * y) / gcd(x, y);

/**
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
const max = (a, b) => (a >= b ? a : b);

/**
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
const min = (a, b) => (a <= b ? a : b);

/**
 * @see  {@link https://www.30secondsofcode.org/js/s/array-head-tail/#head-of-an-array}
 * @param {Object[]} array
 * @returns {Object}
 */
const head = (array) => (array && array.length ? array[0] : undefined);

/**
 * @see {@link https://www.30secondsofcode.org/js/s/array-head-tail/#tail-of-an-array}
 * @param {Object[]} array
 * @returns {Object[]}
 */
const tail = (array) => (array && array.length > 1 ? array.slice(1) : []);

/**
 *
 * @param {Object[]} array
 * @returns {Object[]}
 */
const reverse = (array) => {
  if (!array.length) return [];
  const [x, ...xs] = array;
  return [...reverse(xs), x];
};

/**
 *
 * @param {Object[]} array
 * @returns {Object}
 */
const maximum = (array) => {
  if (!array.length) return Error("maximum of an empty list");
  if (array.length == 1) return head(array);
  const [x, ...xs] = array;
  return max(x, maximum(xs));
};

/**
 *
 * @param {Object[]} array
 * @returns {Object}
 */
const minimum = (array) => {
  if (!array.length) return Error("minimum of an empty list");
  if (array.length == 1) return head(array);
  const [x, ...xs] = array;
  return min(x, minimum(xs));
};

/**
 *
 * @param {Object[]} a
 * @param {Object[]} b
 * @returns {Object[]}
 */
const zip = (a, b) => {
  if (!a.length || !b.length) return [];
  const [x, ...xs] = a;
  const [y, ...ys] = b;
  return [[x, y], ...zip(xs, ys)];
};

/**
 *
 * @param {number} n
 * @param {Object[]} array
 * @returns {Object[]}
 */
const take = (n, array) => {
  if (n <= 0) return array;
  if (!array.length) return [];
  return take(n, tail(array));
};

/**
 *
 * @param {Object} target
 * @param {Object[]} array
 * @returns {boolean}
 */
const element = (target, array) => {
  if (!array.length) return false;
  const [x, ...xs] = array;
  return target == x ? true : element(target, xs);
};

/**
 *
 * @param {Object[]} array
 * @returns {Object[]}
 */
const quickSort = (array) => {
  if (array.length < 2) return array;
  const [x, ...xs] = array;
  const smallerSorted = quickSort(xs.filter((a) => a <= x));
  const biggerSorted = quickSort(xs.filter((a) => a > x));
  return [...smallerSorted, x, ...biggerSorted];
};

/**
 * @see {@link https://en.wikipedia.org/wiki/Binary_search_algorithm}
 * @param {Object} target
 * @param {Object[]} array
 * @param {number} [low=0]
 * @param {number} [high=array.length]
 * @returns {number}
 */
const binarySearch = (target, array, low = 0, high = array.length) => {
  if (high >= low) {
    const mid = low + Math.floor((high - low) / 2);
    if (array[mid] == target) return mid;
    if (array[mid] > target) return binarySearch(target, array, low, mid - 1);
    return binarySearch(target, array, mid + 1, high);
  }
  return -1;
};

/**
 * **Implements the Durstenfeld Shuffle in a functional way.**
 * @see {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle}
 * @example
 *
 * for (let i = array.length - 1; i > 0; i--) {
 *   const j = Math.floor(Math.random() * (i + 1));
 *   const temp = array[i];
 *   array[i] = array[j];
 *   array[j] = temp;
 * }
 * return array;
 *
 * @param {Object[]} array
 * @returns {Object[]}
 */
const shuffle = (array) => {
  if (array.length == 1) return array;
  const r = Math.floor(Math.random() * array.length);
  const t = array[r];
  array[r] = head(array);
  return [t, ...shuffle(tail(array))];
};

/**
 *
 * @param {number} m
 * @returns {number[]}
 */
const iota = (m) => {
  if (m == 1) return [1];
  return [...iota(m - 1), m];
};

/**
 *
 * @param {Object} n
 * @param {number} f
 * @returns {Object[]}
 */
const repeat = (n, f) => {
  if (f <= 0) return [];
  return [n, ...repeat(n, f - 1)];
};

const a = iota(100);
const b = repeat(1, 0);
const s = shuffle(a);
// console.log(s);
// const qs = quickSort(s);
// console.log(qs);
// const bs = binarySearch(50, qs);
// console.log(bs);
// const rv = reverse(qs);
// console.log(rv);
// const z = zip(b, a);
// console.log(z);
// const mx = maximum(a);
// console.log(mx);
// const mn = minimum(rv);
// console.log(mn);
// const e = element(1000, a);
// console.log(e);
