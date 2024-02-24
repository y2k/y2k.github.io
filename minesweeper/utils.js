"use strict";
import { atom, reset, deref } from './prelude.js';
export const html_to_string = (node) => { return (function () { const tag = node.at(0); const attrs = node.at(1); const has_attrs = ((node.length > 1) && typeof node.at(1) === "object" && !Array.isArray(node.at(1))); return (typeof node === "string" ? node : ("" + "<" + tag + " " + (!has_attrs ? "" : Object.entries(attrs).reduce((a, x) => { return ("" + a + " " + x.at(0) + "='" + x.at(1) + "'") }, "")) + ">" + node.slice((has_attrs ? 2 : 1)).map(html_to_string).reduce((a, x) => { return ("" + a + x) }, "") + "</" + tag + ">")) })() }
export const random = (prev) => { return (function () { const m = 4294967296; return (((1013904223 + (1664525 * (m * prev))) % m) / m) })() }
export const unfold = (seed, f) => { const loop = (result, prev, i) => { return (function () { const pair = f(prev, i); return (pair === null ? result : (function () { const x = pair.at(0); const acc = pair.at(1); result.push(x); return loop(result, acc, (i + 1)) })()) })() };; return loop([], seed, 0) }
