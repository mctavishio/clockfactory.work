const fs = require("fs");
const tools = require("./tools.js");
const input = require("./input.js");
const score = input.score;
const chords = input.chords;
//const orchestrationparts = scores.orchestrations[input.score]; 
const nthreads = 4;
const threadlength = input.duration*48;
const rawsoundfiledata = require("./rawSoundFiles.js");
// echo module.exports = [ > soundfiles.js; for file in ?(*.mp3|*.wav); do soxi -D $file | read d ; soxi -c $file | read c ; soxi -r $file | read r ; soxi -t $file | read t ; soxi -p $file | read p ;echo {id:\"${file%.*}\", file:\"$file\", duration:$d, nchannels:$c, rate:$r, type:\"$t\", bitrate:$p}, >> soundfiles.js; done; echo ] >> soundfiles.js;
const prefix = "soundmill002";
/*
const toneweights = [
	//no low no high no noise : minimalist with I II IV V 0
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 2, majIII: 0, miniii: 0, IV: 2, V: 3, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	//no low no high no noise : minor chord with forth 1
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 0, majIII: 0, miniii: 1, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	//no low no high no noise : tight minor chord 2
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 0, majIII: 0, miniii: 1, IV: 0, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	//minor 7th no noise : full minor scale feel 3
	{ lowi: 0, bassi: 1, bassV: 1, bassIV: 1, I: 6, II: 1, majIII: 0, miniii: 2, IV: 2, V: 2, VI: 0, majVII: 0, minvii: 2, VIII: 1, lownoise: 0, midnoise: 1, highnoise: 1, noise:0, buzz: 0 },
	//minor 7th full noise : full minor scale feel 4
	{ lowi: 0, bassi: 1, bassV: 1, bassIV: 1, I: 6, II: 1, majIII: 0, miniii: 1, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 1, midnoise: 1, highnoise: 1, noise:0, buzz: 0 },
	//low midnoise I  and below  5
	{ lowi: 0, bassi: 1, bassV: 1, bassIV: 1, I: 6, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	// no noise fuller low simple I IV V  6
	{ lowi: 0, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 0, IV: 2, V: 2, VI: 0, majVII: 0, minvii: 1, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	//harmonics
	// simple 7
	{ lowi: 1, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 0, IV: 6, V: 6, VI: 0, majVII: 0, minvii: 0, VIII: 2, lownoise: 0, midnoise: 0, highnoise: 0, noise:0, buzz: 0 },
	// pentatonic2 8
	{ lowi: 1, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 3, majIII: 0, miniii: 0, IV: 6, V: 6, VI: 6, majVII: 0, minvii: 0, VIII: 2, lownoise: 1, midnoise: 3, highnoise: 0, noise:0, buzz: 0 },
	// pentatonic 9
	{ lowi: 1, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 6, IV: 6, V: 6, VI: 0, majVII: 0, minvii: 4, VIII: 2, lownoise: 1, midnoise: 3, highnoise: 0, noise:0, buzz: 0 },
	//harmonic 10 
	{ lowi: 1, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 5, majIII: 1, miniii: 5, IV: 9, V: 9, VI: 4, majVII: 1, minvii: 4, VIII: 2, lownoise: 0, midnoise: 0, highnoise: 0, noise:0, buzz: 0 },
	//levels of noise
	// noise 11
	{ lowi: 0, bassi: 1, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 2, VIII: 0, lownoise: 2, midnoise: 2, highnoise: 2, noise: 4, buzz: 2 },
	//simplebuzz 12
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 0, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 1, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 1, noise: 0, buzz: 8 },
	// buzz 13
	{ lowi: 0, bassi: 1, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 1, VIII: 2, lownoise: 1, midnoise: 1, highnoise: 0, noise: 1, buzz: 8 },
	// the identity (I only) 14
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 0, highnoise: 0, noise:0, buzz: 0 },
];
*/


