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

const title = "clock factory";
const subtitle = datetime;
const description = "algorithmic sound & drawings";
const rooturl = "https://clockfactory.work";
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
	[pigments.warmlightwhite,12],
	[pigments.warmwhite,0],
	[pigments.warmblack,3],
	[pigments.warmgray,0],
	[pigments.gray,8],
	[pigments.warmlightgray,0],
	[pigments.red,1],
	[pigments.yellow,1],
	[pigments.blue,0],
];

const allcolors = colorweights.flatMap(wx=>{
	return [...new Array(wx[1]).keys()].map( w=>wx[0] );
});

const nx = 3;
const ny = 3;
//nz = nlayers
const nz = 3;

//const xgrid = [...new Array(nx).keys()].map( j=>Math.floor(100*j/(nx-1))/100 );
//const ygrid = [...new Array(ny).keys()].map( j=>Math.floor(100*j/(ny-1))/100 );
//const ygrid = [...new Array(n).keys()].map(j=>tools.randominteger(0,100)/100).sort( (a,b) => { return a - b } );
const xgrid = [...new Array(nx).keys()].map( x=>0.5 );
const ygrid = [...new Array(ny).keys()].map( y=>0.5 );
console.log(`inputMill:xgrid=${JSON.stringify(xgrid)}`);

const chords = [
	//no low no high no noise : minimalist with I II IV V 0
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 2, majIII: 0, miniii: 0, IV: 2, V: 3, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	// pentatonic 9
	{ lowi: 0, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 6, IV: 6, V: 6, VI: 0, majVII: 0, minvii: 4, VIII: 2, lownoise: 1, midnoise: 3, highnoise: 0, noise:0, buzz: 0 },
	// no noise fuller low simple I IV V  6
	{ lowi: 0, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 0, IV: 2, V: 2, VI: 0, majVII: 0, minvii: 1, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
];
const sounddata = require("./rawSoundFiles.js");
//{id: "accordion", keywords:"accordion", file: "accordion.mp3", duration:17.820000, nchannels:2, rate:44100, type:"mp3", bitrate:16},
const piano1 = sounddata.filter(f=>f.keywords.includes("piano") && !f.keywords.includes("harp")).map(f=> {
	return [f.id,1,chords[1]]
});  
const piano2 = sounddata.filter(f=>f.keywords.includes("piano") && !f.keywords.includes("harp")).map(f=> {
	return [f.id,1,chords[2]]
});  
const train = sounddata.filter(f=>f.keywords.includes("train")).map(f=> {
	return [f.id,1,chords[0]]
});  
const radio = sounddata.filter(f=>f.keywords.includes("radio")).map(f=> {
	return [f.id,1,chords[0]]
});  
const noise = sounddata.filter(f=>f.keywords.includes("noise")).map(f=> {
	return [f.id,1,chords[0]]
});  
const noise1 = sounddata.filter(f=>f.keywords.includes("noise")).map(f=> {
	return [f.id,1,chords[1]]
});  
const noise2 = sounddata.filter(f=>f.keywords.includes("noise")).map(f=> {
	return [f.id,1,chords[2]]
});  
const brass = sounddata.filter(f=>f.keywords.includes("brass")).map(f=> {
	return [f.id,1,chords[0]]
});  
const bells = sounddata.filter(f=>f.keywords.includes("bell")).map(f=> {
	return [f.id,1,chords[1]]
});  
const afterring = sounddata.filter(f=>f.keywords.includes("afterring")).map(f=> {
	return [f.id,1,chords[1]]
});  
const  reed = sounddata.filter(f=>f.keywords.includes("reed")).map(f=> {
	return [f.id,1,chords[0]]
});  
const score = [
	{gain:0.4,padmin:0,padmax:300,nthreads:2,list:reed},
	{gain:0.4,padmin:0,padmax:100,nthreads:2,list:radio},
	{gain:0.4,padmin:0,padmax:100,nthreads:2,list:train},
	{gain:0.4,padmin:0,padmax:300,nthreads:2,list:noise2},
	{gain:0.4,padmin:0,padmax:300,nthreads:2,list:noise1},
	{gain:0.4,padmin:0,padmax:300,nthreads:2,list:noise},
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
	duration: 0.8, //minutes
	fps: 24,
	//chords, sounds,
	sounds,
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
