"use strict";
import { atom, reset, deref } from './prelude.js';
import * as u from './utils.js';
const FIELD_WIDTH = 6;
const FIELD_SIZE = (FIELD_WIDTH * FIELD_WIDTH);
const loaded = (cofx) => { return (function () { const x = (cofx.now / 1000); const seed = (x - Math.floor(x)); return {"field": u.unfold(seed, (prev, i) => { return ((i < FIELD_SIZE) ? (function () { const r = u.random(prev); return [(((5 * r) > 1) ? -1 : -2), r] })() : null) })} })() };
const get_at = (field, index, dx, dy) => { return (function () { const x = (dx + (index % FIELD_WIDTH)); const y = (dy + Math.floor((index / FIELD_WIDTH))); return (((x < 0) || (y < 0) || (x >= FIELD_WIDTH) || (y >= FIELD_WIDTH)) ? null : field[(x + (y * FIELD_WIDTH))]) })() };
const compute_count = (field, index) => { const get_mine = (dx, dy) => { return (function () { const m = get_at(field, index, dx, dy); return ((-2 === m || -4 === m) ? 1 : 0) })() };; return (get_mine(-1, -1) + get_mine(0, -1) + get_mine(1, -1) + get_mine(-1, 0) + get_mine(1, 0) + get_mine(-1, 1) + get_mine(0, 1) + get_mine(1, 1)) };
export const open_cell = (field, index) => { return field.map((x, i) => { return (i === index ? compute_count(field, index) : x) }) }
const clicked = (cofx, index) => { return (function () { const gen_1 = cofx.db.field.at(index); return (gen_1 === -2 ? (function () { alert("Game over!"); return { ...cofx.db, field: cofx.db.field.map((x) => { return (x === -2 ? -3 : x) }) } })() : (gen_1 === -1 ? { ...cofx.db, field: open_cell(cofx.db.field, index) } : (gen_1 === -5 ? { ...cofx.db, field: cofx.db.field.map((x, i) => { return (i === index ? -1 : x) }) } : (gen_1 === -4 ? { ...cofx.db, field: cofx.db.field.map((x, i) => { return (i === index ? -2 : x) }) } : cofx.db)))) })() };
const mini_flag_clicked = (cofx, index) => { return (function () { const gen_1 = cofx.db.field.at(index); return (gen_1 === -2 ? { ...cofx.db, field: cofx.db.field.map((x, i) => { return (i === index ? -4 : x) }) } : { ...cofx.db, field: cofx.db.field.map((x, i) => { return (i === index ? -5 : x) }) }) })() };
export const view = (state) => { return ["div", {"style": "width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"}, [...["div", {"style": ("" + "width: 100vmin; height: 100vmin; display: grid; grid-template-columns: repeat(" + FIELD_WIDTH + ", 1fr); grid-template-rows: repeat(" + FIELD_WIDTH + ", 1fr); gap: 10px;")}], ...state.field.map((x, i) => { return ["div", {"style": ("" + "display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; position: relative; cursor: default; border-radius: 1vw; background-color: " + ((x === -1 || x === -2 || x === -4 || x === -5) ? "#30c9bc" : "white")), "onclick": ("" + "dispatch(event, \"clicked\", " + i + ")")}, ["div", {"style": "font-size: 6vw; color: #999;"}, ((x === -1 || x === -2 || x === 0) ? "" : (x === -3 ? "💣" : ((x === -4 || x === -5) ? "🚩" : ("" + x))))], ((x === -1 || x === -2) ? ["div", {"style": ("" + "font-size: 3vw; border-radius: 1vw; background-color: #11111108; display: flex; align-items: center; justify-content: center; position: absolute; left: 50%; top: 0px; width: 50%; height: 50%; cursor: default;"), "onclick": ("" + "dispatch(event, \"mini_flag_clicked\", " + i + ")")}, "❌"] : ["div"])] })]] }
export const state = atom({"field": u.unfold(0, (_, i) => { return ((i < FIELD_SIZE) ? [-1, 0] : null) })});
export const dispatch = (e, action, payload) => { (null === e ? null : e.stopPropagation()); reset(state, (function () { const gen_1 = action; return (gen_1 === "loaded" ? (function () { (window.dispatch = dispatch); return loaded({"now": Date.now(), "db": deref(state)}) })() : (gen_1 === "clicked" ? clicked({"db": deref(state)}, payload) : (gen_1 === "mini_flag_clicked" ? mini_flag_clicked({"db": deref(state)}, payload) : deref(state)))) })()); return (document.querySelector("#container").innerHTML = u.html_to_string(view(deref(state)))) }
