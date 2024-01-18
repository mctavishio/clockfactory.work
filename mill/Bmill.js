const fs = require("fs"); 
const input = require("./input.js"); 
console.log(process.argv);
let args = process.argv;

let dt = new Date();
let timestamp = dt.getTime();
let datetime = dt.toDateString();

const Bfile = `./B.js`;
const BfilmFile = `./Bfilm.js`;
const pigments = input.pigments;
const tools = require("./tools.js");

const outSoundFiles = require("./outSoundFiles.js");
let soundFile = outSoundFiles.filter(f=>f.id==="line_all_thread_all_echo_reverb").length>0 ? outSoundFiles.filter(f=>f.id==="line_all_thread_all_echo")[0] : null;
const nticks =  soundFile ? Math.round(soundFile.duration) : 240;
console.log(`nticks = ${nticks}`);
const fps = input.fps || 24;
const spice = input.spicecolors; 
const colors = input.colors; 
const allcolors = input.allcolors;
const nx = input.nx || 5;
const ny = input.ny || 5;
const nz = input.nz || 2;
const nmin = Math.min(nx,ny);
const nmax = Math.max(nx,ny);
const m = nx*ny*nz;
const ne = (nx*2+ny)*nz;
const n = nmin;
//console.log(`colorseq = ${JSON.stringify(colorseq)}`);
const xgrid = tools.shuffle(input.xgrid);
const ygrid = tools.shuffle(input.ygrid);
console.log(`xgrid=${JSON.stringify(xgrid)}`);
//const xgrid = tools.shuffle(input.xgrid);
//const ygrid = tools.shuffle(input.ygrid);

let pigmentsets = input.pigmentsets;

//x,y,e,z
let elements = [];
elements[0] = [
	{tag:"rect",role:"rect",b:[],n:0,block:0,x:0,y:0,z:0,e:0,cx:0,cy:0,w:1,h:1,sw:0.01,sf:0,sd:4,so:1,fo:1,strokecolor:pigments.warmblack,fillcolor:pigments.warmlightwhite},
];
let count=0;
[...new Array(nz).keys()].map(z=>z+1).forEach( z=> {
	let e = -1;
	elements[z] = [];
	[...new Array(nx).keys()].forEach( x=> {
		[...new Array(ny).keys()].forEach( y=> {
			let cx = xgrid[x];
			let cy = ygrid[y];
			let color = allcolors[tools.randominteger(0,allcolors.length)];
			++e;++count;
			elements[z].push({b:[], tag:"line", role:"vline", x,y,z,e,n:count, cx:xgrid[x], cy:ygrid[y], so:1.0, fo:0.0, strokecolor:color, fillcolor:color});
			color = allcolors[tools.randominteger(0,allcolors.length)];
			//if(z===nz) {color=pigments.warmblack}
			++e;++count;
			elements[z].push({tag:"rect",role:"rect",b:[],n:count,block:0,x,y,z,e,cx:0,cy:0,w:1,h:1,sw:0.01,sf:0,sd:4,so:1,fo:0,strokecolor:color,fillcolor:pigments.warmlightwhite});
			color = allcolors[tools.randominteger(0,allcolors.length)];
			++e;++count;
			elements[z].push({b:[], tag:"circle", role:"fcircle", x,y,z,e, n:count, cx:0.5, cy:0.5, so:1.0, fo:0.0, strokecolor:color, fillcolor:color}); 
			color = allcolors[tools.randominteger(0,allcolors.length)];
			++e;++count;
			elements[z].push({b:[], tag:"line", role:"vline", x,y,z,e,n:count, cx:xgrid[x], cy:ygrid[y], so:1.0, fo:0.0, strokecolor:color, fillcolor:color});
			/*
			color = allcolors[tools.randominteger(0,allcolors.length)];
			++e;++count;
			elements[z].push({b:[], tag:"circle", role:"scircle", x,y,z,e, n:count, cx:0.5, cy:0.5, so:1.0, fo:0.0, strokecolor:color, fillcolor:color}); 
			*/
			color = allcolors[tools.randominteger(0,allcolors.length)];
			//if(z===nz) {color=pigments.warmblack}
			++e;++count;
			elements[z].push({tag:"rect",role:"rect",b:[],n:count,block:0,x,y,z,e,cx:.025,cy:.025,w:0.95,h:0.95,sw:0.01,sf:0,sd:4,so:1,fo:0,strokecolor:color,fillcolor:pigments.warmlightwhite});
			/*
			color = allcolors[tools.randominteger(0,allcolors.length)];
			++e;++count;
			elements[z].push({b:[], tag:"circle", role:"scircle", x,y,z,e, n:count, cx:xgrid[x], cy:ygrid[y], so:1.0, fo:0.0, strokecolor:color, fillcolor:color}); 
			//++e;++count;
			*/
		});
	});
});
/*
let z = nz+1;
++count;
elements[z] = [
	{b:[], tag:"circle", role:"scircle", r:.08, sw:0.01, x:0,y:0,z,e:0, n:count, cx:0.5, cy:0.5, so:0.0, fo:1.0, strokecolor:pigments.warmlightwhite, fillcolor:pigments.warmlightwhite}, 
	{b:[], tag:"circle", role:"scircle", r:.05, sw:0.01, x:0,y:0,z,e:1, n:count, cx:0.5, cy:0.5, so:0.0, fo:1.0, strokecolor:pigments.warmblack, fillcolor:pigments.warmblack}, 
	{b:[], tag:"circle", role:"scircle", r:.03, sw:0.01, x:0,y:0,z,e:2, n:count, cx:0.5, cy:0.5, so:0.0, fo:1.0, strokecolor:pigments.warmlightwhite, fillcolor:pigments.warmlightwhite}, 
	{b:[], tag:"circle", role:"scircle", r:.01, sw:0.01, x:0,y:0,z,e:3, n:count, cx:0.5, cy:0.5, so:0.0, fo:1.0, strokecolor:pigments.red, fillcolor:pigments.warmblack}, 
];
*/
//console.log(`elements = ${JSON.stringify(elements)}`);

