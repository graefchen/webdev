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
 *
 * @param {number} m
 * @param {number} n
 * @param {Object} memo
 * @returns
 */
const gridTraveler = (m, n, memo = {}) => {
  const key = m + "," + n;

  if (key in memo) return memo[key];
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;

  memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m - 1, n, memo);
  return memo[key];
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
const lcd = (a, b) => (x * y) / gcd(x, y);

/**
 *
 * @param {Array} array
 * @returns {boolean}
 */
const empty = (array) => (array[0] === undefined ? true : false);

/**
 * @param {Array} array
 * @returns {*}
 */
const head = (array) => {
  if (empty(array)) return Error("empty list");
  const [x] = array;
  return x;
};

/**
 * @see {@link https://www.30secondsofcode.org/js/s/array-head-tail/#tail-of-an-array}
 * @param {Array} array
 * @returns {Array}
 */
const tail = (array) => {
  if (empty(array)) return Error("empty list");
  const [x, ...xs] = array;
  return xs;
};

/**
 *
 * @param {Array} array
 * @returns {any}
 */
const init = (array) => {
  if (empty(array)) return Error("empty list");
  return !empty(tail(array)) ? [head(array), ...init(tail(array))] : [];
};

/**
 *
 * @param {Array} array
 * @returns {any}
 */
const last = (array) => {
  if (empty(array)) return Error("empty list");
  const x = head(array),
    xs = tail(array);
  return empty(xs) ? x : last(xs);
};

/**
 *
 * @param {Array} array
 * @returns {number}
 */
const lenght = (array) => (!empty(array) ? 1 + lenght(tail(array)) : 0);

/**
 *
 * @param {Array} array
 * @returns {Array}
 */
const reverse = (array) => {
  if (empty(array)) return [];
  return [...reverse(tail(array)), head(array)];
};

/**
 *
 * @param {number} n
 * @param {Array} array
 * @returns {Array}
 */
const take = (n, array) => {
  if (n <= 0) return array;
  if (empty(array)) return [];
  return take(n - 1, tail(array));
};

/**
 *
 * @param {number} n
 * @param {Array} array
 * @returns {Array}
 */
const drop = (n, array) => {
  if (n <= 0) return array;
  if (empty(array)) return [];
  return [...drop(n - 1, tail(array))];
};

/**
 *
 * @param {Array} array
 * @returns {*}
 */
const maximum = (array) => {
  if (empty(array)) return Error("empty list");
  if (array.length === 1) return head(array);
  const x = head(array),
    xs = maximum(tail(array));
  return x >= xs ? x : xs;
};

/**
 *
 * @param {Array} array
 * @returns {*}
 */
const minimum = (array) => {
  if (empty(array)) return Error("empty list");
  if (array.length === 1) return head(array);
  const x = head(array),
    xs = minimum(tail(array));
  return x <= xs ? x : xs;
};

/**
 *
 * @param {Array} array
 * @returns {number}
 */
const sum = (array) => (!empty(array) ? head(array) + sum(tail(array)) : 0);

/**
 *
 * @param {Array} array
 * @returns {number}
 */
const product = (array) => {
  if (empty(array)) return 0;
  if (lenght(array) >= 1) return head(array) * product(tail(array));
  return;
};

/**
 *
 * @param {*} value
 * @param {Array} array
 * @returns {boolean}
 */
const elem = (value, array) => {
  if (empty(array)) return false;
  return value == head(array) ? true : elem(value, tail(array));
};

/**
 *
 * @param {*} n
 * @param {number} f
 * @returns {Array}
 */
const repeat = (n, f) => {
  if (f <= 0) return [];
  return [n, ...repeat(n, f - 1)];
};

/**
 *
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 */
const zip = (a, b) => {
  if (empty(a) || empty(b)) return [];
  return [[head(a), head(b)], ...zip(tail(a), tail(b))];
};

/**
 *
 * @param {Array} array
 * @param {Function} fn
 * @returns {Array}
 */
const filter = (array, fn) => {
  if (empty(array)) return [];
  const x = head(array),
    xs = filter(tail(array), fn);
  return fn(x) ? [x, ...xs] : xs;
};

/**
 *
 * @param {Array} array
 * @returns {Array}
 */
const quickSort = (array) => {
  if (lenght(array) < 2) return array;
  const x = head(array),
    xs = tail(array);
  const smallerSorted = quickSort(filter(xs, (a) => a <= x));
  const biggerSorted = quickSort(filter(xs, (a) => a > x));
  return [...smallerSorted, x, ...biggerSorted];
};

/**
 * @see {@link https://en.wikipedia.org/wiki/Binary_search_algorithm}
 * @param {*} value
 * @param {Array} array
 * @param {number} [low=0]
 * @param {number} [high=array.length]
 * @returns {number}
 */
const binarySearch = (value, array, low = 0, high = array.length) => {
  if (high >= low) {
    const mid = low + Math.floor((high - low) / 2);
    if (array[mid] == value) return mid;
    if (array[mid] > value) return binarySearch(value, array, low, mid - 1);
    return binarySearch(value, array, mid + 1, high);
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
 * @param {Array} array
 * @returns {Array}
 */
const shuffle = (array) => {
  if (lenght(array) == 1) return array;
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
  if (m <= 0) return [];
  if (m == 1) return [1];
  return [...iota(m - 1), m];
};

/**
 *
 * @param {number} start
 * @param {number} end
 * @param {number} [interval=1]
 * @returns {number[]}
 */
const range = (start, end, interval = 1) => {
  if (interval == 0) return Error("Can't go 0 steps.");
  if (start > end && interval >= 1) return [];
  if (start < end && interval <= -1) return [];
  return [start, ...range(start + interval, end, interval)];
};

/**
 *
 * @param {Array} array
 * @param {number} start
 * @param {number} [end=array.length]
 * @returns {Array}
 */
const slice = (array, start, end = array.length) => {
  if (empty(array) || start >= end) return [];
  return [head(array), slice(tail(array), start + 1, end)];
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
// const e = elem(1000, a);
// console.log(e);
