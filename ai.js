// deno-lint-ignore-file no-unused-vars
/**
 * @file "ai" programming for fun
 * @author graefchem
 */

/**
 * logarithm base 2
 * @param {number} x
 * @returns
 */
const log2 = (x) => Math.log(x) / Math.log(2);

/* decision tree start */
const entropy = (...x) => {
  const n = x.reduce((a, b) => a + b, 0);
  let e = 0;
  for (const i of x) {
    const p = i / n;
    // console.log("i:", i, "p:", p);
    e = e + p * log2(p);
  }
  return e < 1 ? -e : e;
};

const information = (w, b, ...fe) => {
  // console.log("w:", w, "b:", b);
  // fe.forEach((e) => console.log("e:", e));
  const wfe = fe.reduce((a, b) => a + b, 0) / b;
  return w - wfe;
};
/* decision tree end */

/* naive bayes start */
const p = (f, c) => f / c;

const prediction = (...p) => p.reduce((a, b) => a * b, 1);
/* naive bayes end */

/* logistic regression start*/

const linear_regression = (x, a, b) => a * x + b;

/**
 * logistic regression is half of the math of deep learning
 * @param {number} x
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const logistic_regression = (x, a, b) =>
  1 / (1 + Math.pow(Math.E, linear_regression(x, a, b)));

// console.log(logistic_regression(0, 1, 0));
// console.log(logistic_regression(0, 10, 15));

/**
 * gradient  decent is half of the algorithms of deep learning
 * @returns
 */
const gradient_decent = (x, y, h) => {
  const m = x.length;
  let cost = 0;
  for (let i = 0; i < m; i++) {
    cost += y[i] * Math.log(h(x[i])) + (1 - y[i]) * Math.log(1 - h(x[i]));
  }
  return -(1 / m) * cost;
};
/* logistic regression end*/
