const fs = require("fs"); 
const pigments = require("./pigments.js").pigments;
const colorsets = require("./pigments.js").colorsets;
const rawcolorsets = require("./pigments.js").rawcolorsets;
const tools = require("./tools.js");
console.log(process.argv);
let args = process.argv;

let dt = new Date();
let timestamp = dt.getTime();
let datetime = dt.toDateString();

const inputfile = `./input.js`;

const fps = 24;
const spicecolors = [pigments.warmlightwhite, pigments.warmlightwhite, pigments.warmblack, pigments.warmgray, pigments.yellow]; 
const colors = colorsets.warmbw; 
const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.red];
/*
const allcolors = [[[[pigments.warmlightwhite, pigments.warmblack],3],[[pigments.red, pigments.warmlightwhite, pigments.warmblack],1],[[pigments.warmlightwhite, pigments.warmblack],2],[[pigments.warmgray, pigments.warmlightwhite, pigments.warmblack],1]].map(wx=>{
	return [...new Array(wx[1]).keys()].map( w=>wx[0] );
}).flat(2)];
*/
/*
	//allcolors: (pigments)=>{ return [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.red,pigments.warmlightwhite,pigments.warmlightblack,pigments.warmlightwhite,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.yellow,pigments.warmblack]},
	//allcolors: (pigments)=>{ return [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmgray,pigments.warmlightwhite,pigments.warmlightblack,pigments.warmlightwhite,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.yellow,pigments.warmblack,pigments.warmlightwhite,pigments.red,pigments.warmblack]},
	allcolors: (pigments)=>{ return [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.red,pigments.warmlightwhite,pigments.warmlightblack,pigments.warmlightwhite,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.yellow,pigments.warmblack,pigments.warmlightwhite,pigments.red,pigments.warmblack]},
	//allcolors: (pigments)=>{ return [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmlightblack,pigments.warmlightwhite,pigments.blue,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.blue,pigments.warmblack,pigments.warmlightwhite,pigments.blue,pigments.warmblack]},
	//spicecolors: (pigments)=>{ return [pigments.blue]},
	spicecolors: (pigments)=>{ return [pigments.red,pigments.yellow]},
*/
const nx = 4;
const ny = 4;
const nz = 4;

const nrects = 0;
const ncircles = 4;
const nhlines = 4;
const nvlines = 4;
const nlines = 0;

const xgrid = [...new Array(nx).keys()].map( j=>Math.floor(100*j/(nx-1))/100 );
const ygrid = [...new Array(ny).keys()].map( j=>Math.floor(100*j/(ny-1))/100 );
//const ygrid = [...new Array(n).keys()].map(j=>tools.randominteger(0,100)/100).sort( (a,b) => { return a - b } );


const chords = require("./rawChords.js");
const sounddata = require("./rawSoundFiles.js");
//{id: "accordion", keywords:"accordion", file: "accordion.mp3", duration:17.820000, nchannels:2, rate:44100, type:"mp3", bitrate:16},
const pianosolo = sounddata.filter(f=>f.id==="piano1").map(f=> {
	return [f.id,1,chords[9]]
});  
const score = [
	{gain:0.4,padmin:0,padmax:200,list:pianosolo},
	{gain:0.4,padmin:0,padmax:100,list:pianosolo},
];
let soundids = [];
const sounds = score.reduce( (acc,part) => {
	part.list.forEach( instrument => { 
		if(!soundids.includes(instrument[0])) {
			soundids.push(instrument[0]);
			acc.push(sounddata.filter(f => f.id===instrument[0])[0]);
		}
	});
	return acc;
},[]);

const input = {
	duration: 1, //minutes
	fps: 24,
	chords, sounds,
	score,
	nx, ny, nz,
	xgrid, ygrid,
	nrects, ncircles, nlines, nhlines, nvlines,
	pigments, colorsets, rawcolorsets,
	colors, spicecolors, allcolors,
	bookunits: "in",
	bookwidth: 8,
	bookheight: 8,
	bookmargin: 1,
	bookguttermargin: 1.2,
	bleed: 0.125,
	pixelsperunit: 72,
	captionheight: 1,
	cssstyles: "", 
	npoems: 80,
	nstanzas: 3,
	nlines: 4,
	nchars: 48,
	weights: [0,18,22,22,30,24,18,16,14,12,6,4,3,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
};

fs.writeFileSync("inSoundFiles.js", JSON.stringify(sounds,null,"\t"), (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`inSoundFiles file written successfully\n`);
	}
})

let inputstr = `let input =
	${JSON.stringify(input,null,"\t")};
module.exports = input;`

fs.writeFileSync("input.js", inputstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${BfilmFile} written successfully\n`);
	}
});
module.exports = input;
