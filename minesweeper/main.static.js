"use strict";
import { atom, reset, deref } from './prelude.js';
import * as app from './main.js';
import * as u from './utils.js';
const html = () => { return ["html", ["head", ["meta", {"charset": "UTF-8"}], ["meta", {"name": "viewport", "content": "width=device-width, initial-scale=1"}]], ["body", {"style": "user-select: none; -webkit-user-select: none;"}, ["div", {"id": "container"}, app.view(deref(app.state))], ["script", {"src": "main.js", "type": "module"}], ["script", {"type": "module"}, "import { dispatch } from './main.js'; dispatch(null, \"loaded\")"]]] };
console.info(u.html_to_string(html()))
