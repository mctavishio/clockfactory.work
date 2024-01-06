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
const nz = input.nz || 1;
const nblocks = input.nblocks || 5;
const nmin = Math.min(nx,ny);
const nmax = Math.max(nx,ny);
const m = (nx*ny + nx + ny) * nz;
const n = nmin;
const dx = Math.round(100/(nx*nblocks))/100, dy = Math.round(100/(ny*nblocks))/100;
const blockdx = Math.round(100/(nblocks))/100, blockdy = Math.round(100/(nblocks))/100;
//console.log(`colorseq = ${JSON.stringify(colorseq)}`);
const xgrid = input.xgrid;
const ygrid = input.ygrid;
console.log(`xgrid=${JSON.stringify(xgrid)}`);
//const xgrid = tools.shuffle(input.xgrid);
//const ygrid = tools.shuffle(input.ygrid);

let pigmentsets = input.pigmentsets;



//x,y,e,z
let elements = [];
elements[0] = [
	{tag:"rect",role:"rect",b:[],n:0,block:0,x:0,y:0,z:0,e:0,cx:0,cy:0,w:1,h:1,sw:0.01,sf:0,sd:4,so:1,fo:1,strokecolor:pigments.warmblack,fillcolor:pigments.warmlightwhite},
	{tag:"rect",role:"rect",b:[],n:0,block:0,x:0,y:0,z:0,e:1,cx:0.1,cy:0.1,w:0.8,h:0.8,sw:0.01,sf:0.4,sd:1.4,so:1,fo:1,strokecolor:pigments.warmlightgray,fillcolor:pigments.warmlightwhite}
];
let count=0;
[...new Array(nz).keys()].map(z=>z+1).forEach( z=> {
	elements[z] = [];
	[...new Array(nblocks).keys()].forEach( blockx => {
		[...new Array(nblocks).keys()].forEach( blocky => {
			[...new Array(nx).keys()].forEach( x=> {
				[...new Array(ny).keys()].forEach( y=> {
					let e = -1;
					//let cx = xgrid[block*nx+x];
					//let cy = xgrid[block*ny+y];
					let cx = xgrid[blockx*nx+x];
					let cy = xgrid[blocky*ny+y];
					++e;++count;
					elements[z].push({b:[],tag:"rect", role:"rect", blockx,blocky,x,y,z,e,n:count, cx, cy,w:dx,h:dy, so:0.0, fo:1.0, strokecolor:pigments.warmlightwhite, fillcolor:pigments.warmlightwhite});
				});
			});
		});
	});
});

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
const dotween = () => { return tools.randominteger(0,100) < 101 }
const ischange = () => { return tools.randominteger(0,100) > -1 }

/* layer 0
 * rectangle background
 * */
[0].forEach( z => {
	[...new Array(elements[z].length).keys()].forEach( n => { 
		B.elements[z][n].b = [...new Array(nticks).keys()].map( j => {
			return {};
		});
		Bfilm.elements[z][n].b = [...new Array(nticks).keys()].flatMap( j => {
			return [...new Array(fps).keys()].map( t => {
				return {};
			});
		});
	});
});

/* layers 1&above
 * */
[...new Array(nz).keys()].map(z=>z+1).forEach( z => { 
	[...new Array(nticks).keys()].forEach( t => {
		let pigmentcount = Object.keys(pigments).reduce( (acc,x,j) => {
			color = pigments[x];
			acc[color] = 0;
			return acc;
		}, {});
		let blockpigments = [...Array(nblocks).keys()].map( r => {
			let row = [...Array(ny).keys()].map( c => {
				let x = "p1";
				if( (c > 0 && c < (ny-1)) && (r > 0 && r < (nx-1)) ) { 
					x = "p2";
				}
				else if(c===0 && r===0) {
					x = "p4";
				}
				else if(c===ny-1 && r===nx-1) {
					x = "p3";
				}
				else if((c===0||c===ny-1) && (r===0||r===nx)) {
					x = "p3";
				}
				let f = () => {
					let color = pigmentsets[x][tools.randominteger(0,pigmentsets[x].length)]; 
					++pigmentcount[color];
					return color;
				}
				return f;
			});
			return row;
		});
		let blocks = [...Array(nblocks).keys()].map( b => {
			let block = [...Array(nx).keys()].map( r => {
				return [...Array(ny).keys()].map( c => blockpigments[r][c]() )
			});
			return block;
		});
		let blocksrotations = blocks.map( b => {
			let rot1 = b.map( (row,r) => {
				return row.map( (col,c) => {
					return b[c][(nx-r-1)];
				});
			});
			let rot2 = b.map( (row,r) => {
				return row.map( (col,c) => {
					return b[(nx-r-1)][(ny-c-1)];
				});
			});
			let rot3 = b.map( (row,r) => {
				return row.map( (col,c) => {
					return b[(ny-c-1)][r];
				});
			});
			//return [b,rot3,rot2,rot1,b];
			return [b,rot2,b,rot2,b];
		});
		B.elements[z].forEach( (el,j) => {
			let bt = [];
			let fillcolor = blocksrotations[el.blockx][el.blocky][el.x][el.y]; 
			if( t===0 || ischange() || t===nticks-1 ) {
				bt = { fillcolor };
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
