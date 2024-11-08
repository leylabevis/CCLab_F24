// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 50; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0);

  particles.push(new Particle(mouseX, mouseY))

  if(particles.length>200){
    particles.shift()
  }
  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.outerRadius = random(10, 60)
    this.innerRadius = this.outerRadius/2
    this.numPoints = 5
    this.color = color(random(100,255), random(100,255), random(100, 255))
    this.vx = random(-2,2)
    this.vy = random(-2,2)
    this.lifespan = 255
  }
  // methods (functions): particle's behaviors
  update() {
    this.x += this.vx
    this.y += this.vy
    this.lifespan -=0.5
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);

    stroke(245, 194, 10)
    strokeWeight(1)
    fill(this.color)
    beginShape()

    for(let i = 0; i < this.numPoints *2; i++){
      let angle = map(i, 0, this.numPoints *2, 0, TWO_PI)
      let rad = (i % 2 == 0)? this.outerRadius:this.innerRadius
      let px = cos(angle) * rad
      let py = sin(angle) * rad
      vertex(px, py)
    }
    endShape(CLOSE)

    for(let i =0; i<this.numPoints*2; i++){
      let angle = map(i, 0, this.numPoints*2, 0, TWO_PI)
      let rad = (i%2==0)? this.outerRadius: this.innerRadius
      let px = cos(angle)*rad
      let py = sin(angle)*rad

      line(0,0,px,py)
    }
    pop();
  }
}
