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
const nx = input.nx || 4;
const ny = input.ny || 4;
const nmin = Math.min(nx,ny);
const nmax = Math.max(nx,ny);
const nz = input.nz || 4;
const m = (nx*ny + nx + ny) * nz;
const ne = 4;
const colorseq = [...new Array(nx).keys()].map(x=> {
	return [...new Array(ny).keys()].map(x=> {
		return [...new Array(ne).keys()].map(x=> {
			return [...new Array(nz).keys()].map(z=>z+1).reduce( (acc,z) => {
				let color = allcolors[tools.randominteger(0,allcolors.length)];
				while (color===acc[z-1]) {
					color = allcolors[tools.randominteger(0,allcolors.length)];
				}
				acc.push(color);
				return acc;
			}, [allcolors[tools.randominteger(0,allcolors.length)]]);
		});
	});
});

//console.log(`colorseq = ${JSON.stringify(colorseq)}`);
const xgrid = tools.shuffle(input.xgrid);
const ygrid = tools.shuffle(input.ygrid);

//x,y,e,z
let elements = [];
elements[0] = [{tag:"rect",role:"rect",n:0,x:0,y:0,z:0,e:0,cx:0,cy:0,w:1,h:1,sw:0.8,sf:0,sd:1,so:1,fo:1,strokecolor:pigments.warmblack,fillcolor:pigments.warmlightwhite}];
let count=1;
[...new Array(nz).keys()].map(z=>z+1).forEach( z=> {
	elements[z] = [];
	[...new Array(ny).keys()].forEach( y=> {
		[...new Array(nx).keys()].forEach( x=> {
			elements[z].push({tag:"line", role:"hline", x,y,z,e:0,n:count, cx:xgrid[x], cy:ygrid[y], so:1.0, fo:0.0, strokecolor:colorseq[x][y][0][z], fillcolor:colorseq[x][y][0][z]});
			elements[z].push({tag:"line", role:"vline", x,y,z,e:1,n:count+1, cx:xgrid[x], cy:ygrid[y], so:1.0, fo:0.0, strokecolor:colorseq[x][y][1][z], fillcolor:colorseq[x][y][1][z]});
			elements[z].push({tag:"circle", role:"fcircle", x,y,z,e:2, n:count+2, cx:0.5, cy:0.5, so:0.0, fo:1.0, strokecolor:colorseq[x][y][2][z], fillcolor:colorseq[x][y][2][z]}); 
			elements[z].push({tag:"circle", role:"scircle", x,y,z,e:3, n:count+3, cx:0.5, cy:0.5, so:1.0, fo:0.0, strokecolor:colorseq[x][y][3][z], fillcolor:colorseq[x][y][3][z]}); 
			count = count + ne;
		});
	});
});

let rmax = Math.floor(400/nmax);
let rmin = 18;
const rseq = [...new Array(nticks).keys()].map( t=> {
	return [...new Array(nx).keys()].map( x=> {
		return [...new Array(ny).keys()].map( y=> {
			return tools.randominteger(rmin,rmax)/100;
		});
	});
});
//console.log(`rseq = ${JSON.stringify(rseq,null," ")}`);

let sdmax = Math.floor(40/nmax);
let sdmin = 8;
const sdseq = [...new Array(nticks).keys()].map( t=> {
	return [...new Array(nx).keys()].map( x=> {
		return [...new Array(ny).keys()].map( y=> {
			return tools.randominteger(sdmin,sdmax)/100;
		});
	});
});
//console.log(`sdseq = ${JSON.stringify(sdseq,null," ")}`);

const mult = [...new Array(nticks).keys()].map( t=> {
	let q = tools.randominteger(60,90)/100;
	return [...new Array(nz+1).keys()].map(z=>z+1).map(z=> {
		let qz = [...new Array(z).keys()].reduce( (acc,qz) => {
			return acc*q;
		}, 1);
		return Math.floor(qz*100)/100;
	});
});
//console.log(`mult = ${JSON.stringify(mult,null," ")}`);

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
const dotween = () => { return tools.randominteger(0,100) < 98 }
const ischange = () => { return tools.randominteger(0,100) > 8 }

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
	B.elements[z].forEach( (el,j) => {
		let bframe = [...new Array(nticks).keys()].reduce( (acc,t) => {
			let sw = Math.round(100*rseq[t][el.x][el.y]*mult[t][el.z])/100;
			let r = Math.round(100*rseq[t][el.x][el.y]*mult[t][el.z])/100;
			let sd = Math.round(100*sdseq[t][el.x][el.y]*mult[t][el.z])/100;
			let sf = tools.randominteger(0,100)/100;
			//console.log(`mult[t][el.z] = ${mult[t][el.z]}, rseq[t][el.x][el.y] = ${rseq[t][el.x][el.y]}`);
			let bt = [];
			if( t===0 || ischange() || t===nticks-1 ) {
				bt = { r, sw, sf, sd };
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
