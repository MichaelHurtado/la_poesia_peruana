const words = []; // store word objects
let font;  
let colores = ["#212121","#FFF"];
var num = 0;
function preload(){
  font=loadFont("Monoton-Regular.ttf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(colores[num]);
  const str = 'La poesía peruana hace del parricidio una poética.';
  const wordsStr = str.split(' ');
  textSize(48);
  // track word position
  let x = 20;
  let y = 60;
  fill(colores[1-num]);
  textFont(font);
  // iterate over each word
  for (let i = 0; i < wordsStr.length; i++) {
    const wordStr = wordsStr[i] // get current word
    const wordStrWidth = textWidth(wordStr) // get current word width
    const word = new Word(wordStr, x, y, i)
    words.push(word)
    x = x + wordStrWidth + textWidth(' ') // update x by word width + space character
    // look ahead the next word - will it fit in the space? if not, line break
    const nextWordStrWidth = textWidth(wordsStr[i+1]) || 0
    if (x > width - nextWordStrWidth) {
      y += 40 // line height, sort of
      x = 20 // reset x position
    }
  }
}

function draw() {
  background(colores[num])
  for (let i = 0; i < words.length; i++) {
    const word = words[i] // retrieve word object
    word.update()
    word.display()
  }
  stroke(colores[1-num]);
  //point(words[5].x, words[5].y);
  //rect(words[5].x,words[5].y-35,330,40);
}

function keyPressed() {
  if (key === 'r') {
    for (let word of words) word.spread()
  } else if (key === ' ') {
    for (let word of words) word.reset()
    }
}

        class Word {
            constructor(word, x, y, idx) {
                this.word = word
                this.x = x
                this.y = y
                // target position is the same as current position at start
                this.tx = this.x
                this.ty = this.y
                // original position
                this.origx = this.x
                this.origy = this.y
                this.idx = idx
                //this.fcolor = colores[1-num]
            }

            reset() {
                this.tx = this.origx
                this.ty = this.origy
            }

            spread() {
                this.tx = random(width-300)
                this.ty = random(30,height)
            }

            update() {
                // move towards the target by 10% each time
                this.x = lerp(this.x, this.tx, 0.1)
                this.y = lerp(this.y, this.ty, 0.1)
            }

            display() {
                if(this.word=="parricidio"){
                  fill(255,23,68)
                }
                else{
                  fill(colores[1-num])
                }
                noStroke()
                text(this.word, this.x, this.y)
            }
        }
function mouseClicked(){
  num=1-num;
  if(words[5].x<=mouseX && mouseX<=words[5].x+330 && words[5].y-35<=mouseY && mouseY<=words[5].y+5){
    window.open("https://michaelhurtado.github.io/la_poesia_peruana/parricidio.html", "_self");
  }
  else{
    for (let word of words) word.spread()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
