let dancer;

function setup() {

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  dancer = new LeylaDancer(width / 2, height / 2);
}

function draw() {

  background(0);
  drawFloor(); 

  dancer.update();
  dancer.display();
}
class LeylaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speed = random(0.05, 0.01)
    this.angle = 0
    this.radius = 50
    this.armAngle = 0
  
  }
  update() {
    this.angle += this.speed

    this.x = width/2 + this.radius*sin(this.angle)
    this.y = height/2 + (this.radius/2)*sin(2*this.angle)

  }
  display() {
  
    push();
    translate(this.x, this.y);

 //body
 fill(255);
 noStroke();
 ellipse(0, 30, 150, 200);
 
 // eyes
 fill(0);
 ellipse(-30, -20, 15); 
 ellipse(30, -20, 15); 

 // mouth
 noFill();
 stroke(0);
 strokeWeight(2);
 arc(0, 10, 20, 20, 0, PI); 

 this.armAngle = sin(frameCount*0.1);
 this.armAngle = map(this.armAngle, -1, 1, -PI/10, PI/10);


 pop()
  // arms
  stroke(255);
  strokeWeight(5);
  push()
  translate(this.x-70, this.y+10);
  rotate(this.armAngle)
  line(0, 0, -30, 0); 
  pop()
  push()
  translate(this.x+70, this.y+10);
  rotate(-this.armAngle)
  line(0, 0, 30, 0); 
  pop()
  }
}