const datetime = new Date();
const timestamp = datetime.getTime();
const datetimestr = datetime.toDateString();
const datetimeISOstr = datetime.toISOString();
const intervals = {
	lowi: basetone => { return basetone/4 },
	bassi: basetone => { return basetone/2 },
	bassIV: basetone => { return basetone*4/6 },
	bassV: basetone => { return basetone*3/2 },
	I: basetone => { return basetone/1 },
	II: basetone => { return basetone*9/8 },
	majIII: basetone => { return basetone*5/4 },
	miniii: basetone => { return basetone*6/5 },
	IV: basetone => { return basetone*4/3 },
	V: basetone => { return basetone*3/2 },
	VI: basetone => { return basetone*5/3 },
	majVII: basetone => { return basetone*15/8 },
	minvii: basetone => { return basetone*9/5 },
	VIII: basetone => { return basetone*2 },
	lownoise: basetone => { return basetone*tools.randominteger(5,9)/10 },
	midnoise: basetone => { return basetone*tools.randominteger(9,11)/10 },
	highnoise: basetone => { return basetone*tools.randominteger(12,18)/10 },
	noise: basetone => { return basetone*tools.randominteger(4,16)/10 },
	buzz: basetone => { return basetone*tools.randominteger(9,12)/10 },
};

const speeds = Object.entries(intervals).reduce( (acc,entry) => {
	acc[entry[0]] = entry[1](1000)/1000;
	return acc;
}, {});
const  baseweights = Object.entries(speeds).reduce( (acc,entry) => {
	acc[entry[0]] = Math.floor(1000/entry[1])/1000;
	return acc;
}, {});

// console.log(`speeds = ${JSON.stringify(speeds)}`);
// console.log(`baseweights = ${JSON.stringify(baseweights)}`);

// const mcompandstr = `gain -4 sinc -n 29 -b 100 8000 mcompand "0.005,0.1 -47,-40,-34,-34,-17,-33" 100 "0.003,0.05 -47,-40,-34,-34,-17,-33" 400 "0.000625,0.0125 -47,-40,-34,-34,-15,-33" 1600 "0.0001,0.025 -47,-40,-34,-34,-31,-31,-0,-30" 6400 "0,0.025 -38,-31,-28,-28,-0,-25" gain 15 highpass 22 highpass 22 sinc -n 255 -b 16 -17500 gain 8 lowpass -1 17801 norm -2 silence -l 1 0.1 1% -1 2.0 1%`;
const mcompandstr = `gain -12 sinc -n 29 -b 100 8000 mcompand "0.005,0.1 -47,-40,-34,-34,-17,-33" 100 "0.003,0.05 -47,-40,-34,-34,-17,-33" 400 "0.000625,0.0125 -47,-40,-34,-34,-15,-33" 1600 "0.0001,0.025 -47,-40,-34,-34,-31,-31,-0,-30" 6400 "0,0.025 -38,-31,-28,-28,-0,-25" gain 15 highpass 22 highpass 22 sinc -n 255 -b 16 -17500 gain 1 lowpass -1 17801 lowpass 2400`;
// const mcompandstr = `gain -6 sinc -n 29 -b 100 8000 mcompand "0.005,0.1 -47,-40,-34,-34,-17,-33" 100 "0.003,0.05 -47,-40,-34,-34,-17,-33" 400 "0.000625,0.0125 -47,-40,-34,-34,-15,-33" 1600 "0.0001,0.025 -47,-40,-34,-34,-31,-31,-0,-30" 6400 "0,0.025 -38,-31,-28,-28,-0,-25" gain 15 highpass 22 highpass 22 sinc -n 255 -b 16 -17500 gain 6 lowpass -1 17801`;
const reverbstr = `reverb 100 50 50`;
//https://digitalcardboard.com/blog/2009/08/25/the-sox-of-silence/comment-page-2/
//const silencestr = `silence 1 0.01 0.05% reverse silence 1 1.5 0.05% reverse`;
//const silencestr = `reverse silence 1 4.5 0.015% reverse`;
const silencestr = `reverse silence 1 0.25 0.015% reverse`;
//const silencestr = `-l 1 0.1 1% -1 2.40 1%`;
const echos = () => {
	//gain-in gain-out <delay decay>
	let gainin = tools.randominteger(6,8)/10;
	let gainout = tools.randominteger(4,8)/10;
	let delay = [tools.randominteger(80,3800),tools.randominteger(800,6400)];
	let decay = [tools.randominteger(3,6)/10,tools.randominteger(3,6)/10];
	return `${gainin} ${gainout} ${delay[0]} ${decay[0]} ${delay[1]} ${decay[1]}`;
};

