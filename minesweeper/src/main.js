import * as prelude from './prelude.js';
export const __namespace="main";
import * as u from './utils.js';
export const CELL_MINE=-2;
export const BOMB_COUNT=7;
export const FIELD_WIDTH=6;
export const FIELD_SIZE=(FIELD_WIDTH * FIELD_WIDTH);
const make_bomb_indecies=((seed,init_index) => {
const loop=((xs) => {
const find_free_index=((i) => {
let p__7;
let p__6;
if (xs.includes(i)) {
p__6=xs.includes(i)
} else {
p__6=(i===init_index)
};
if (p__6) {
p__7=find_free_index(((i + 1) % FIELD_SIZE))
} else {
p__7=i
};
return p__7;
});
let p__8;
if ((xs.length>=BOMB_COUNT)) {
p__8=xs
} else {
const prev=xs.at(-1);
const next=find_free_index(((prev + Math.floor(((FIELD_SIZE - xs.length) * u.random((prev / FIELD_SIZE))))) % FIELD_SIZE));
xs.push(next);
p__8=loop(xs)
};
return p__8;
});
return loop([Math.floor((FIELD_SIZE * u.random(seed)))]);
});
export const loaded=((cofx,init_index) => {
const x=(cofx.now / 1000);
const seed=(x - Math.floor(x));
const bomb_indecies=make_bomb_indecies(seed,init_index);
return {"initialized":true,"field":u.unfold(seed,((p__1,i) => {
let p__10;
if ((i<FIELD_SIZE)) {
let p__9;
if (bomb_indecies.includes(i)) {
p__9=-2
} else {
p__9=-1
};
p__10=[p__9,0]
} else {
p__10=null
};
return p__10;
}))};
});
const get_at=((field,index,dx,dy) => {
const x=(dx + (index % FIELD_WIDTH));
const y=(dy + Math.floor((index / FIELD_WIDTH)));
let p__14;
let p__13;
if ((x<0)) {
p__13=(x<0)
} else {
let p__12;
if ((y<0)) {
p__12=(y<0)
} else {
let p__11;
if ((x>=FIELD_WIDTH)) {
p__11=(x>=FIELD_WIDTH)
} else {
p__11=(y>=FIELD_WIDTH)
};
p__12=p__11
};
p__13=p__12
};
if (p__13) {
p__14=null
} else {
p__14=field[(x + (y * FIELD_WIDTH))]
};
return p__14;
});
const compute_count=((field,index) => {
const get_mine=((dx,dy) => {
const m=get_at(field,index,dx,dy);
let p__16;
let p__15;
if ((-2===m)) {
p__15=(-2===m)
} else {
p__15=(-4===m)
};
if (p__15) {
p__16=1
} else {
p__16=0
};
return p__16;
});
return (get_mine(-1,-1) + get_mine(0,-1) + get_mine(1,-1) + get_mine(-1,0) + get_mine(1,0) + get_mine(-1,1) + get_mine(0,1) + get_mine(1,1));
});
export const open_cell=((field,index) => {
return field.map(((x,i) => {
let p__17;
if ((i===index)) {
p__17=compute_count(field,index)
} else {
p__17=x
};
return p__17;
}));
});
export const clicked=((cofx,index) => {
let p__18;
if (cofx.db.initialized) {
p__18=cofx.db
} else {
p__18=loaded(cofx,index)
};
const db=p__18;
const p__2=db.field.at(index);
let p__21;
if ((p__2===-2)) {
p__21={ ...db, ["field"]: db.field.map(((x) => {
let p__19;
if ((x===-2)) {
p__19=-3
} else {
p__19=x
};
return p__19;
})) }
} else {
let p__20;
if ((p__2===-1)) {
p__20={ ...db, ["field"]: open_cell(db.field,index) }
} else {
p__20=db
};
p__21=p__20
};
return p__21;
});
const mini_flag_clicked=((cofx,index) => {
const update=((v) => {
return { ...cofx.db, ["field"]: cofx.db.field.map(((x,i) => {
let p__22;
if ((i===index)) {
p__22=v
} else {
p__22=x
};
return p__22;
})) };
});
const p__3=cofx.db.field.at(index);
let p__26;
if ((p__3===-1)) {
p__26=update(-5)
} else {
let p__25;
if ((p__3===-5)) {
p__25=update(-1)
} else {
let p__24;
if ((p__3===-2)) {
p__24=update(-4)
} else {
let p__23;
if ((p__3===-4)) {
p__23=update(-2)
} else {
p__23=cofx.db
};
p__24=p__23
};
p__25=p__24
};
p__26=p__25
};
return p__26;
});
export const view=((state) => {
return ["div",{"style":"width: 100%; height: 100%; display: flex; align_items: center; justify_content: center;"},[].concat(["div",{"style":("" + "width: 100vmin; height: 100vmin; display: grid; grid_template_columns: repeat(" + FIELD_WIDTH + ", 1fr); grid_template_rows: repeat(" + FIELD_WIDTH + ", 1fr); gap: 4px;")}],state.field.map(((x,i) => {
let p__30;
let p__29;
if ((x===-1)) {
p__29=(x===-1)
} else {
let p__28;
if ((x===-2)) {
p__28=(x===-2)
} else {
let p__27;
if ((x===-4)) {
p__27=(x===-4)
} else {
p__27=(x===-5)
};
p__28=p__27
};
p__29=p__28
};
if (p__29) {
p__30="var(__color_tile)"
} else {
p__30="var(__color_tile_opened)"
};
let p__36;
let p__32;
if ((x===-1)) {
p__32=(x===-1)
} else {
let p__31;
if ((x===-2)) {
p__31=(x===-2)
} else {
p__31=(x===0)
};
p__32=p__31
};
if (p__32) {
p__36=""
} else {
let p__35;
if ((x===-3)) {
p__35="💣"
} else {
let p__34;
let p__33;
if ((x===-4)) {
p__33=(x===-4)
} else {
p__33=(x===-5)
};
if (p__33) {
p__34="🚩"
} else {
p__34=("" + x)
};
p__35=p__34
};
p__36=p__35
};
return ["div",{"style":("" + "overflow: hidden; display: flex; align_items: center; justify_content: center; width: 100%; height: 100%; position: relative; cursor: default; border_radius: 1vw; background_color: " + p__30),"onclick":("" + "dispatch(event, \"clicked\", " + i + ")"),"oncontextmenu":("" + "dispatch(event, \"oncontextmenu\", " + i + ")")},["div",{"style":"font_size: 6vw; color: var(__color_text);"},p__36]];
})))];
});
export const make_state=(() => {
return {"initialized":false,"field":u.unfold(0,((p__4,i) => {
let p__37;
if ((i<FIELD_SIZE)) {
p__37=[-1,0]
} else {
p__37=null
};
return p__37;
}))};
});
const state=[make_state()];
export const dispatch=((e,action,payload) => {
let p__38;
if ((null===e)) {
p__38=null
} else {
p__38=e.preventDefault()
};
const p__5=action;
let p__41;
if ((p__5==="loaded")) {
window.dispatch=dispatch;
p__41=state[0]
} else {
let p__40;
if ((p__5==="clicked")) {
p__40=clicked({"now":Date.now(),"db":state[0]},payload)
} else {
let p__39;
if ((p__5==="oncontextmenu")) {
p__39=mini_flag_clicked({"db":state[0]},payload)
} else {
p__39=state[0]
};
p__40=p__39
};
p__41=p__40
};
state[0]=p__41;
return document.querySelector("#container").innerHTML=u.html_to_string(view(state[0]));
})
