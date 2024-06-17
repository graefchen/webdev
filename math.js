// deno-lint-ignore-file no-unused-vars
/**
   @file just some math functions
 * @author graefchem
 */

/**
 * Euclidean Algorithm to get the greatest common devisor.
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
const gcd = (x, y) => (!y ? x : gcd(y, x % y));

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
const lcd = (x, y) => (x * y) / gcd(x, y);

/**
 * logarithm with the base
 * @param {number} x
 * @param {number} [b=10]
 * @returns
 */
const log = (x, b = 10) => Math.log(x) / Math.log(b);