const tonepads = (min=0,max=100) => { return tools.randominteger(min,max)/100 };
// sox cheat cheat: https://gist.github.com/ideoforms/d64143e2bad16b18de6e97b91de494fd
let soxstr = "";
score.forEach( (line,l) => {
	rawseeds = line.list;
	//console.log(`rawseeds = ${JSON.stringify(rawseeds)}`);
	let soundindexweights = tools.reifyWeightedArray( 
		rawseeds.map( (w,j) => { return [j, w[1]] } ) );

	// reify the rawsoundfileweights
	rawsoundfileweights = rawseeds.map( file => {
		let harmonicweights = file[2];
		// console.log(`harmonicweights = ${JSON.stringify(harmonicweights)}`);
		weights = Object.entries(baseweights).reduce( (acc,entry) => {
			acc[entry[0]] = entry[1]*harmonicweights[entry[0]];
			return acc;
		}, {});
		// console.log(`weights = ${JSON.stringify(weights)}`);
		let notes = tools.reifyWeightedArray( Object.entries(weights).map( w=>{ return [w[0], Math.floor(w[1])] } ) );
		// console.log(`notes = ${notes}`);
		return [file[0],file[1],notes];
	});

	//console.log(`rawsoundfileweights = ${JSON.stringify(rawsoundfileweights)}`);
	//console.log(`soundindexweights = ${JSON.stringify(soundindexweights)}`);
	let nlinethreads = line.nthreads ? line.nthreads : nthreads;
	soxstr = soxstr + [...Array(nlinethreads).keys()].reduce( (threadstr,j) => {
		let dur = 0;
		let filestr = "";
		let threaddur = line.duration ? threadlength*Math.min(line.duration,1.0) : threadlength;
		
		if(line.delay) {
			let del = Math.min(line.delay*threadlength,threaddur-10);
			filestr = filestr + ` "|sox ../../fragments/silence.mp3 -p pad 0 ${del}" `;
			//filestr = filestr + ` "|sox -n -r 44100 -c 2 silence.mp3 trim 0.0 ${line.delay}" `;
			dur += 1 + del;
			//console.log(`delaydur = ${dur}`);
		}
		while(dur < threaddur) {
			let rawsoundfile = rawsoundfileweights[soundindexweights[tools.randominteger(0,soundindexweights.length)]];
			//console.log(`rawsoundfile = ${JSON.stringify(rawsoundfile)}`);
			//console.log(`rawsoundfile[0] = ${rawsoundfile[0]}`);
			//console.log(`rawsoundfiledata=${JSON.stringify(rawsoundfiledata.filter(f => f.id===rawsoundfile[0]))}`);
			let rawsounddur = rawsoundfiledata.filter(f => f.id===rawsoundfile[0])[0].duration;
			//console.log(`rawsounddur = ${rawsounddur}`);
			let notef = rawsoundfile[2][tools.randominteger(0,rawsoundfile[2].length)];
			//console.log(`notef = ${notef}`);
			let speed = intervals[notef](1);
			let tonepad = tonepads(line.padmin,line.padmax);
			dur = dur + rawsounddur/speed + tonepad;
			//console.log(`dur = ${dur}`);
			//console.log(`rawsoundfile = ${rawsoundfile[0]},rawsounddur = ${rawsounddur},  dur = ${dur}, speed = ${speed}`);
			filestr = filestr + ` "|sox ../../fragments/${rawsoundfile[0]}.mp3 -p speed ${speed} pad 0 ${tonepad} norm -4" `;
		}
		//with echo & 
		//with no echo
		threadstr = threadstr + `
sox ${filestr} line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}_echo.mp3 echos ${echos()} norm -2;
sox ${filestr} line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}.mp3 norm -2; `;
		return threadstr;
	},""); 

	soxstr = soxstr + ` 
sox -m line_${l.toString().padStart(3, "0")}_thread_*_echo.mp3 line_${l.toString().padStart(3, "0")}_thread_all_echo.mp3 ${mcompandstr} ${silencestr};
sox -m line_${l.toString().padStart(3, "0")}_thread_*_echo.mp3 line_${l.toString().padStart(3, "0")}_thread_all_echo_reverb.mp3 ${reverbstr} ${mcompandstr}  ${silencestr};
sox -m line_${l.toString().padStart(3, "0")}_thread_*.mp3 line_${l.toString().padStart(3, "0")}_thread_all.mp3 ${mcompandstr}  ${silencestr};
sox -m line_${l.toString().padStart(3, "0")}_thread_*.mp3 line_${l.toString().padStart(3, "0")}_thread_all_reverb.mp3 ${reverbstr} ${mcompandstr} ${silencestr}; `;

/*
	soxstr = soxstr + [...Array(nthreads).keys()].reduce( (threadstr,j) => {
		threadstr = threadstr + ` 
sox -M "|sox -v 0.5 line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 line_${l.toString().padStart(3, "0")}_thread_${(nthreads-j-1).toString().padStart(3, "0")}.mp3 -c1 -p norm -4" line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}_${(nthreads-j-1).toString().padStart(3, "0")}.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${mcompandstr};
sox -M "|sox -v 0.5 line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 line_${l.toString().padStart(3, "0")}_thread_${(nthreads-j-1).toString().padStart(3, "0")}.mp3 -c1 -p norm -4" line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}_${(nthreads-j-1).toString().padStart(3, "0")}_reverb.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${reverbstr} ${mcompandstr};
sox -M "|sox -v 0.5 line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}_echo.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 line_${l.toString().padStart(3, "0")}_thread_${(nthreads-j-1).toString().padStart(3, "0")}_echo.mp3 -c1 -p norm -4" line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}_${(nthreads-j-1).toString().padStart(3, "0")}_echo.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${mcompandstr};
sox -M "|sox -v 0.5 line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}_echo.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 line_${l.toString().padStart(3, "0")}_thread_${(nthreads-j-1).toString().padStart(3, "0")}_echo.mp3 -c1 -p norm -4" line_${l.toString().padStart(3, "0")}_thread_${j.toString().padStart(3, "0")}_${(nthreads-j-1).toString().padStart(3, "0")}_echo_reverb.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${reverbstr} ${mcompandstr};`;
		return threadstr;
	}, "");
*/
});

