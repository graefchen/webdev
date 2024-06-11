/**
 *
 */

/**
 * logarithm base 2
 * @param {number} x
 * @returns
 */
const log2 = (x) => Math.log(x) / Math.log(2);

const entropy = (...x) => {
  const n = x.reduce((a, b) => a + b, 0);
  let e = 0;
  for (const i of x) {
    const p = i / n;
    e = e + p * log2(p);
  }
  return e < 0 ? -e : e;
};

console.log(entropy(3, 1));
console.log(entropy(3, 1));
