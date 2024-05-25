/**
 * Calculating typografic scale
 * for _i_ of _n_
 * with the radius _r_ and
 * the base _f0_
 *
 * Based on this article:
 * @see {@link https://spencermortensen.com/articles/typographic-scale/}
 *
 * Examples:
 * f(0,6,3,16) = 16
 * f(6,6,3,16) = 48
 * @param {number} i
 * @param {number} n
 * @param {number} r
 * @param {number} f0
 * @returns {number}
 */
const f = (i, n, r, f0) => Math.round(f0 * Math.pow(r, i / n) * 10000) / 10000;

/**
 * @param {number} a
 * @param {number} n
 * @param {number} r
 * @param {number} f0
 * @returns {number[]}
 */
const gen = (a, n, r, f0) => {
  const array = [];
  let b = n - a + 1;
  for (; b <= n; b++) array.push(f(b, n, r, f0));
  return array;
};

/**
 * @param {string} s
 * @param {number} n
 * @param {string} a
 * @returns {string}
 */
const val = (s, n, a) => {
  return `${s}: ${n}${a};`;
};

/**
 * @param {string} e
 * @param {string} s
 * @returns {string}
 */
const css = (e, s) => {
  return `${e} { ${s} }\n`;
};

/**
 * @param {number} n
 * @param {number} r
 * @param {number} f0
 * @returns {string}
 */
const elem = (n, r, f0) => {
  if (n > 6) n = 6;
  const a = gen(n + 2, n, r, f0);
  let str = "";
  for (let i = 1; i <= n; i++)
    str += css(`h${i}`, val("font-size", a.pop(), "px"));
  str += css("p", val("font-size", a.pop(), "px"));
  str += css("small", val("font-size", a.pop(), "px"));
  return str;
};

console.log(elem(6, 4, 16));
