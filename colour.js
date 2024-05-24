/**
 * Code based on:
 * https://matthewstrom.com/writing/generating-color-palettes/
 *
 */

import {
  parse,
  convertOkhslToOklab,
  convertOklabToRgb,
  formatHex,
  // formatRgb,
} from "https://deno.land/x/culori@v4.0.1/index.js";

/**
 *
 * @param {number} scaleNumber
 * @param {number} maxScaleNumber
 * @returns {number}
 */
const normalizeScaleNumber = (scaleNumber, maxScaleNumber) =>
  scaleNumber / maxScaleNumber;

/**
 *
 * @param {number} scaleValue
 * @param {number} baseHue
 * @returns {number}
 */
const computeScaleHue = (scaleValue, baseHue) => baseHue + 5 * (1 - scaleValue);

/**
 *
 * @param {number} scaleValue
 * @param {number} minChroma
 * @param {number} maxChroma
 * @returns {number}
 */
const computeScaleChroma = (scaleValue, minChroma, maxChroma) => {
  const chromaDifference = maxChroma - minChroma;
  // console.log(`chromaDifference: ${chromaDifference}`);
  return (
    -4 * chromaDifference * Math.pow(scaleValue, 2) +
    4 * chromaDifference * scaleValue +
    minChroma
  );
};

/**
 *
 * @param {number} scaleValue Must be between 0 and 1
 * @returns {number}
 */
const computeScaleLightness = (scaleValue) => 1 - scaleValue;

/**
 * TODO: Try to work it out, how it will work
 * with a backgroundY variable, to change the Lightness.
 *
 * Channel|Range|Description
 * ---|---------|---
 * h  |[0, 360] |Hue
 * s  |[0, 1]   |Saturation
 * l  |[0, 1]   |Lightness
 *
 * @param {number} scaleNumber
 * @param {number} maxScaleNumber
 * @param {number} baseHue
 * @param {number} minChroma Must be between 0 and 1
 * @param {number} maxChroma Must be between 0 and 1
 * @returns {string} The calculated hexcode as a string
 */
const computeColorAtScaleNumber = (
  scaleNumber,
  maxScaleNumber,
  baseHue,
  minChroma,
  maxChroma
) => {
  if (minChroma > 1 || minChroma < 0 || maxChroma > 1 || minChroma < 0) return;
  if (minChroma > maxChroma) return;
  const scaleValue = normalizeScaleNumber(scaleNumber, maxScaleNumber);
  const h = computeScaleHue(scaleValue, baseHue);
  const s = computeScaleChroma(scaleValue, minChroma, maxChroma);
  const l = computeScaleLightness(scaleValue);
  return formatHex(
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
    if (name == undefined) return Error("'name' needs to be defined.");
    if (typeof name !== "string") return Error("'name' needs to be a string.");
    if (typeof hue !== "number") return Error("'hue' needs to be anumber.");
    if (!Number.isInteger(hue)) return Error("'hue' needs to be an integer.");
    if (hue < 0 || hue > 360)
      return Error("'hue' needs to be between 0 and 360");
    if (minChroma < 0 || minChroma > 1)
      return Error("'minChroma' needs to between 0 and 1.");
    if (maxChroma < 0 || maxChroma > 1)
      return Error("'maxChroma' needs to between 0 and 1.");
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
  generate(steps, start, end) {
    if (steps == undefined) return Error("'steps' is undefined.");
    if (start == undefined) return Error("'start' is undefined.");
    if (end == undefined) return Error("'end' is undefined.");
    let str = "";
    for (let i = start; i <= end; i += steps) {
      str += `--${this.name}-${i}: ${computeColorAtScaleNumber(
        i,
        end,
        this.hue,
        this.minChroma != undefined ? 0 : this.minChroma,
        this.maxChroma != undefined ? 1 : this.maxChroma
      )}\n`;
    }
    return str;
  }
}

const neutral = new Colour("neutral", 250, 0, 0.2);
const blue = new Colour("blue", 250);
const green = new Colour("green", 145);
const red = new Colour("red", 20);
const yellow = new Colour("yellow", 70);

const colour_array = [neutral, blue, green, red, yellow];
colour_array.forEach((e) => console.log(e.generate(10, 0, 100)));
