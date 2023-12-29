const fs = require("fs"); 
const input = require("./input.js"); 
console.log(process.argv);
let args = process.argv;

let dt = new Date();
let timestamp = dt.getTime();
let datetime = dt.toDateString();

const Bfile = `./B.js`;
const BfilmFile = `./Bfilm.js`;
const pigments = require("./pigments.js").pigments;
const colorsets = require("./pigments.js").colorsets;
const rawcolorsets = require("./pigments.js").rawcolorsets;
const tools = require("./tools.js");

const outSoundFiles = require("./outSoundFiles.js");
let soundFile = outSoundFiles.filter(f=>f.id==="line_all_thread_all_echo_reverb").length>0 ? outSoundFiles.filter(f=>f.id==="line_all_thread_all_echo")[0] : null;
const nticks =  soundFile ? Math.round(soundFile.duration) : 240;
console.log(`nticks = ${nticks}`);
const fps = input.fps || 24;
const spice = [pigments.warmlightwhite, pigments.warmlightwhite, pigments.warmblack, pigments.warmgray, pigments.yellow]; 
const colors = colorsets.warmbw; 
//const spice = rawcolorsets.filter(cs=>cs.title==="core colors")[0].lists[8];
//const colors = rawcolorsets.filter(cs=>cs.title==="core colors")[0].lists[8];
//const allcolors = [...spice,...colors];
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmgray,pigments.yellow,pigments.warmblack,pigments.warmlightwhite,pigments.warmgray];
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.yellow,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack];
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.yellow,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack];
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack];
const allcolors = input.allcolors(pigments) || [pigments.warmlightwhite,pigments.warmblack];
const n = input.nx || 4;
const nz = input.nz || 4;

const xgrid = [...new Array(n).keys()].map( j=>j/(n-1) );
const ygrid = [...new Array(n).keys()].map( j=>j/(n-1) );
//const ygrid = [...new Array(n).keys()].map(j=>tools.randominteger(0,100)/100).sort( (a,b) => { return a - b } );
const xygrid = xgrid.map( x=> {
	return ygrid.map( y=> {
		return [x,y];
	});
});

let elements = [];
elements[0] = [{tag:"rect", n:0, cx:0, cy:0, color:pigments.warmlightwhite}];
[...new Array(nz).keys()].map(z=>z+1).forEach( z=> {
	//if(z<nz-1) {
	let count=0;
	elements[z] = [...new Array(n).keys()].flatMap( j=> {
		let color1 = allcolors[(z+j)%allcolors.length];
		let color2 = allcolors[(z+j+1)%allcolors.length];
		let cross = [
			{tag:"line", cx:xgrid[j], cy:ygrid[j], role:"hline", n:count, color:color1},
			{tag:"line", cx:xgrid[j], cy:ygrid[j], role:"vline", n:count+1, color:color2}
		];
		count = count+2;
		return cross;
	});
	//}
	//else elements[z] = [];
	[...new Array(n).keys()].forEach( x=> {
		[...new Array(n).keys()].forEach( y=> {
			let color = allcolors[(z+x+y)%allcolors.length];
			elements[z].push({tag:"circle", role:"circle", cx:xgrid[x], cy:ygrid[y], n:count, color}); 
			++count;
		});
	});
});
//console.log(`nelements = ${elements.length}`);
//console.log(`elements = ${JSON.stringify(elements)}`);

let B = {
	nticks: nticks,
	fps: fps,
	elements: elements,
};
let Bfilm = {
	nticks: nticks,
	fps: fps,
	elements: elements.map( z => {
		return z.map( el => {
			let newel = {};
			Object.keys(el).forEach(key=> {
				newel[key]=el[key];
			});
			return newel;
		});
	})
}
const dotween = () => { return tools.randominteger(0,100) < 94 }
const ischange = () => { return tools.randominteger(0,100) > 8 }

/* layer 0
 * rectangle background
 * */
[0].forEach( z => {
	let cx = 0, cy = 0, w = 1.0, h = 1.0, sw = 0.08, sf = 0, sd = 1, so = 1, fo = 1;
	[...new Array(elements[z].length).keys()].forEach( n => { 
		B.elements[z][n].b = [...new Array(nticks).keys()].map( j => {
			return tools.drawp.rect({cx:cx,cy:cy,w:w,h:h,sw,sd,so,fo,strokecolor:pigments.red,fillcolor:B.elements[z][n].color});
		});
		Bfilm.elements[z][n].b = [...new Array(nticks).keys()].flatMap( j => {
			return [...new Array(fps).keys()].map( t => {
				return tools.drawp.rect({cx:cx,cy:cy,w:w,h:h,sw,sf,sd,so,fo,strokecolor:pigments.red,fillcolor:Bfilm.elements[z][n].color});
			});
		});
	});
});

