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

const title = "quilt factory";
const subtitle = datetime;
const description = "algorithmic quilt patterns";
const rooturl = "https://quiltfactory.work";
const authorurl = "https://mctavish.work/index.html";
const author= "mctavish";
const copyright = "Copyright ©2024 mctavish<br/>";
const isbn = "ISBN: 00000<br/>";
const publisher = ". . .";

let filmobj = {
	title, subtitle, description, rooturl,
	authorurl, author, copyright,
	isbn, publisher,
	sections: [],
	poemids: [],
	bookmargin: 0,
	bookguttermargin: 0,
	bleed: 0,
	bookunits: "in",
	bookwidth: 8,
	bookheight: 8,
	bookmargin: 1,
	bookguttermargin: 1.2,
	bleed: 0.125,
	pixelsperunit: 72,
	captionheight: 1,
	cssstyles: "", 
};
let bookobj = {
	title, subtitle, description, rooturl,
	authorurl, author, copyright,
	isbn, publisher,
	sections: [],
	poemids: [],
	bookunits: "in",
	bookwidth: 8,
	bookheight: 8,
	bookmargin: 1,
	bookguttermargin: 1.2,
	bleed: 0.125,
	pixelsperunit: 72,
	captionheight: 1,
	cssstyles: "", 
};

const inputfile = `./input.js`;

const fps = 24;
const spicecolors = [pigments.warmlightwhite, pigments.warmlightwhite, pigments.warmblack, pigments.warmgray, pigments.yellow]; 
const colors = colorsets.warmbw; 
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.yellow,pigments.warmlightwhite,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack];
const colorweights = [
	[pigments.warmlightwhite,8],
	[pigments.warmwhite,0],
	[pigments.warmblack,1],
	[pigments.warmgray,0],
	[pigments.gray,4],
	[pigments.warmlightgray,0],
	[pigments.red,1],
	[pigments.yellow,1],
	[pigments.blue,0],
];

const p1 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,8],
	[pigments.warmblack,0],
	[pigments.gray,4],
	[pigments.blue,0],
	[pigments.red,0],
]);
const p2 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,4],
	[pigments.warmblack,3],
	[pigments.gray,4],
	[pigments.blue,0],
	[pigments.red,0],
]);
const p3 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,1],
	[pigments.warmblack,5],
	[pigments.gray,6],
	[pigments.blue,0],
	[pigments.yellow,1],
]);
const p4 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,0],
	[pigments.warmblack,4],
	[pigments.gray,2],
	[pigments.blue,0],
	[pigments.red,2],
]);

/*
const p1 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,8],
	[pigments.warmblack,0],
	[pigments.gray,2],
	[pigments.blue,0],
	[pigments.red,0],
]);
const p2 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,6],
	[pigments.warmblack,0],
	[pigments.gray,4],
	[pigments.blue,0],
	[pigments.red,1],
]);
const p3 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,2],
	[pigments.warmblack,2],
	[pigments.gray,4],
	[pigments.blue,0],
	[pigments.red,1],
]);
const p4 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,0],
	[pigments.warmblack,1],
	[pigments.gray,2],
	[pigments.blue,0],
	[pigments.red,2],
]);
*/
/*
const p1 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,1],
	[pigments.warmblack,1],
	[pigments.gray,6],
	[pigments.yellow,0],
	[pigments.red,0],
]);
const p2 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,3],
	[pigments.warmblack,1],
	[pigments.gray,4],
	[pigments.yellow,1],
	[pigments.red,0],
]);
const p3 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,5],
	[pigments.warmblack,0],
	[pigments.gray,3],
	[pigments.yellow,1],
	[pigments.red,0],
]);
const p4 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,6],
	[pigments.warmblack,0],
	[pigments.gray,1],
	[pigments.yellow,0],
	[pigments.red,0],
]);
*/
/*
const p1 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,8],
	[pigments.warmblack,0],
	[pigments.gray,4],
	[pigments.blue,0],
	[pigments.red,0],
]);
const p2 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,4],
	[pigments.warmblack,2],
	[pigments.gray,4],
	[pigments.blue,0],
	[pigments.red,1],
]);
const p3 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,1],
	[pigments.warmblack,4],
	[pigments.gray,6],
	[pigments.blue,0],
	[pigments.red,1],
]);
const p4 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,0],
	[pigments.warmblack,2],
	[pigments.gray,2],
	[pigments.blue,0],
	[pigments.red,4],
]);
*/
/*
const p1 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,1],
	[pigments.warmblack,1],
	[pigments.gray,8],
	[pigments.red,1],
]);
const p2 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,3],
	[pigments.warmblack,1],
	[pigments.gray,6],
	[pigments.red,1],
]);
const p3 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,6],
	[pigments.warmblack,1],
	[pigments.gray,3],
	[pigments.red,1],
]);
const p4 = tools.reifyWeightedArray([
	[pigments.warmlightwhite,8],
	[pigments.warmblack,1],
	[pigments.gray,1],
	[pigments.red,1],
]);
*/
const pigmentsets = { p1,p2,p3,p4 }; 