let B = {
	nticks: nticks,
	fps: fps,
	pigmentcount: [],
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
const dotween = () => { return tools.randominteger(0,100) < 90 }
const ischange = () => { return tools.randominteger(0,100) > 8 }

/* layer 0
 * rectangle background
 * */
[0].forEach( z => {
	[...new Array(elements[z].length).keys()].forEach( n => { 
		B.elements[z][n].b = [...new Array(nticks).keys()].map( j => {
			let sf = tools.randominteger(1,20)/100;
			return { };
		});
		Bfilm.elements[z][n].b = [...new Array(nticks).keys()].flatMap( j => {
			return [...new Array(fps).keys()].map( t => {
				return {};
			});
		});
	});
});
/*
[nz+1].forEach( z => {
	[...new Array(elements[z].length).keys()].forEach( n => { 
		B.elements[z][n].b = [...new Array(nticks).keys()].map( j => {
			let sf = tools.randominteger(1,20)/100;
			return { r:0.1 };
		});
		Bfilm.elements[z][n].b = [...new Array(nticks).keys()].flatMap( j => {
			return [...new Array(fps).keys()].map( t => {
				return {};
			});
		});
	});
});
*/

/* layers 1&above
 * */
let mult = [...new Array(nz).keys()].map(z=>tools.randominteger(5,9)/10).sort( (a, b) => b-a );
[...new Array(nz).keys()].map(z=>z+1).forEach( z => { 
	[...new Array(nticks).keys()].forEach( t => {
		B.elements[z].forEach( (el,j) => {
			let bt = {};
			let sw = el.role==="scircle" ? tools.randominteger(28,68)/100 : tools.randominteger(4,120)/100;
			//let sw = 1.2;
			let sf = 0;
			let sd = el.role==="scircle" ? tools.randominteger(.4,9)/100 : tools.randominteger(.2,9)/100;
			if(el.tag==="rect" && z===nz) {sw = tools.randominteger(1,9)/100; sf=tools.randominteger(1,280)/10; sd=tools.randominteger(1,40)/10}
			
			let r = el.tag==="circle" ? tools.randominteger(4,48)/100 : tools.randominteger(18,60)/100;
			//let cy = el.tag==="line" ? tools.randominteger(0,100)/100 : 0.5;
			if( t===0 || ischange() || t===nticks-1 ) {
				bt = { sw:sw*mult[z-1], sd:sd*mult[z-1], r:r*mult[z-1],sf };
			}
			else { bt = el.b[t-1]; }
			el.b[t] = bt;
		});
	});
	B.elements[z].forEach( (el,j) => {
		[...new Array(Math.floor(nticks/5)).keys()].forEach(x=> {
			let t = tools.randominteger(1,nticks-2);
			el.b[t] = tools.tween(el.b[t-1],el.b[t+1],1,2);
		});

		[...new Array(Math.floor(nticks/3)).keys()].forEach(x=> {
			let t = tools.randominteger(1,nticks-3);
			el.b[t] = tools.tween(el.b[t-1],el.b[t+2],1,3);
			el.b[t+1] = tools.tween(el.b[t-1],el.b[t+2],2,3);
		});
		[...new Array(Math.floor(nticks/2)).keys()].forEach(x=> {
			let t = tools.randominteger(1,nticks-4);
			el.b[t] = tools.tween(el.b[t-1],el.b[t+3],1,4);
			el.b[t+1] = tools.tween(el.b[t-1],el.b[t+3],2,4);
			el.b[t+2] = tools.tween(el.b[t-1],el.b[t+3],3,4);
		});

		//console.log(`el.b[0] = ${JSON.stringify(el.b[0])}`);
		//console.log(`el.b[nticks-1] = ${JSON.stringify(el.b[nticks-1])}`);
		Bfilm.elements[z][j].b = [...new Array(nticks).keys()].flatMap( t => { 
			//console.log(`t=${t}`);
			let p1 = el.b[t];
			let p2 = el.b[Math.min((t+1),(nticks-1))];
			//console.log(`el.n=${el.n}, j=${j}, p1=${JSON.stringify(p1)}, p2=${JSON.stringify(p2)}`);
			let istween = dotween();
			if(t===0 || t===nticks-1) {istween = 0}
			else if (t>nticks*0.6) {istween = 1}
			else {
				let tag = t<nticks/2 ? "circle" : "line";
				if(Bfilm.elements[z][j].tag===tag) {istween = 1}
			}
			return [...new Array(fps).keys()].map( f => {
				//console.log(`f=${f} t=${t} istween=${istween}`);
				let step = istween ? tools.tween(p1,p2,f,fps) : el.b[tools.randominteger(0,el.b.length)];
				//console.log(`p1=${JSON.stringify(p1)} p2=${JSON.stringify(p2)} step = ${JSON.stringify(step)}`);
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
	${JSON.stringify(B, null, "\t")};
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