let linemerge = score.reduce( (acc,line,l) => {
	//console.log("l = "+l);
	let vol = score[l].gain;
acc[0] = acc[0] + ` -v ${vol} line_${l.toString().padStart(3, "0")}_thread_all.mp3 `;
acc[1] = acc[1] + ` -v ${vol} line_${l.toString().padStart(3, "0")}_thread_all.mp3 `;
acc[2] = acc[2] + ` -v ${vol} line_${l.toString().padStart(3, "0")}_thread_all.mp3 `;
acc[3] = acc[3] + ` -v ${vol} line_${l.toString().padStart(3, "0")}_thread_all.mp3 `;
	return acc;
}, ["sox -m ", "sox -m ", "sox -m ", "sox -m "]);

linemerge[0] = linemerge[0]+` line_all_thread_all.mp3 ${mcompandstr} norm -3  ${silencestr}`;
linemerge[1] = linemerge[1] + ` line_all_thread_all_reverb.mp3 ${reverbstr} ${mcompandstr} norm -3  ${silencestr}`;
linemerge[2] = linemerge[2] + ` line_all_thread_all_echo.mp3 ${mcompandstr} norm -3  ${silencestr}`;
linemerge[3] = linemerge[3] + ` line_all_thread_all_echo_reverb.mp3 ${reverbstr} ${mcompandstr} norm -3  ${silencestr}`;
soxstr = soxstr + linemerge.join(" \n");
/*
let linemerge = orchestrationparts.reduce( (acc,line,l) => {
	console.log("l = "+l);
	let vol = orchestrationparts[l].gain;
acc[0] = acc[0] + ` "|sox -v ${vol} line_${l.toString().padStart(3, "0")}_thread_all.mp3 -c1 -p pad ${threadpads()} 0 norm -4" `;
acc[1] = acc[1] + ` "|sox -v ${vol} line_${l.toString().padStart(3, "0")}_thread_all.mp3 -c1 -p pad ${threadpads()} 0 norm -4" `;
acc[2] = acc[2] + ` "|sox -v ${vol} line_${l.toString().padStart(3, "0")}_thread_all.mp3 -c1 -p pad ${threadpads()} 0 norm -4" `;
acc[3] = acc[3] + ` "|sox -v ${vol} line_${l.toString().padStart(3, "0")}_thread_all.mp3 -c1 -p pad ${threadpads()} 0 norm -4" `;
	return acc;
}, ["sox -M ", "sox -M ", "sox -M ", "sox -M "]);

linemerge[0] = linemerge[0]+` line_all_thread_all.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${mcompandstr}`;
linemerge[1] = linemerge[1] + ` line_all_thread_all_reverb.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${reverbstr} ${mcompandstr}`;
linemerge[2] = linemerge[2] + ` line_all_thread_all_echo.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${mcompandstr}`;
linemerge[3] = linemerge[3] + ` line_all_thread_all_echo_reverb.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${reverbstr} ${mcompandstr}`;
soxstr = soxstr + linemerge.join(" \n");
*/

