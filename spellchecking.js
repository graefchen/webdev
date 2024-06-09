/**
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
const lev = (a, b) => {
  if (!b.length) return a.length;
  if (!a.length) return b.length;
  if (a.slice(0, 1) == b.slice(0, 1)) return lev(a.slice(1), b.slice(1));
  return (
    1 +
    Math.min(
      lev(a.slice(1), b),
      lev(a, b.slice(1)),
      lev(a.slice(1), b.slice(1))
    )
  );
};

/**
 *
 * @param {string} a
 * @param {string} b
 * @param {object} [memo]
 * @returns {number}
 */
const lev_mem = (a, b, memo = {}) => {
  const key = `${a},${b}`;
  if (key in memo) return memo[key];
  if (!b.length) return (memo[key] = a.length);
  if (!a.length) return (memo[key] = b.length);
  if (a.slice(0, 1) == b.slice(0, 1))
    return (memo[key] = lev_mem(a.slice(1), b.slice(1), memo));
  return (memo[key] =
    1 +
    Math.min(
      lev_mem(a.slice(1), b, memo),
      lev_mem(a, b.slice(1), memo),
      lev_mem(a.slice(1), b.slice(1), memo)
    ));
};

/**
 *
 * @param {string} s
 * @param {string} t
 * @returns {number}
 */
const wagner_fischer = (s, t) => {
  s = " " + s;
  t = " " + t;
  const m = s.length;
  const n = t.length;
  const table = Array(n)
    .fill()
    .map(() => Array(m).fill(0));

  for (let i = 1; i < m; i++) table[i][0] = i;
  for (let j = 1; j < n; j++) table[0][j] = j;

  for (let j = 1; j < n; j++) {
    for (let i = 1; i < m; i++) {
      let substitutionCost = 1;
      if (s.at(i) === t.at(j)) substitutionCost = 0;
      table[i][j] = Math.min(
        table[i - 1][j] + 1,
        table[i][j - 1] + 1,
        table[i - 1][j - 1] + substitutionCost
      );
    }
  }

  return table[m - 1][n - 1];
};

console.time("Levensthein Distance No. 1");
console.log(lev("expenditure", "extraterrestrial"));
console.timeEnd("Levensthein Distance No. 1");

console.time("Levensthein Distance No. 2");
console.log(lev_mem("expenditure", "extraterrestrial"));
console.timeEnd("Levensthein Distance No. 2");

console.time("Wagner-Fischer Distance");
console.log(wagner_fischer("expenditure", "extraterrestrial"));
console.timeEnd("Wagner-Fischer Distance");