/* layers 1&above
 * lines
 * */
let xdt = [...new Array(n).keys()].map( j=> [tools.randominteger(2,5),tools.randominteger(2,5)] );

[...new Array(nz).keys()].map(z=>z+1).forEach( z => { 
	B.elements[z].forEach( (el,j) => {
		let so = (el.role==="circle" && z%3===0 && z < nz/2) ? 0 : 1;
		let fo = (el.role==="circle" && z&3===0 && z < nz/2) ? 1 : 0;
		let bframe = [...new Array(nticks).keys()].reduce( (acc,t) => {
			let dx = (t%xdt[el.n%(n)][z-1]+1)/(xdt[el.n%n][z-1]);
			//console.log(`dx=${dx}`);
			let cy = el.cy, cx = el.cx; 
			let sw = el.role==="circle" ? tools.randominteger(8,25)/100 : ( z<nz-2 ? tools.randominteger(9,68)/100 : 6);
			if(z>1) { 
				let sw0 = B.elements[z-1].filter(e=>e.n===j)[0].b[t]["stroke-width"];
				sw = sw0*tools.randominteger(6,9)/10;
			}
			let sf = tools.randominteger(0,100)/100;
			let sd = tools.randominteger(40,80)/100;
			//if(z>1) { sd = B.elements[z-1][j].b[t]["stroke-dasharray"]*tools.randominteger(4,8)/10 }
			let r = tools.randominteger(100/(n*4),100/(n*1.4))/100;
			//if(z>1) { r = B.elements[z-1][j].b[t].r*tools.randominteger(6,8)/10 }
			let bt = [];
			if( t===0 || ischange() || t===nticks-1 ) {
				bt = tools.drawp[el.role]({ 
					cx, cy, r,
					w:1, h:1, so, fo, sw, sf, sd,
					strokecolor:el.color,fillcolor:el.color,
				});
			}
			else { bt = acc[t-1]; }
			acc.push(bt);
			return acc;
		}, []);

		[...new Array(Math.floor(nticks/3)).keys()].forEach(x=> {
			let t = tools.randominteger(1,nticks-2);
			bframe[t] = tools.tween(bframe[t-1],bframe[t+1],1,2);
		});
		[...new Array(Math.floor(nticks/4)).keys()].forEach(x=> {
			let t = tools.randominteger(1,nticks-3);
			bframe[t] = tools.tween(bframe[t-1],bframe[t+2],1,3);
			bframe[t+1] = tools.tween(bframe[t-1],bframe[t+2],2,3);
		});

		el.b = bframe;
		//console.log(`bframe[0] = ${JSON.stringify(bframe[0])}`);
		//console.log(`bframe[nticks-1] = ${JSON.stringify(bframe[nticks-1])}`);
		Bfilm.elements[z][j].b = [...new Array(nticks).keys()].flatMap( t => { 
			//console.log(`t=${t}`);
			let p1 = bframe[t];
			let p2 = bframe[Math.min((t+1),(nticks-1))];
			//console.log(`el.n=${el.n}, j=${j}, p1=${JSON.stringify(p1)}, p2=${JSON.stringify(p2)}`);
			let istween = dotween();
			if(t===0 || t===nticks-1) {istween = 0}
			else if (t>nticks*0.6) {istween = 1}
			else {
				let tag = t<nticks/2 ? "circle" : "line";
				if(Bfilm.elements[z][j].tag===tag) {istween = 1}
			}
			return [...new Array(fps).keys()].map( f => {
				let step = istween ? tools.tween(p1,p2,f,fps) : bframe[tools.randominteger(0,bframe.length)];
				return step; 
			});
		});
		//console.log(`Bfilm.elements[z][j].b.length =${Bfilm.elements[z][j].b.length}`);
		//console.log(`el.b.length=${el.b.length}`);
		//console.log(`count=${el.b.length}`);
		//console.log(`count=${Bfilm.elements[z][j].b.length}`);
	});
});

let Bstr = `let B =
	${JSON.stringify(B)};
module.exports = B;`

let Bfilmstr = `let B =
	${JSON.stringify(Bfilm)};
module.exports = B;`

fs.writeFileSync(Bfile, Bstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${Bfile} written successfully\n`);
	}
});

fs.writeFileSync(BfilmFile, Bfilmstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${BfilmFile} written successfully\n`);
	}
});
