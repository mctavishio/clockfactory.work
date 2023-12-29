const chords = require("./rawChords.js");
const sounds = require("./rawSoundFiles.js");
const vox = sounds.filter(f=>f.keywords==="vox").map(f=> {
	return [f.id,1,chords[14]]
});  
const pianoall = sounds.filter(f=>f.keywords==="piano").map(f=> {
	return [f.id,1,chords[7]]
});  
const pianokeys = sounds.filter(f=>f.keywords==="piano" && !f.keywords.includes("harp")).map(f=> {
	return [f.id,1,chords[9]]
});  
const pianosolo = sounds.filter(f=>f.id==="piano1").map(f=> {
	return [f.id,1,chords[9]]
});  
const pianosolonoise = sounds.filter(f=>f.id==="piano1").map(f=> {
	return [f.id,1,chords[11]]
});  
const magsmonk = sounds.filter(f=>f.keywords==="mags|vox|monks").map(f=> {
	return [f.id,1,chords[14]]
});  
const magsnotes = sounds.filter(f=>f.keywords==="mags|vox|note").map(f=> {
	return [f.id,1,chords[14]]
});  
const magsclarinetnotes = sounds.filter(f=>{
		return f.keywords==="mags|vox|note" || f.id==="clarinetnotes_d";
	}).map(f=> {
	return [f.id,1,chords[2]]
});  
const beats = sounds.filter(f=>f.keywords.includes("beat")).map(f=> {
	return [f.id,1,chords[4]]
});  
const traffick = sounds.filter(f=>f.keywords.includes("traffick")).map(f=> {
	return [f.id,1,chords[4]]
});  
const bagpipebeats = sounds.filter(f=> {
	let keywords = "beat|bagpipe".split("|");
	let isIn = keywords.reduce( (acc,k) => {
		acc = !f.keywords.includes(k) ? false : acc;
		return acc;
	},false);
	return isIn || f.id==="typewriter1";
}).map(f=> {
	return [f.id,11,chords[4]]
});  
const clarinetnotes = sounds.filter(f=>f.keywords.includes("clarinetnotes")).map(f=> {
	return [f.id,1,chords[0]]
});  
const cellopitch_1 = sounds.filter(f=>f.keywords.includes("cellopitch")).map(f=> {
	return [f.id,1,chords[14]]
});  
const cellopitch = sounds.filter(f=>f.id.includes("cello_pitch3")).map(f=> {
	return [f.id,1,chords[0]]
});  
const stringspluck = sounds.filter(f=>f.keywords.includes("strings") && f.keywords.includes("pluck")).map(f=> {
	return [f.id,1,chords[0]]
});  
const stringsnotpluck = sounds.filter(f=>f.keywords.includes("strings") && !f.keywords.includes("pluck")).map(f=> {
	return [f.id,1,chords[0]]
});  
const strings = sounds.filter(f=>f.keywords.includes("strings")).map(f=> {
	return [f.id,1,chords[0]]
});  
//const bellssparse = sounds.filter(f=>f.id.includes("bell6") || f.id.includes("374273__samulis__tubular-bells-c4-tb_hit_c4_v4_rr1") || f.id.includes("375552__samulis__gong-gong_scrape_3")).map(f=> {
const bellssparse = sounds.filter(f=>f.id.includes("bell11") || f.id.includes("bell2")).map(f=> {
	return [f.id,1,chords[4]]
});  
const bells = sounds.filter(f=>f.keywords.includes("bell")).map(f=> {
	return [f.id,1,chords[4]]
});  
const afterring = sounds.filter(f=>f.keywords.includes("afterring")).map(f=> {
	return [f.id,1,chords[4]]
});  
const noise = sounds.filter(f=>f.keywords.includes("noise")).map(f=> {
	return [f.id,1,chords[4]]
});  
const bowedmetal = sounds.filter(f=>f.keywords.includes("bowedmetal")).map(f=> {
	return [f.id,1,chords[4]]
});  
const cry = sounds.filter(f=>f.keywords.includes("cry")).map(f=> {
	return [f.id,1,chords[4]]
});  
const brass = sounds.filter(f=>f.keywords.includes("brass")).map(f=> {
	return [f.id,1,chords[4]]
});  
const brasslong = sounds.filter(f=>f.keywords.includes("brass") && f.keywords.includes("long")).map(f=> {
	return [f.id,1,chords[7]]
});  
const brassshort = sounds.filter(f=>f.keywords.includes("brass") && f.keywords.includes("short")).map(f=> {
	return [f.id,1,chords[7]]
});  
const brasslong_ad = sounds.filter(f=>(f.id.includes("_d3_") || f.id.includes("_a2_")) && f.keywords.includes("brass") && f.keywords.includes("long")).map(f=> {
	return [f.id,1,chords[0]]
});  
const brassshort_ad = sounds.filter(f=>(f.id.includes("_d3_") || f.id.includes("_a2_")) && f.keywords.includes("brass") && f.keywords.includes("short")).map(f=> {
	return [f.id,1,chords[0]]
});  
let scores = {
	chords,
	orchestrations: [
		[//0
			{gain:0.3,padmin:0,padmax:200,list:strings},
			{gain:0.3,padmin:0,padmax:100,list:afterring},
		],
		[//1
			{gain:0.6,padmin:100,padmax:300,nthreads:6,list:bellssparse},
			{gain:0.4,padmin:200,padmax:600,nthreads:1,list:bells},
			{gain:0.4,padmin:200,padmax:600,nthreads:2,list:afterring},
		],
		[//2
			{gain:0.4,padmin:100,padmax:400,nthreads:4,list:brasslong},
			{gain:0.4,padmin:200,padmax:500,nthreads:2,list:brassshort},
		],
		[//3
			{gain:0.4,padmin:100,padmax:400,nthreads:4,list:brasslong},
			{gain:0.4,padmin:200,padmax:500,nthreads:2,list:afterring},
		],
		[//4
			{gain:0.4,padmin:100,padmax:400,nthreads:2,list:brasslong},
			{gain:0.4,padmin:100,padmax:300,nthreads:3,list:stringsnotpluck},
			{gain:0.5,padmin:200,padmax:500,nthreads:2,list:stringsnotpluck},
		],
		[//5
			{gain:0.4,padmin:0,padmax:80,list:stringspluck},
			{gain:0.4,padmin:0,padmax:100,list:stringspluck},
			{gain:0.4,padmin:10,padmax:100,nthreads:6,list:stringspluck},
			{gain:0.5,padmin:0,padmax:100,delay:.3,duration:.5,nthreads:6,list:stringspluck},
		],
		[//6
			{gain:0.4,padmin:0,padmax:200,list:strings},
			{gain:0.4,padmin:0,padmax:100,list:strings},
		],
		[//7
			{gain:0.5,padmin:0,padmax:100,delay:.3,duration:.5,nthreads:4,list:cry},
			{gain:0.8,padmin:0,padmax:100,delay:.6,duration:.8,nthreads:4,list:cry},
			//{gain:0.4,padmin:0,padmax:400,list:cry},
			{gain:0.4,padmin:0,padmax:100,list:afterring},
			{gain:0.2,padmin:0,padmax:80,list:noise},
		],
		[//8
			{gain:0.4,padmin:100,padmax:400,nthreads:6,list:bells},
			{gain:0.4,padmin:0,padmax:100,list:afterring},
			{gain:0.3,padmin:0,padmax:60,list:[ ["surf",1,chords[9]] ]},
		],
		[//9
			{gain:0.4,padmin:10,padmax:200,delay:.3,duration:.5,nthreads:4,list:brassshort},
			{gain:0.3,padmin:10,padmax:100,nthreads:1,list:brasslong_ad},
			{gain:0.3,padmin:60,padmax:200,delay:.1,nthreads:1,list:brasslong_ad},
			//{gain:0.4,padmin:0,padmax:100,list:afterring},
		],
		[//10
			{gain:0.4,padmin:0,padmax:100,delay:.20,duration:.40,list:beats},
			{gain:0.4,padmin:0,padmax:100,delay:.50,duration:.60,list:beats},
			{gain:1.2,padmin:0,padmax:60,nthreads:6,list:bagpipebeats},
			//{gain:1.2,padmin:0,padmax:60,list:[ ["t0",1,chords[9]] ]},
			{gain:1.2,padmin:0,padmax:60,nthreads:6,list:[ ["thunk",1,chords[12]] ]},
		],
		[//11
			{gain:0.3,padmin:0,padmax:200,list:bowedmetal},
			{gain:0.3,padmin:0,padmax:100,list:afterring},
		],
		[//12
			{gain:0.5,padmin:0,padmax:100,list:beats},
			{gain:0.5,padmin:0,padmax:80,list:beats},
		],
		[//13
			{gain:0.4,padmin:0,padmax:400,list:cry},
			{gain:0.4,padmin:0,padmax:100,list:afterring},
			{gain:0.2,padmin:0,padmax:80,list:noise},
		],
		[//14
			{gain:0.3,padmin:10,padmax:200,list:bowedmetal},
			{gain:0.3,padmin:0,padmax:100,list:afterring},
			{gain:0.3,padmin:0,padmax:60,list:[ ["surf",1,chords[9]] ]},
		],
		[//15
			{gain:0.6,padmin:0,padmax:200,list:magsclarinetnotes},
			{gain:0.4,padmin:0,padmax:100,list:afterring},
		],
		[//16
			{gain:0.4,padmin:0,padmax:200,list:pianokeys},
			{gain:0.6,padmin:0,padmax:100,list:pianosolo},
			{gain:0.4,padmin:80,padmax:400,list:pianosolonoise},
		],
		[//17
			{gain:0.4,padmin:0,padmax:100,list:magsmonk},
			{gain:0.5,padmin:0,padmax:80,list:noise},
		],
		[//18
			{gain:0.3,padmin:10,padmax:200,duration:.60,nthreads:3,list:cellopitch},
			{gain:0.3,padmin:80,padmax:600,delay:.1,duration:.60,nthreads:2,list:cellopitch},
		],
		[
			{gain:0.5,padmin:0,padmax:100,list:beats},
			{gain:0.5,padmin:0,padmax:80,list:beats},
		],
		[
			{gain:0.4,padmin:80,padmax:200,list:bells},
			{gain:0.4,padmin:200,padmax:900,list:afterring},
		],
		[
			{gain:0.6,padmin:80,padmax:200,list:clarinetnotes},
			{gain:0.3,padmin:20,padmax:100,list:clarinetnotes},
			//{gain:0.3,padmin:20,padmax:100,list:clarinetnotes.push(["icebowedvibes1",4,chords[9]])},
		],
		[
			{gain:0.3,padmin:80,padmax:200,list:[ ["vox20200118_8_3b",2,chords[14]], ["monksfromouterspacecistern_c",2,chords[14]],["mctvox1c",2,chords[14]] ]},
			{gain:0.3,padmin:20,padmax:100,list:[ ["vox20200118_8_3b",2,chords[14]],["magsSessionClips_2b",2,chords[14]], ["magsSessionClips_1",2,chords[14]],  ["magsSessionClips_3b",2,chords[14]] ]},
			{gain:0.4,padmin:0,padmax:80,list:[ ["mctbreathing0",4,chords[13]]  ]},
		],
		[
			{gain:0.4,padmin:80,padmax:200,list:[ ["piano3a",2,chords[1]], ["piano3b",2,chords[3]] ]},
			{gain:0.4,padmin:20,padmax:200,list:[ ["piano3a",2,chords[4]], ["piano3b",2,chords[2]] ]},
		],
		[
			{gain:0.3,padmin:0,padmax:100,list:[ ["piano3a",4,chords[9]], ["piano3b",2,chords[9]], ["piano1",2,chords[0]] ]},
			{gain:0.3,padmin:0,padmax:80,list:[ ["thunk",5,chords[3]],["knocking1",2,chords[13]], ["typewriter1",3,chords[9]]  ]},
			{gain:0.4,padmin:0,padmax:80,list:[ ["vox20200118_8_3b",5,chords[3]],["mctbreathing0",2,chords[13]]  ]},
		],
		[
			{gain:0.4,padmin:0,padmax:100,list:[ ["clarinet1",4,chords[14]], ["clarinetnotes_a",2,chords[2]], ["clarinetnotes_e",2,chords[14]], ["clarinetnotes_f",1,chords[14]], ["clarinetnotes_g",1,chords[14]], ["clarinetnotes_b",1,chords[14]], ["clarinetnotes_i",1,chords[14]] ]},
			{gain:0.4,padmin:0,padmax:100,list:[ ["icebowedvibes1",5,chords[1]], ["clarinetnotes_a",2,chords[4]], ["clarinetnotes_e",2,chords[0]] ]},
			{gain:0.2,padmin:0,padmax:80,list:[ ["vox20200118_8_3b",5,chords[3]],["mctbreathing0",2,chords[13]],["train1",1,chords[4]]  ]},
		],
		[
			{gain:0.4,padmin:0,padmax:200,list:[ ["bell6",2,chords[4]], ["bell13",4,chords[9]],["bell11",4,chords[9]] ]},
			{gain:0.3,padmin:100,padmax:400,list:[ ["bell13",4,chords[9]],["bell2",3,chords[9]],["bird2",1,chords[2]],["bird3",1,chords[12]],["bird1",2,chords[12]] ]},
			{gain:0.3,padmin:0,padmax:80,list:[ ["vox20200118_8_3b",3,chords[3]],["mctbreathing0",2,chords[13]],["train1",1,chords[4]]  ]},
		],
		[
			{gain:0.2,padmin:0,padmax:100,list:[ ["clarinet1",4,chords[9]], ["clarinetnotes_a",2,chords[9]], ["clarinetnotes_e",2,chords[9]], ["clarinetnotes_f",1,chords[9]], ["clarinetnotes_g",1,chords[9]], ["clarinetnotes_b",1,chords[9]], ["clarinetnotes_i",1,chords[9]] ]},
			//{gain:0.3,list:[ ["magsSessionClips_3b",1,chords[14]], ["magsSessionClips_1",2,chords[2]],["mctbreathing0",1,chords[2]] ]},
			{gain:0.4,padmin:0,padmax:200,list:[ ["bell13",4,chords[9]],["bell11",4,chords[9]],["bird2",1,chords[2]],["bird3",1,chords[12]],["bird1",2,chords[12]] ]},
			{gain:0.4,padmin:0,padmax:80,list:[ ["vox20200118_8_3b",2,chords[3]],["mctbreathing0",2,chords[13]],["train1",1,chords[4]]  ]},
		],
	] 
};
module.exports = scores;
