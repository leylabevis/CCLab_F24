
let b = []
let img
function preload(){
    img = loadImage("cloud.jpg")
}
function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent("p5-container");
    // for(let i=0; i<30; i++){
    //     b[i] = new Bubble()
    // }
}

function draw() {
    background(0, 0, 255);
    for(let i=0; i<b.length; i++){
        b[i].update()
        b[i].display()
        b[i].putBack()
    }
}
function mousePressed(){
    b.push(new Bubble(mouseX, mouseY))
}

class Bubble{
    constructor(x,y){
    this.x = random(width)
    this.y = random(height)
    this.s = random(5, 50)
    this.speed = map(this.s, 5, 50, 3, 0.5)
    this.osc = new p5.TriOsc()
    this.envelope = new p5.Env()
    // set attackTime, decayTime, sustainRatio, releaseTime
    this.envelope.setADSR(0.001, 0.5, 0.01, 0.1);
    // set attackLevel, releaseLevel
    this.envelope.setRange(1, 0);
    }
display(){
    fill(255, 100)
    noStroke()
    circle(this.x, this.y, this.s)
}

update(){
    this.y = this.y - this.speed
}
putBack(){
    if(this.y < this.s/2){
        this.osc.start()
        let freq = map(this.s, 5, 50, 1000, 40);
        this.osc.freq(freq)
        this.envelope.play(this.osc, 0, 0.1);
        this.y = random(height + this.s, 2*height)
    }
}
}