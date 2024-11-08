let cloud = [];
let n = 3;
let sound;
let rain = []
function preload() {
   sound = loadSound("assets/thunder.mp3");
}


function setup() {
   createCanvas(400, 400);
   colorMode(HSB);
   for (let i = 0; i < n; i++) {
       cloud[i] = new Cloud(0, random(height), random(50, 100));
   }
   //sound.play();
}


function draw() {
   background(30, 10, 100);
   for (let i = 0; i < n; i++) {
       cloud[i].update();
       cloud[i].display();
       cloud[i].putBack();
       if(cloud[i].cloudIsRaining){
        rain.push(new Rain(cloud[i].x, cloud[i].y, cloud[i].h))
       }
       for (let j = 0; j < n; j++) {
           if (i != j) {
               cloud[i].detectCollition(cloud[j]);
           }
       }
   }
   for(let i=0; i < rain.length; i++){
    rain[i].display()
    rain[i].update()
   }
   while(rain.length > 10){
    rain.splice(0,1)
   }
}
class Rain{
  constructor(x,y,h){
    this.x = random(x-20, x+20)
    this.y = y
    this.h = h;
  }
  display(){
    stroke(this.h, 30, 100)
    strokeWeight(5)
    line(this.x, this.y, this.x, this.y + 5)
  }
  update(){
    this.y = this.y + 10
  }
}

class Cloud {
   constructor(x, y, s) {
       this.x = x;
       this.y = y;
       this.s = s;
       this.speedX = map(this.s, 100, 50, 0.3, 3);
       this.speedY = map(this.s, 100, 50, 0.003, 0.01);
       this.h = random(360);
       this.sound = sound;
       this.cloudIsRaining = false
   }
   display() {
       push();
       translate(this.x, this.y);


       push();
       noFill();
       stroke(this.h, 30, 100)
       strokeWeight(this.s / 10);
       beginShape();
       let lineLength = this.s * 1.1;
       for (let i = -this.s * 1.1; i <= lineLength; i += lineLength / 10) {
           let v = 10 * sin(frameCount * 0.1 - i/(0.2*this.s));
           vertex(i, v);
           //circle(i, v, 5);
       }
       endShape();
       pop();


       noStroke();
       fill(this.h, 30, 100);
       circle(0, 0, this.s);


       for (let a = 0; a < 2 * PI; a += PI / 6) {
           push();
           translate(0, 0);
           rotate(a);
           circle(this.s * 0.5, this.s * 0.3, this.s * 0.5);
           pop();
       }
       fill(0);
       circle(-this.s * 0.3, 0, this.s * 0.05);
       circle(this.s * 0.3, 0, this.s * 0.05);
       arc(0, 0, this.s * 0.3, this.s * 0.3, 0, PI);
       pop();


   }
   update() {
       this.x = this.x + this.speedX;
       this.y = lerp(this.y, height * noise(frameCount * this.speedY), 0.1);
   }
   putBack(){
     if(this.x > width+this.s){
       this.x = -random(width);
       this.h = random(360);
       this.s = random(50, 100);
     }
   }
   detectCollition(other) {
       let d = dist(this.x, this.y, other.x, other.y);
       if (d < 1.5 * (this.s + other.s) / 2) {
           this.h = random(360);
           this.cloudIsRaining = true
           if (this.sound.isPlaying() == false) {
               this.sound.play();
           }
          }else{
            this.cloudIsRaining = false
          }
       }
   }

