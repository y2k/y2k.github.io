"use strict";

export const atom = (x) => { return Array.of(x) }
export const reset = (a, x) => { a.pop(); return a.push(x) }
export const deref = (a) => { return a[0] }
