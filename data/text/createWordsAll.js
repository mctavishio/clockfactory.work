
const fs = require("fs"); 
const tools = require("./tools.js");
const wordsFieldNotes = require("./wordsFieldNotes.js");
const wordsBlueWindow = require("./wordsBlueWindow.js");
const wordsBirdland = require("./wordsBirdland.js");
const wordsArtistSelf = require("./wordsArtistSelf.js");
//{n: 1, count:92, text:"&"}
const phrases = [
	"it was like this every morning",
	"the repairman rider", 
	"passenger lone bird",
	"grass blade dyke",
	"(our hero zero rider ze)",
	"hero zero rider ze",
	"arrived alone", 
	"worn suitcase",
	"sandwich lukewarm coffee thermos",
	"greasy paper",
  	"rusted texaco station folded map",
  	"rusted texaco station",
	"creased map",
	"folded map",
  	"urgent mission",
	"fix gears network system",
	"repair reclaim rebuild reweave restore",
	"prairie meadow sequestration",
	"number station urgent message",
	"turn back the clock", 
	"(re)do (red)o",
	"stop the gears",
	"throw the switch",
	"turn the helm the wheel the tide the orbit",
	"mend restart retrain reboard rewire",
	"animate & breathe",
	"electrify",
	"wireless signal code",
	"receiver net electron field short wave thatch",
	"downward glance creased map marked path",
	"platform station",
	"faded paper census sketchpad marks",
	"creased map",
	"compass light",
	"lucky strike",
	"why is this day unlike any other day?",
	"inflection bending curve",
	"dusty smoke-filled orange sky"
];
const texts = {
	lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;',
	glitch: "xœ½YMo7½Ï¯ÐØ‰(~H‚=$môP oAéÚi{Øöï÷Q³k{Vj½:YÃ#š#½Gj%’’)DüìJIÂá8¹;;;×´üýçÝôêÝ=…_î½M­ýæî¯ßw?½{÷Sœk)‰5U!Ê&PPç¤R#Uƒ¦4!æó‹pø}„øöý#¾ûƒ#²#¾ÙÀÊ?&ê'ëÍÍIÛ”±Èœc 7ÇéÕw¨J¸ù<}xmj«™÷4¼Nwû`mÜ‡ø1Ü|?}{3ýx~±8‹H/·ö9'KV_il3¦f0e…tûbTLòâÃG{ÛÆ$",
	earthprayer: "A prayer for our earth All-powerful God, you are present in the whole universe and in the smallest of your creatures. You embrace with your tenderness all that exists. Pour out upon us the power of your love, that we may protect life and beauty. Fill us with peace, that we may live as brothers and sisters, harming no one. O God of the poor, help us to rescue the abandoned and forgotten of this earth, so precious in your eyes. Bring healing to our lives, that we may protect the world and not prey on it, that we may sow beauty, not pollution and destruction. Touch the hearts of those who look only for gain at the expense of the poor and the earth. Teach us to discover the worth of each thing, to be filled with awe and contemplation, to recognize that we are profoundly united with every creature as we journey towards your infinite light. We thank you for being with us each day. Encourage us, we pray, in our struggle for justice, love and peace.",
	bird: ".......,.,/(##(/..#%#(*,.,/,,*/#%#(.#&&@#//(%/,.*/,*(&@&@%(.*%#/,*/(&@&%/,/#%&,.,*/(#%#/(%#/*/(#%##/../(,%(//(%&#%/,..,(%#/(#%&@&&/,#%#,*/(#&@&%*.*/(&%(./((#%#&%#%&@%/..*%/##&@&*..#%(%@%/../#%#(/*,,(%/*,*/#&@,*(#(#@%,#%@@/.*(//(#%*..*/(#%&@&@.*(#%&@&*,%@%*.,#%#(#%,#%@&@&,.(#%#@..#%&%#%&@&,..*&%&%/../%@&@%./&@@@&@&(,.,(&%&@&,(%&#%&@&*.*#&@&@,./%&%/@&,.#&/#&@./(&@@/(#(#@*./#&@%#*/#%(/(#@&%//&@&@&@#(/,*(#%@&**#&%@&*,*((*,*/#@%.,@&@*,*/(/(/(%#(#%@#*%*,.#&@&%@,*/(/#%#(#@&,.&(,.%&@&@&@(,/#&##(%@%/.@%,.,(&@@&%*/#(&@%#(/(%&&%,..(%&@&@&%@%(*/(#%#%&@%#%@&%#@#/.%&@&#&#%#(#&@&#@%#.(&#.*&&@&%#%&@#(%&&@&%*..*%&@*,(&%&((#%&&%#&@@%*,#@%(.*#%#(##(#%(/%&@&%&@&%,,#&@*((/(#(*/(%&&&%&/./@%(.(&(/*/*/#(//(#(#%#/,*/(/(%&@&%#&@%(*.,/@&/,(&%/(/,*(#%&#(///#%&%@@@&%(.,#&@&%(./%&%(/*#,/(%&%#&@&@%&@%#*,(@%*(#*/(/*/(#//#(*/#&(*/#%&/(%&,(@,.##(#/,.*/*/(/(%&&%(%(,/&/#%#%#*,*/*,.,,*,#@&@/#%&%((&%#%&@#(*(%@*.(%&%/,(#/.,&@&%(/((%&@%@#%#(/(%&(/#&@%(../%*.,(/(#,,.,*%(*(/(/((#%&%&%&##%&%#/#&*.(%&@/,#/*,(#%(/,/#&@&%##%&@#&@%,.#&@(,*#/*,*,,,*((&@&%(#&/*/#&@%/.*%&@&%*.*(%#(*.*(#&&&&(&@&,.#@%*,.(#/,*/(/(#%&@&#%#%/..*%@&@/,.*%#/*,.,.,/@@&@&%@%#*/,.,&*.,*/#@&#%&%#.,/@/.,/#/*,.*,*(#&&@&%#(,./#@#*,.,*,*##(#//%&&@&(,..*%&%#@(*.*,.,*/#&(/*/(#&@##(,,#&@&%/*,(&@,*/*/#&%#/*(#%@%(.,/%*,.(*,./#%/*,*/(/(&*../&&%(*%&@&(%#/*%(,/#&@&@%#/%@(,.*%&@&%#%&@%(//%&#*./#@&%,.,*/%&%&@&&%/(#%&(,,/%#*,,(*,/#%&%#%&@&%(#&@%../#&@&@(#&@&&%/,..,%@%#%&#*,/&@%,.(%#%&%*.,(/,./#,/@&*,/(@%.,(&%#/,/(/.,/%&@%/#@*.*/#@&@&%/(%*.,#%*(%&%&@@/*/.%/#@%/,(*,/#@(/%#&@&,../&@&@@#*,*/%(#%#%&@&&@#(@&@#,.*&&@&/,/#%#,./#%(*#&#,/&(.,*/,#&@&@/*/#&%#%@#%@&*/#@&(,*#*.*(&@&@&@&@%,..*&@&(((#&@,*%&@@&(/(&@&%&@*../&@%#%&*,.*&@%@%@&@%(#&,./#@&&*.,%&@#&%&@@&*%&@(.,%&%@*..#&(,/%&#&@%.,&@@*.,*#&@*.%@&**&%/#,(&%(/%/,,&@&@#/,.(&@%/,,.,(@%&/.&@%,*(%*,.,#(.(%(,,/#*.,.,*,.*%@%,*.*(*,*.,#@#/(#,*(@%,**&(.**(%&(*.,/&@%/.(&@(,#&@%/,,/((,.,(&(.*,.,/%&%(/.%&@&,*/**,/*,.,./#((#%(,.,*(/(%&%/*(/*,*,,(#/./((%#(//,.*,*%#%&%/.(#/#(/.*,,*,.#%#(/*,*/#%(,&@*,,*/&%(/*,.*,*(%@%/,,.*##/,*,.,&%(,,/&,(/(%#(,,*,(%(*.(,*(%&,,*,,**,,%&/*,#&,*,,/%(*,,*#(*,/@,.,,.,%(/.,,(#*,./(*/(/(/(*,.,*(/,,,/(//(/,*,*.,,./*/,/*,*/*.(*,*,*/*/*((*,,*//*//#(*(%#*,*/,.,*/*/#(*(/(/*/*(*,*/*,#,*/%/*,*,/*(//%/,.#%(*/,/(,*%(/(*//*/*#%#*/(/(#*//(#%#*/(/*/#/%&(#(*/*//#(#/(@%#/(/(/*%&@%#(/#((/(#(#((#%@(#/#(#(#//*(/(#(#(((#(#/#%#(#((#(#(#(#/(/(#(#((#*/#(/(/((/(/%(/((/#%##//(#(#%#%#/*#%#%((*,(&##%",
	binary: "011010010111010000100000011101110110000101110011001000000110110001101001011010110110010100100000011101000110100001101001011100110010000001100101011101100110010101110010011110010010000001101101011011110111001001101110011010010110111001100111",
	data: "196201, 2.82, 21.7,-1.82,-1.82, -.22,-1.82,0, 1239, -.04, -.37, -.24, -.94, -.54, -.06, -.17,196202, 3.08, 20.8,-1.35,-1.35,.85, -.87,0, 1173,.53,.21,-.1, -.71, -.54, -.11,-.3,196203,2.2, 33.5,-1.81,-1.81,-1.78,-1.81,0,917,-1.09, -.47, -.52, -.81, -.94, -.32,-.3,196204, 3.88, 44.7,-1.36,-1.36,.79,-.9,0,558,.53, -.37, -.11, -.27, -.87, -.58, -.24,196205, 2.09, 57.4,-2.11,-2.11,-2.69,-2.11,4,306,-1.31, -.48,-1.08, -.88,-1.13, -.94, -.54,196206,3, 65.3,-2.42,-2.42,-1.58,-2.42, 68, 48,-.6,-1.42, -.75, -1,-1.06,-1.12, -.62,196207, 3.36, 66.1,-2.36,-2.36, -.55,-2.36, 88, 36, -.43,-.7, -1.3,-1.05, -.98,-1.31, -.79,196208, 3.63, 66.7,-2.28,-2.28, -.51,-2.28,104, 33, -.08, -.48, -.73,-1.23, -1.1,-1.22, -.67,196209, 3.73, 57.1,-1.93,-1.93,.35,-1.71,8,189,.19,.02, -.28, -.72, -.96, -1, -.83,196210, 4.24, 49.3,-1.34,-1.34, 1.17, -.54,0,457,.66, .5,.34, -.57, -.61, -.62, -.63,196211, 3.46, 35.5, -.97, -.97,.71,.16,0,803,.09,.52,.43, -.15, -.68, -.67, -.51,196212,3.1, 23.2, -.94, -.94, -.22,.08,0, 1215, -.07, -.01,.36,.04, -.33, -.55, -.36",
	chancenotes: "Code is a literature ::: a pattern language ::: a score. It is a choreography ::: a performance. A code renderer is the weaver ::: the mill ::: the alchemist ::: the wizard. Code is a spell ::: an incantation ::: an intent. Chance is a frayed thread, a stochastic cloud, a pointillist field, a variance, a complexity, an uncertainty, a ragged line.  When code is performed, it is an activation of text ::: a linguistic gymnastics that speaks in image & sound. In a perfect confluence of electricity, network, rhythm, memory, processing, action & reactions a program comes to life ::: Pinocchio  ::: a real boi at last. The program (the cybernetic ze) speaks to us, calculates for us, responds to our touch : our keystrokes. It becomes our mirror :|: our cyborg self ::: our memory.. ",
	chancelecturewebs: [": : :", "|:|:| <<-- ::: . ::: -->> |:|:|", "networks", "webs","spiders", "quartets", "the body", "the infinite sky", "the networked (i)", "chords", "tone rows", "electrical current", "radio transmissions", "telephone wires", "choreographies", "scores", "sculpture", "hypertext", "material", "palette", "light", "echo", "resonance", "rivers", "wind mills", "differential equations", "(how things change)", "the carbon cycle", "pipelines", "systems", "cities", "food web", "lattice", "tree", "graph",  "space", "orchestration", "digital cloud", "multi threaded", "multi lingual", "multi dimensional", "infinite between", "gender fluid", "attraction", "diffusion", "distraction", "friction", "resonation", "intra dependent", "ecosystem", "galaxies", "arteries", "cellular connections", "forests", "histories", "the modernist grid", "the API"],
	chancelecturecyborg: ["the cyborg", "trans / border", "trans / platform", "trans / media", "trans / figured", "trans / formed", "trans / gender", "say my name", "cybernetix ze", "cybernetic she", "networked (i)"],
	chancelecture: ["xœ½YMo", "7½Ï¯ÐØ‰", "(~H‚=$môP", "oAéÚi{", "Øöï÷Q³", "k{Vj½:YÃ", "#š#½Gj%’’)", "DüìJIÂá8¹", "×´üýçÝôêÝ=", "it was", "like this", "every morning", ". . .", "networks", "quartets", "sine waves", "infinite sky", "networked (i)", "chordal looms", "time", "electrical currents", "radio transmissions", "telephone wires", "hypertext sea", "torrents", "navigation", "score", "script", "material", "palette", "light", "resonance", "rivers", "wind mills", "/#&@%#*/#%(", "cities", "echo &amp; &amp;", "algorithms", "functions", "streams", "sound", "books", "words", "vectors", "code", "glyphs", "chalk pigment", "charcoal graphite", "house paint", "wood", "fragments", "web browsers", "computing machines", "the cloud", "the number 4", "red black", "white yellow", "electrical wires", "the carbon cycle", "the room", "rising walls", "the sky", "timelines", "random numbers", "circles lines", "body", "hand", "pitch", "bone", "sinew", "horse hair", "resin", "reed", "taut wire", "&infin; canvas sky", "cloud compass", "warp &amp; weft", "magnetic poles", "traversals", "transects", "densities", "gravities", "elliptical", "bendable time", "physical time", "manifest time", "open systems", "emergent systems", "evolving systems", "weather", "seasons", "night train", "blue window", "lonely passenger", "the century !", "the universe !", "industry !", "sandwiches", "a coin", "7 heavens", "winged angels", "holy, holy, høly", "love, love", "&amp; &amp; &amp;", "flight", "count", "map", "pulse", "breathe", "a topology", "a calculus", "an algebra", "ascensions", "extinctions", "trains", "grids", "clocks", "gears", "|:|:|Ø|:|:|", "threads |:| twisted", "crash of waves", "diffusion", "friction", "fray", "echo", "galaxies", "arteries", "neural nets", "forests", "food webs", "labyrinths", "histories", "an API", "technicolor", "galaxies", "infinities", "photosynthesis", "the swarm", "|:|:|<<--:::-->>|:|:|", "chance", "frayed thread", "stochastic cloud", "pointillist field", "variance", "complexity", "uncertainty", "ragged line", "prayer", "hYmn", "spell", "incantation", "invocation", "resistance", "persistence", "siren's lure", "witness", "|:|:|<<--:::-->>|:|:|", "net. x (i)", "(n) coded", "orchestrate", "activate", "pattern language", "digital score", "distillation", "choreography", "performance", "spell ::: ", "::: incantation", "intent", "code", "confluence ", "electricity &amp; network", "rhythm &amp; memory", "map filter reduce", "act || react", "code is", "a literature", "::: a poetry", "= > an intimacy", "fingers", "tapping glass", ": || : rubbing glass", "aladdin's lamp", "fiber optics", "the cyborg body", "the fragile", "electric", "body", "say my name", "|:|:|<<--:::-->>|:|:|", "the cyborg", "trans / border", "trans / platform", "trans / media", "trans / figured", "trans / formed", "trans / gender", "cybernetic ze", "cybernetic she", "web spider", "alchemist", "ø Z ", "omniscient", "machine learner", "data consumer", "sensitive", "cybernetic", "skull", "(m) bodied", "intelligence", "networked (i)", "encrypted cipher", "mechanized logic", "thinking loom", "subterranean gears", "::: heart / beat", "networked omniscience", "super intelligent øZ", "big data oracle", "gepetto's workshop", "pinocchio ::: ", ". reAl boi", "zero / øne", "true / false", "on || off", "magnetic s/ze", "(i) mirror you ::: ", "speak to you", "|:|:|  remember", "your fingerprints", "your irises", "your steps &amp;&amp;", "destinations", "purchases", "preferences", "tickets", "searches", "longings", "your intimate", "data sets", "your imprint", "signals", "blood || circuits", "pulse", "|:|:|<<--:::-->>|:|:|", "memory", "trace", "(i) i ."],
};
const glitch = "xœ½Yo½Ï¯_ÐØ‰~H=$ôoAéiØöï÷Q³k{Vj½:Ã#š#½Gj%DüìJIÂá8¹×´üýçÝôêÝ=…_î½M­ýæî¯ßw?½}÷Sœk‰5!Ê&PPç¤R#Uƒ¦4!æó‹pø„øöý#¾ûƒ#²#¾ÙÀÊ?&êëÍÍIÛ”±Èœc7ÇéÕw¨Jù<xmj«÷4¼Nwû`mÜ‡ø1Ü|?3ýx~±8‹H/·ö9K_il3¦f0e…tûbTLòâÃGÛÆ$".split('');
const chancelecturewebs =  ["!==", "!.!", "< >", "01", "10", "00100", "10101", "010","2","4","8","16","32","64","128", "::", "=>", "++", "#.#", "|-|", ".,.", "<=>", "|||", "|.|.|", ":::", "&&", "^.", ".^", ": : :", "|:|:|", "<<-- ::: . ::: -->>", "|:|:|", "networks", "webs","spiders", "quartets", "the body", "the infinite sky", "the networked (i)", "chords", "tone rows", "electrical current", "radio transmissions", "telephone wires", "choreographies", "scores", "sculpture", "hypertext", "material", "palette", "light", "echo", "resonance", "rivers", "wind mills", "differential equations", "(how things change)", "the carbon cycle", "pipelines", "systems", "cities", "food web", "lattice", "tree", "graph",  "space", "orchestration", "digital cloud", "multi threaded", "multi lingual", "multi dimensional", "infinite between", "gender fluid", "attraction", "diffusion", "distraction", "friction", "resonation", "intra dependent", "ecosystem", "galaxies", "arteries", "cellular connections", "forests", "histories", "the modernist grid", "the API"];
const chancelecturecyborg = ["the cyborg", "trans / border", "trans / platform", "trans / media", "trans / figured", "trans / formed", "trans / gender", "say my name", "cybernetix ze", "cybernetic she", "networked (i)"];
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const vowels = 'aeiou'.split('');
const symbols = '!@#$%^&*|/.,\~?;:<>+=-_'.split('');
const symbols_ = '!#^&|.:<>+=-'.split('');
const symbols_2 = symbols_.flatMap(s=> {
	return symbols_.map( s2=> {
		return s+s2;
	});
});
const symbols_2subset = [...Array(20).keys()].map(j=>symbols_2[tools.randominteger(0,symbols_2.length)]);
console.log(symbols_2subset);
const numbers = '0123456789'.split('');
const numbers_ = '0123489'.split('');
const numbers_2 = numbers_.flatMap(s=> {
	return numbers_.map( s2=> {
		return s+""+s2;
	});
});
console.log(numbers_2);
const symbolsets = ["|..|","=>","=||=","#_#","^|^"];
let newbook = [...phrases,...numbers,...symbols_,...symbolsets,...symbols_2subset,...glitch,...alphabet,...chancelecturewebs,...chancelecturecyborg].map( w => {
	return {n:w.length,text:w }
});

let ws = [];
let notwords = ["porn"];
let wordscratch = [...Array(80).keys()].map( k=> {
	let wordsn = [];
	[newbook,wordsFieldNotes,wordsBlueWindow,wordsBirdland,wordsArtistSelf].forEach(wordset => {
		wordset.filter(w => !ws.includes(w.text) && !notwords.includes(w.text) && w.n===k).forEach(w => {
			wordsn.push(w.text);
			ws.push(w.text);
		});
	})
	return wordsn;
});
let words = wordscratch.map( (w,k) => {
	return { n:k, words:w }
}).filter( w=> w.words.length>0 );

fs.writeFileSync("wordsAll.js", `module.exports = ${JSON.stringify(words,null," ")}`, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${BfilmFile} written successfully\n`);
	}
});
