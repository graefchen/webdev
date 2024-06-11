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
