const BG = "#FEFEFE";

let imgr=[];
let img;
let x, y, w, h, spx, spy;

let count = 0;
let maxCount = 10;



function preload()
{
  imgr[0] = loadImage("cesar_moro_1.jpg");
  imgr[1] = loadImage("martin_adan_DNI.jpg");
  imgr[2] = loadImage("verastegui_chiquito.jpg");
  imgr[3] = loadImage("blanca_varela.png");
  imgr[4] = loadImage("vallejo_preso.png");
  imgr[5] = loadImage("heraud.jpg");
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	
	pixelDensity(1);
	
	noFill();
	stroke(BG);
	strokeWeight(20);
	
	background(BG);
	init();
	
}

function draw() {

	if(count >= maxCount)
	{
		setProfile();
		
		count = 0;
		maxCount = int(random(3, 8));
	}
	
	accel();
	
	let screenImg = get();
		
	let newImg = createImage(width, height);
	
	newImg.copy(screenImg, x, y, w, h, x, y, w, h);
	
	image(newImg, spx, spy);
	
	rect(0, 0, width, height);
	
	count ++;
}


function setProfile()
{
	if(random() < 0.5)
	{
		x = int(width / 2 + random(-img.width / 2, img.width / 2));
		y = 0;
		w = ceil(random(20, 100));
		h = height;
		spx = 0;
		spy = int(random(-5, 5));
	}
	
	else
	{
		x = 0;
		y = int(height / 2 + random(-img.height / 2, img.height / 2));
		w = width;
		h = ceil(random(20, 100));
		spx = int(random(-5, 5));
		spy = 0;
	}
}

function accel()
{
	if(spx != 0) spx += spx / abs(spx);
	if(spy != 0) spy += spy / abs(spy);
}


function drawGra(_w, _h)
{
	let gra = createGraphics(_w, _h);
	
	let num = 10;
	let spanX = _w / num;
	let spanY = _h / num;
	

	gra.noStroke();
	gra.fill(0);
	
	for(let y = 0; y < gra.height; y+= spanY)
	for(let x = 0; x < gra.width; x+= spanX)
	{
		gra.fill(random(255));
		gra.rect(x, y, spanX, spanY);
	}
	return gra;
}
function init(){
  img=imgr[int(random(6))];	
	const ratio = min(width / img.width, height / img.height) * 0.75;
	
	imageMode(CENTER);
	
	image(img, width / 2, height / 2, img.width * ratio, img.height * ratio);
	
	imageMode(CORNER);
	
	setProfile();
}

function mouseClicked(){
  background(BG);
  init();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
