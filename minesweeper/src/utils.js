import * as prelude from './prelude.js';
export const __namespace="utils";
export const html_to_string=((node) => {
const tag=node.at(0);
const attrs=node.at(1);
const p__1=(node.length>1);
let p__4;
if (p__1) {
const p__2=(typeof node.at(1)==="object");
let p__3;
if (p__2) {
p__3=!(Array.isArray(node.at(1)))
} else {
p__3=p__2
};
p__4=p__3
} else {
p__4=p__1
};
const has_attrs=p__4;
let p__7;
if ((typeof node==="string")) {
p__7=node
} else {
let p__5;
if (!(has_attrs)) {
p__5=""
} else {
p__5=Object.entries(attrs).reduce(((a,x) => {
return ("" + a + " " + x.at(0) + "='" + x.at(1) + "'");
}),"")
};
let p__6;
if (has_attrs) {
p__6=2
} else {
p__6=1
};
p__7=("" + "<" + tag + " " + p__5 + ">" + node.slice(p__6).map(html_to_string).reduce(((a,x) => {
return ("" + a + x);
}),"") + "</" + tag + ">")
};
return p__7;
});
export const random=((prev) => {
const m=4294967296;
return (((1013904223 + (1664525 * (m * prev))) % m) / m);
});
export const unfold=((seed,f) => {
const loop=((result,prev,i) => {
const pair=f(prev,i);
let p__8;
if ((pair===null)) {
p__8=result
} else {
const x=pair[0];
const acc=pair[1];
result.push(x);
p__8=loop(result,acc,(i + 1))
};
return p__8;
});
return loop([],seed,0);
})
