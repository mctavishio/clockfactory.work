const fs = require("fs"); 
const tools = require("./tools.js");
const wordsAll = require("./wordsAll.js");
const input = require("./input.js");
const npoems = input.npoems || 80;
const nstanzas = input.nstanzas || 3;
const nlines = input.nlines || 4;
const nchars = input.nchars || 48;
const chcounts = wordsAll.map(w=>w.n);
//const chcounts = [...Array(8).keys()].map(k=>k+1);
const weights = input.weights || [0,8,12,12,20,14,8,6,4,2];
const wchcounts = [...weights.keys()].map(k=>k+1).filter(k=>chcounts.includes(k)).flatMap(k=>{
	return [...Array(weights[k]).keys()].map(w=>k);  
});
console.log(wchcounts);
let rawpoems = [...Array(npoems).keys()].map(p=>{
	let poem = [...Array(nstanzas).keys()].map(s=>{	
		let stanza = [...Array(nlines).keys()].map(l=>{	
			let count = 0;
			let line = [];
			while(count<nchars) {
				console.log(`nchars-count = ${nchars-count}`);
				let chcts = wchcounts.filter(c => c <= (nchars-count) );
				let n = chcts[tools.randominteger(0,chcts.length)];
				console.log(n);
				count = count + n + 1;
				let choices = wordsAll.filter(w => w.n===n)[0].words;
				let word = choices[tools.randominteger(0,choices.length)];
				line.push(word+" ");
			}
			return tools.shufflearray(line).join("");
		});
		return stanza;
	});
	return {title:"poem " + p, lists:poem}
});
let rawpoemsstr = `module.exports = ${JSON.stringify(rawpoems,null," ")}`;
console.log(`rawpoems = ${JSON.stringify(rawpoems,null,"\t")}`);
fs.writeFileSync("rawPoemsList.js", rawpoemsstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${BfilmFile} written successfully\n`);
	}
});
