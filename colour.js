/**
 * Code based on:
 * https://matthewstrom.com/writing/generating-color-palettes/
 * https://bottosson.github.io/misc/colorpicker/
 */

import {
  parse,
  convertOkhslToOklab,
  convertOklabToRgb,
  formatRgb,
} from "https://deno.land/x/culori@v4.0.1/index.js";

/**
 *
 * @param {number} scaleNumber
 * @param {number} maxScaleNumber
 * @returns {number} - a number that is between 0 and 1
 */
const normalizeScaleNumber = (scaleNumber, maxScaleNumber) =>
  scaleNumber / maxScaleNumber;

/**
 *
 * @param {number} scaleValue - Must be between 0 and 1
 * @param {number} baseHue
 * @returns {number}
 */
const computeScaleHue = (scaleValue, baseHue) => baseHue + 5 * (1 - scaleValue);

/**
 *
 * @param {number} scaleValue - Must be between 0 and 1
 * @param {number} minChroma
 * @param {number} maxChroma
 * @returns {number}
 */
const computeScaleChroma = (scaleValue, minChroma, maxChroma) => {
  const chromaDifference = maxChroma - minChroma;
  return (
    -4 * (chromaDifference * Math.pow(scaleValue, 2)) +
    4 * (chromaDifference * scaleValue) +
    minChroma
  );
};

/**
 *
 * @param {number} scaleValue - Must be between 0 and 1
 * @returns {number}
 */
const computeScaleLightness = (scaleValue) => 1 - scaleValue;

/**
 *
 * Channel|Range|Description
 * ---|---------|---
 * h  |[0, 360] |Hue
 * s  |[0, 1]   |Saturation
 * l  |[0, 1]   |Lightness
 *
 * @param {number} scaleNumber
 * @param {number} maxScaleNumber
 * @param {number} baseHue - A hue that is between 0 and 360
 * @param {number} minChroma - Must be between 0 and 1
 * @param {number} maxChroma - Must be between 0 and 1
 * @returns {string | Error} - The calculated hexcode as a string
 */
const computeColorAtScaleNumber = (
  scaleNumber,
  maxScaleNumber,
  baseHue,
  minChroma,
  maxChroma
) => {
  if (scaleNumber > maxScaleNumber)
    return Error("'scaleNumber' can not be bigger than 'maxScaleNumber'");
  if (minChroma > 1 || minChroma < 0)
    return Error("'minChroma' needs to be between 0 and 1");
  if (maxChroma > 1 || maxChroma < 0)
    return Error("'maxChroma' needs to be between 0 and 1");
  if (minChroma > maxChroma)
    return Error("'minChroma' is not allowed to be bigger than 'maxChroma'");
  const scaleValue = normalizeScaleNumber(scaleNumber, maxScaleNumber);
  const h = computeScaleHue(scaleValue, baseHue);
  const s =
    Math.round(computeScaleChroma(scaleValue, minChroma, maxChroma) * 100) /
    100;
  const l = computeScaleLightness(scaleValue);
  // console.log(`${h}, ${s}, ${l}`);
  return formatRgb(
    convertOklabToRgb(
      convertOkhslToOklab(parse(`color(--okhsl ${h} ${s} ${l})`))
    )
  );
};

class Colour {
  /**
   *
   * @param {string} name
   * @param {number} hue
   * @param {number} [minChroma]
   * @param {number} [maxChroma]
   * @returns {Color | Error}
   */
  constructor(name, hue, minChroma = 0, maxChroma = 1) {
    if (name == undefined) throw Error("'name' needs to be defined.");
    if (typeof name !== "string") throw Error("'name' needs to be a string.");
    if (typeof hue !== "number") throw Error("'hue' needs to be anumber.");
    if (!Number.isInteger(hue)) throw Error("'hue' needs to be an integer.");
    if (hue < 0 || hue > 360)
      throw Error("'hue' needs to be between 0 and 360");
    if (minChroma < 0 || minChroma > 1)
      throw Error("'minChroma' needs to between 0 and 1.");
    if (maxChroma < 0 || maxChroma > 1)
      throw Error("'maxChroma' needs to between 0 and 1.");
    this.name = name;
    this.hue = hue;
    this.minChroma = minChroma;
    this.maxChroma = maxChroma;
  }

  /**
   *
   * @param {number} steps
   * @param {number} start
   * @param {number} end
   * @returns {string | Error}
   */
  generate(steps = 10, start = 0, end = 100) {
    if (steps == undefined) return Error("'steps' is undefined.");
    if (start == undefined) return Error("'start' is undefined.");
    if (end == undefined) return Error("'end' is undefined.");
    let str = "";
    for (let i = start; i <= end; i += steps) {
      str += `--${this.name}-${i}: ${computeColorAtScaleNumber(
        i,
        end,
        this.hue,
        this.minChroma,
        this.maxChroma
      )};\n`;
    }
    return str;
  }
}

const neutral = new Colour("neutral", 250, 0, 0.2);
const blue = new Colour("blue", 250);
const green = new Colour("green", 145);
const red = new Colour("red", 20);
const yellow = new Colour("yellow", 70);
const purple = new Colour("purple", 300);
const orange = new Colour("orange", 30);

const start = 0;
const end = 100;
const step = 10;

const colour_array = [neutral, blue, green, red, yellow, purple, orange];

let css = ":root {\n";
colour_array.forEach((e) => (css += e.generate(step, start, end)));
css += "}\n";

colour_array.forEach((e) => {
  for (let i = start; i <= end; i = i + step) {
    css += `.${e.name}-${i} {background-color: var(--${e.name}-${i});}\n`;
  }
});
await Deno.writeTextFile("color.css", css);

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

let colors = "<table><thead><tr><th>Scale Number</th>";
colour_array.forEach((e) => {
  colors += `<th>${capitalize(e.name)}</th>`;
});
colors += "</thead><tbody>";
for (let i = start; i <= end; i += step) {
  colors += `<tr><td>${i}</td>`;
  colour_array.forEach((e) => {
    colors += `<td><span class="swatch ${e.name}-${i}"><span></td>`;
  });
  colors += `</tr>`;
}
colors += "</tbody></table>";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Colours</title>
  <style>
  .swatch {
    border-radius: .25rem;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .05);
    display: inline-block;
    height: .75em;
    margin-left: .125em;
    margin-top: 0;
    white-space: nowrap;
    width: .75em;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #04AA6D;
  color: white;
}
td {
  text-align: center;
}
tr:hover {background-color: coral;}
</style>
<link rel="stylesheet" href="color.css">
</head>
<body>
${colors}
</body>
</html>
`;

await Deno.writeTextFile("index.html", html);
