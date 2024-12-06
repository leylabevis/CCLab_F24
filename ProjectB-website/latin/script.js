let sound;
let amplitude;
let particles = [];
let isPlaying = false;

function preload() {
  sound = loadSound('latin.mp3', 
    () => {
      console.log("Sound loaded successfully.");
    },
    (err) => {
      console.error("Sound failed to load:", err);
      document.body.innerHTML = '<h1 style="color: white;">Failed to load audio. Please try again.</h1>';
    }
  );
}

function setup() {
  let canvas = createCanvas(600, 300);
  canvas.parent("p5-canvas-container")
  background(0)
  amplitude = new p5.Amplitude();
}

function draw() {
  if (isPlaying) {
    background(0, 0, 0, 20); 

    let level = amplitude.getLevel(); 
    let numParticles = int(map(level, 0, 0.5, 1, 8)); 

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(random(width), random(height), level));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(level);
      particles[i].display();

      if (particles[i].lifespan <= 0) {
        particles.splice(i, 1);
      }
    }
  }
}

function mousePressed() {
  if (isPlaying) {
    sound.pause();
    isPlaying = false;
  } else {
    sound.loop();
    isPlaying = true;
  }
}

class Particle {
  constructor(startX, startY, level) {
    this.x = startX;
    this.y = startY;
    this.outerRadius = random(10, 40); 
    this.innerRadius = this.outerRadius / 2;
    this.numPoints = 5; 
    this.color = this.generateColor(level);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.lifespan = 255;
    this.speedFactor = map(level, 0, 0.5, 2, 6); 
  }

  update(level) {
    this.x += this.vx * this.speedFactor;
    this.y += this.vy * this.speedFactor;
    this.lifespan -= 2; 

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    this.color = this.generateColor(level);
  }

  generateColor(level) {
    let redValue = map(level, 0, 0.5, 150, 255);
    let transparency = map(level, 0, 0.5, 100, 255);
    return color(redValue, random(50, 100), random(0, 50), transparency);
  }

  display() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(this.color);
    strokeWeight(2);

    beginShape();
    for (let i = 0; i < this.numPoints * 2; i++) {
      let angle = map(i, 0, this.numPoints * 2, 0, TWO_PI);
      let rad = (i % 2 == 0) ? this.outerRadius : this.innerRadius;
      let px = cos(angle) * rad;
      let py = sin(angle) * rad;
      vertex(px, py);
    }
    endShape(CLOSE);

    for (let i = 0; i < this.numPoints * 2; i++) {
      let angle = map(i, 0, this.numPoints * 2, 0, TWO_PI);
      let rad = (i % 2 == 0) ? this.outerRadius : this.innerRadius;
      let px = cos(angle) * rad;
      let py = sin(angle) * rad;
      line(0, 0, px, py);
    }

    pop();
  }
}