// //sox tornadosiren.mp3 -n spectrogram -m -l -o tornadosiren.png
// //https://upload.wikimedia.org/wikiversity/en/b/b1/Audio.2.SigAnal.1.A.20180213.pdf
// //sox clarinetnotes_e_clarinetnotes_a_line_${l.toString().padStart(3, "0")}_thread_pentatonic_000_003.mp3 -n spectrogram
// //open spectrogram.png
// //play clarinetnotes_e_clarinetnotes_a_line_${l.toString().padStart(3, "0")}_thread_pentatonic_000_003.mp3 lowpass 2400
// // nextsteps = nextsteps + rawsoundfiles.reduce( (nextstepstr,file) => {
// //     threadp.forEach( (p1,j2) => {    
// //     [...Array(nthreads).keys()].forEach( j3 => {
// //         nextstepstr = nextstepstr + `
// //     sox -m ${file}_line_${l.toString().padStart(3, "0")}_thread_${p1.id}_${j3.toString().padStart(3, "0")}.mp3 ${file}_bentthread_${p1.id}_${j3.toString().padStart(3, "0")}.mp3 ${file}_twist_${p1.id}_${j3.toString().padStart(3, "0")}.mp3 gain -4 sinc -n 29 -b 100 8000 mcompand "0.005,0.1 -47,-40,-34,-34,-17,-33" 100 "0.003,0.05 -47,-40,-34,-34,-17,-33" 400 "0.000625,0.0125 -47,-40,-34,-34,-15,-33" 1600 "0.0001,0.025 -47,-40,-34,-34,-31,-31,-0,-30" 6400 "0,0.025 -38,-31,-28,-28,-0,-25" gain 15 highpass 22 highpass 22 sinc -n 255 -b 16 -17500 gain 8 lowpass -1 17801 norm -2 silence -l 1 0.1 1% -1 2.0 1%; `;
// //     });
// //         nextstepstr = nextstepstr + `
// //     sox -m ${file}_bentthread_${p1.id}_*.mp3 ${file}_bentthread_${p1.id}_all.mp3 norm -2; `;
// //     });
// //     return nextstepstr;
// // }, "");



// nextsteps = nextsteps + `
// echo module.exports = [ > outsoundfiles.js; for file in ?(*.mp3|*.wav); do soxi -D $file | read d ; soxi -c $file | read c ; soxi -r $file | read r ; soxi -t $file | read t ; soxi -p $file | read p ;echo {id:\\"$\{file%.*\}\\", file:\\"$file\\", url:\\"https://storage.googleapis.com/soundfactory/${newdir}/$file\\", duration:$d, nchannels:$c, rate:$r, type:\\"$t\\", bitrate:$p}, >> outsoundfiles.js; done; echo ] >> outsoundfiles.js;
// echo cd ${newdir};
// echo bash ${nextstepsfile};
// echo gsutil -m cp -r ${newdir} gs://soundfactory/
// `
// console.log(`newdir = ${newdir}`);
// console.log(`next::: gsutil -m cp -r ${newdir} gs://soundfactory/`);
// console.log(`${nextstepsfile}`);
// // play -M "|sox bell11_harmonictwist_all_fm.mp3 -c1 -p" "|sox -v 1.0 bell11_bendtwist_all_fm.mp3 -c1 -p" remix 1v0.7,2v0.3 1v0.3,2v0.7 norm -2

