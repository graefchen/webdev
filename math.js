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
