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
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.yellow,pigments.warmlightwhite,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack];
const colorweights = [
	[pigments.warmlightwhite,9],
	[pigments.warmblack,0],
	[pigments.warmgray,2],
	[pigments.warmlightgray,6],
	[pigments.red,0],
	[pigments.yellow,1],
	[pigments.blue,0],
];

const allcolors = colorweights.flatMap(wx=>{
	return [...new Array(wx[1]).keys()].map( w=>wx[0] );
});

const nx = 3;
const ny = 3;
const nz = 5;

//const xgrid = [...new Array(nx).keys()].map( j=>Math.floor(100*j/(nx-1))/100 );
//const ygrid = [...new Array(ny).keys()].map( j=>Math.floor(100*j/(ny-1))/100 );
//const ygrid = [...new Array(n).keys()].map(j=>tools.randominteger(0,100)/100).sort( (a,b) => { return a - b } );
const xgrid = [...new Array(nx).keys()].map( x=>0.5 );
const ygrid = [...new Array(ny).keys()].map( y=>0.5 );
console.log(`inputMill:xgrid=${JSON.stringify(xgrid)}`);

const chords = require("./rawChords.js");
const sounddata = require("./rawSoundFiles.js");
//{id: "accordion", keywords:"accordion", file: "accordion.mp3", duration:17.820000, nchannels:2, rate:44100, type:"mp3", bitrate:16},
const pianosolo = sounddata.filter(f=>f.id==="piano1").map(f=> {
	return [f.id,1,chords[4]]
});  
const pianosolo2 = sounddata.filter(f=>f.id==="piano1").map(f=> {
	return [f.id,1,chords[1]]
});  
const score = [
	{gain:0.4,padmin:0,padmax:200,list:pianosolo},
	{gain:0.4,padmin:0,padmax:100,list:pianosolo},
	{gain:0.4,padmin:10,padmax:400,list:pianosolo2},
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
	duration: 2, //minutes
	fps: 24,
	chords, sounds,
	score,
	nx, ny, nz,
	xgrid, ygrid,
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
