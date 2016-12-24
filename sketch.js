var urlParams;
(window.onpopstate = function () {
	var match,
		pl     = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query  = window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
	   urlParams[decode(match[1])] = decode(match[2]);
})();
var w = window.innerWidth
var h = window.innerHeight
var pd = window.devicePixelRatio
if(w < h){
	var temp = w
	w = h
	h = temp
}
if(pd > 1 || w < 1000){
	w /= 1.5
	h /= 1.5
}

var mode = urlParams.mode
var to = urlParams.to
var frm = urlParams.from

var g
var objects = []
var message, img

function setup() {
	createCanvas(ceil(w),ceil(h))
	pd = ceil(pd)
	if(mode == "snow"){
		message = "Merry Christmas, " + to + "!"
		g = createVector(0,6)
		for(var i=0; i<floor(width/3); i++){
			objects.push(new Snowflake())
		}
	} else if(mode == "fireworks"){
		message = "Happy New Year, " + to + "!"
		for(var i=0; i<8; i++){
			objects.push(new Firework())
		}
	}

	img = getImage()
	console.log("done")
	background(0)

}

function draw() {
	image(img,0,0)
	for(var i in objects){
		objects[i].update()
		objects[i].render()
	}
}

function getImage(){
	background(51,51,51,0)
	fill(255,255,255,255)
	noStroke()
	textSize(width*3/(50*pd))
	textAlign(CENTER)
	textStyle(BOLD)
	text(message,width/pd/2,height/pd/3)
	text("From "+frm,width/pd/2,height*2/pd/3)

	txtImg = createImage(width*pd,height*pd)

	loadPixels()
	txtImg.loadPixels()
	console.log(txtImg.pixels.length)
	console.log(pixels.length)
	for(var i = 3; i < pixels.length; i+=4){
		txtImg.pixels[i] = 255-pixels[i]
	}
	console.log(txtImg.pixels)
	txtImg.updatePixels()
	return txtImg
}