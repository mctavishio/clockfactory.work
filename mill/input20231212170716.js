const input = {
	duration: 1.6, //minutes
	fps: 24,
	score: 1,
	nx:3,ny:3,nz:9,
	allcolors: (pigments)=>{ return [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmlightblack,pigments.warmlightwhite,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack]},
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
module.exports = input;
