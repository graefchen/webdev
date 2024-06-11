/**
 * @file A small experiment to write an templating engine
 * @author graefchem
 * A small experiment to write an templating engine
 * heavily inspired by:
 * - https://hackernoon.com/how-to-create-new-template-engine-using-javascript-8f26313p
 */

/**
 * @see {@link https://github.com/mde/ejs}
 * @see {@link https://github.com/mde/ejs/blob/5b13088c6de0bff1ce5c6ff2eef7ee7eff0d6f3e/lib/ejs.js#L761-L786}
 * @param {string} template
 * @returns {string[]}
 */
const parse = (template) => {
  let result = /{{(.*?)}}/g.exec(template);
  const arr = [];
  let firstPos;

  while (result) {
    firstPos = result.index;

    if (firstPos !== 0) {
      arr.push(template.substring(0, firstPos));
      template = template.slice(firstPos);
    }

    arr.push(result[0]);
    template = template.slice(result[0].length);
    result = /{{(.*?)}}/g.exec(template);
  }

  if (template) arr.push(template);
  return arr;
};

/**
 *
 * @param {string} template
 * @returns {string}
 */
const compileToString = (template) => {
  const ast = parse(template);
  let fnStr = `""`;

  ast.map((t) => {
    if (t.startsWith("{{") && t.endsWith("}}")) {
      fnStr += `+data.${t.split(/{{|}}/).filter(Boolean)[0].trim()}`;
    } else {
      fnStr += `+"${t}"`;
    }
  });

  return fnStr;
};

/**
 *
 * @param {string} template
 * @returns {Function}
 */
const compile = (template) => {
  return new Function("data", "return " + compileToString(template));
};

/**
 *
 * @param {string} template
 * @param {Object} data
 * @returns {string}
 */
const render = (template, data) => {
  return compile(template)(data);
};

console.log(
  render("Hi, my name is {{ name }} and I am {{ years }} old!", {
    name: "graef",
    years: "24",
  })
);