const allcolors = colorweights.flatMap(wx=>{
	return [...new Array(wx[1]).keys()].map( w=>wx[0] );
});

const nx = 5;
const ny = 5;
//nz = nlayers
const nz = 1;
const nblocks = 5;

//const xgrid = [...new Array(nx).keys()].map( j=>Math.floor(100*j/(nx-1))/100 );
//const ygrid = [...new Array(ny).keys()].map( j=>Math.floor(100*j/(ny-1))/100 );
//const ygrid = [...new Array(n).keys()].map(j=>tools.randominteger(0,100)/100).sort( (a,b) => { return a - b } );
//const xgrid = [...new Array(nx).keys()].map( x=>0.5 );
//const ygrid = [...new Array(ny).keys()].map( y=>0.5 );
//for quiltfactory
const xgrid = [...new Array(nx*nblocks).keys()].map( j=>Math.floor(100*j/(nx*nblocks))/100 );
const ygrid = [...new Array(ny*nblocks).keys()].map( j=>Math.floor(100*j/(ny*nblocks))/100 );
console.log(`inputMill:xgrid=${JSON.stringify(xgrid)}`);

const chords = require("./rawChords.js");
const sounddata = require("./rawSoundFiles.js");
//{id: "accordion", keywords:"accordion", file: "accordion.mp3", duration:17.820000, nchannels:2, rate:44100, type:"mp3", bitrate:16},
const stringsnotpluck = sounddata.filter(f=>f.keywords.includes("strings") && !f.keywords.includes("pluck")).map(f=> {
	return [f.id,1,chords[0]]
});  
const stringspluck = sounddata.filter(f=>f.keywords.includes("strings") && f.keywords.includes("pluck")).map(f=> {
	return [f.id,1,chords[0]]
});  
const stringspluck2 = sounddata.filter(f=>f.keywords.includes("strings") && f.keywords.includes("pluck") && !f.keywords.includes("kantele")).map(f=> {
	return [f.id,1,chords[9]]
});  
const stringspluck3 = sounddata.filter(f=>f.keywords.includes("strings") && f.keywords.includes("pluck")&& !f.keywords.includes("kantele")).map(f=> {
	return [f.id,1,chords[0]]
});  
const strings = sounddata.filter(f=>f.keywords.includes("strings")).map(f=> {
	return [f.id,1,chords[0]]
});  
const bowedmetal = sounddata.filter(f=>f.keywords.includes("bowedmetal")).map(f=> {
	return [f.id,1,chords[4]]
});  
const birds = sounddata.filter(f=>f.keywords.includes("bird")).map(f=> {
	return [f.id,1,chords[0]]
});  
const noise = sounddata.filter(f=>f.keywords.includes("noise")).map(f=> {
	return [f.id,1,chords[0]]
});  
const noise2 = sounddata.filter(f=>f.keywords.includes("noise")).map(f=> {
	return [f.id,1,chords[9]]
});  
const coffepot = sounddata.filter(f=>f.id.includes("coffepot")).map(f=> {
	return [f.id,1,chords[0]]
});  
const pianokeys = sounddata.filter(f=>f.keywords==="piano" && !f.keywords.includes("harp")).map(f=> {
	return [f.id,1,chords[9]]
});  
const pianosolo = sounddata.filter(f=>f.id==="piano1").map(f=> {
	return [f.id,1,chords[9]]
});  
const pianosolonoise = sounddata.filter(f=>f.id==="piano1").map(f=> {
	return [f.id,1,chords[11]]
});  
const brass = sounddata.filter(f=>f.keywords.includes("brass")).map(f=> {
	return [f.id,1,chords[4]]
});  
const brasslong = sounddata.filter(f=>f.keywords.includes("brass") && f.keywords.includes("long")).map(f=> {
	return [f.id,1,chords[7]]
});  
const brassshort = sounddata.filter(f=>f.keywords.includes("brass") && f.keywords.includes("short")).map(f=> {
	return [f.id,1,chords[7]]
});  
const brasslong_ad = sounddata.filter(f=>(f.id.includes("_d3_") || f.id.includes("_a2_")) && f.keywords.includes("brass") && f.keywords.includes("long")).map(f=> {
	return [f.id,1,chords[0]]
});  
const brassshort_ad = sounddata.filter(f=>(f.id.includes("_d3_") || f.id.includes("_a2_")) && f.keywords.includes("brass") && f.keywords.includes("short")).map(f=> {
	return [f.id,1,chords[0]]
});  
const afterring = sounddata.filter(f=>f.keywords.includes("afterring")).map(f=> {
	return [f.id,1,chords[4]]
});  
const afterring2 = sounddata.filter(f=>f.keywords.includes("afterring")).map(f=> {
	return [f.id,1,chords[9]]
});
const strange = sounddata.filter(f=>f.keywords.includes("strange")).map(f=> {
	return [f.id,1,chords[9]]
});
const score = [
	//{gain:0.4,padmin:0,padmax:200,list:pianokeys},
	//{gain:0.6,padmin:0,padmax:100,nthreads:2,list:pianosolo},
	//{gain:0.6,padmin:0,padmax:100,nthreads:2,list:pianosolonoise},
	{gain:0.3,padmin:80,padmax:400,nthreads:2,list:brassshort},
	{gain:0.3,padmin:80,padmax:400,list:brasslong},
	{gain:0.3,padmin:80,padmax:400,nthreads:2,list:brasslong},
	//{gain:0.3,padmin:20,padmax:300,nthreads:2,list:noise},
	//{gain:0.2,padmin:0,padmax:100,nthreads:2,list:noise2},
	/*
	{gain:0.4,padmin:0,padmax:100,nthreads:2,list:afterring2},
	{gain:0.4,padmin:0,padmax:20,delay:0.4,duration:0.6,nthreads:2,list:noise},
	*/
	//{gain:0.4,padmin:20,padmax:300,nthreads:2,list:afterring},
	//{gain:0.4,padmin:10,padmax:300,nthreads:3,list:afterring},
	//{gain:0.4,padmin:0,padmax:100,nthreads:2,list:afterring2},
	//{gain:0.4,padmin:0,padmax:20,delay:0.4,duration:0.2,nthreads:2,list:birds},
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
	duration: 1.8, //minutes
	fps: 24,
	chords, sounds,
	score,
	nx, ny, nz,nblocks,
	xgrid, ygrid,
	pigments, colorsets, rawcolorsets,
	pigmentsets,
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
	bookobj,filmobj,
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