//   //zip ${newdir}.zip ${newdir};\n
//   //mv ${newdir}.zip ${newdir}/album.zip;\n
//   //run 
//   // echo module.exports = [ > outsoundfiles.js; for file in ?(*.mp3|*.wav); do soxi -D $file | read d ; soxi -c $file | read c ; soxi -r $file | read r ; soxi -t $file | read t ; soxi -p $file | read p ;echo {id:\"${file%.*}\", file:\"$file\", duration:$d, nchannels:$c, rate:$r, type:\"$t\", bitrate:$p}, >> outsoundfiles.js; echo ] >> outsoundfiles.js; done;
//   //add: module.exports = [ ]
//   //replace:
//   //  file:"([a-zA-Z0-9_]*).mp3",
//   //  with
//   //  id: "$1", file:"$1.mp3", url:"https://storage.googleapis.com/soundfactory/${newdir}/$1.mp3",
//   // be sure bucket has public access
//   // gsutil iam ch allUsers:objectViewer gs://soundfactory
//   //  gsutil -m cp -r icedbowedvibes_1641495642737 gs://soundfactory/
//   // play knocking1_knocking1_line_${l.toString().padStart(3, "0")}_thread_pentatonic_001_006.mp3 reverb 100 50 50
//   // play bagpipe1_bagpipe1_line_${l.toString().padStart(3, "0")}_thread_simplebuzz_001_007.mp3 pitch -7 reverb 100 50 50
//   // play bagpipe1f_bagpipe1e_line_${l.toString().padStart(3, "0")}_thread_simple_000_007.mp3 reverb 100 60 40
//   // reverb: usage: [-w|--wet-only] [reverberance (50%) [HF-damping (50%) [room-scale (100%) [stereo-depth (100%) [pre-delay (0ms) [wet-gain (0dB)]]]]]]
//   // bagpipeclick_1642430760765 ::: => play bagpipe1h_bagpipe1h_line_${l.toString().padStart(3, "0")}_thread_pentatonic2_000_007.mp3 reverb 100 60 60 60 30
//   // play -m mctvox1c_line_${l.toString().padStart(3, "0")}_thread_pentatonic_all.mp3 "|sox mctvox1c_line_${l.toString().padStart(3, "0")}_thread_pentatonic_all.mp3 -p speed .9" "|sox mctvox1c_line_${l.toString().padStart(3, "0")}_thread_pentatonic_all.mp3 -p pitch -2" reverb 100 50 50
//   // play piano1_piano3a_line_${l.toString().padStart(3, "0")}_thread_simple_all.mp3 highpass 60 lowpass 2400
//   // play bagpipegeese_bagpiperadio_line_${l.toString().padStart(3, "0")}_thread_noise_001_006.mp3 speed 0.6 reverb 100 50 50
//   // play -m therider0b_f_line_${l.toString().padStart(3, "0")}_thread_pentatonic_all.mp3 "|sox therider0b_f_line_${l.toString().padStart(3, "0")}_thread_pentatonic_all.mp3 -p reverse"
//   // play -m therider0b_a_line_${l.toString().padStart(3, "0")}_thread_pentatonic_all.mp3 "|sox therider0b_c_line_${l.toString().padStart(3, "0")}_thread_pentatonic_all.mp3 -p reverse" speed 4.0 reverb 100 50 50
//   // play -m rider1_b_therider0b_d_line_${l.toString().padStart(3, "0")}_thread_pentatonic_000_003.mp3 "|sox rider1_b_therider0b_d_line_${l.toString().padStart(3, "0")}_thread_pentatonic_000_003.mp3 -p reverse" 
//   // play -m therider0_a_line_${l.toString().padStart(3, "0")}_thread_pentatonic_00*.mp3 highpass 500
//   // play -q birdcry_birdcanyon_line_${l.toString().padStart(3, "0")}_thread_buzz_all.mp3 lowpass 2400
//   // play -q -m birdcry_birdtheme_line_${l.toString().padStart(3, "0")}_thread_pentatonic2_000_003.mp3 birdtheme_birdcanyon_line_${l.toString().padStart(3, "0")}_thread_pentatonic2_000_003.mp3
fs.writeFileSync("runSox.sh", soxstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${nextstepsfile} file written successfully\n`);
	}
});
