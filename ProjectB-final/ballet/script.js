let sound, amplitude;
let isPlaying = false;
let particles = [];

function preload() {
  sound = loadSound('adagio.mp3', 
    () => console.log("Sound loaded successfully."),
    (err) => console.error("Sound failed to load:", err)
  );
}

function setup() {
  let canvasWidth = windowWidth * 0.8
  let canvasHeight = windowHeight * 0.6
  let canvas=createCanvas(canvasWidth, canvasHeight);
  canvas.parent("p5-canvas-container")
  colorMode(HSB, 360, 100, 100); 
  background(0);
  amplitude = new p5.Amplitude();
}

function draw() {
  if (isPlaying) {
    background(0, 20); 

    let level = amplitude.getLevel(); 
    let starSize = map(level, 0, 0.5, 5, 200); 

    let x = map(noise(frameCount * 0.01), 0, 1, 0, width);
    let y = map(noise(frameCount * 0.02), 0, 1, 0, height);
    let hue = random(300, 360); 
    let brightness = random(90, 100); 
    particles.push(new StarParticle(x, y, starSize, hue, brightness));

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();

      if (particles[i].alpha <= 0) {
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

class StarParticle {
  constructor(x, y, size, hue, brightness) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.hue = hue;
    this.brightness = brightness;
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
    this.alpha = 255; 
    this.numPoints = 5; 
    this.outerRadius = this.size;
    this.innerRadius = this.size * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    this.size *= 0.98; 
    this.alpha *= 0.98; 
  }

  show() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(this.hue, 20, this.brightness, this.alpha); 
    strokeWeight(1);

    beginShape();
    for (let i = 0; i < this.numPoints * 2; i++) {
      let angle = map(i, 0, this.numPoints * 2, 0, TWO_PI);
      let rad = (i % 2 === 0) ? this.outerRadius : this.innerRadius;
      let px = cos(angle) * rad;
      let py = sin(angle) * rad;
      vertex(px, py);
    }
    endShape(CLOSE);

    for (let i = 0; i < this.numPoints * 2; i++) {
      let angle = map(i, 0, this.numPoints * 2, 0, TWO_PI);
      let rad = (i % 2 === 0) ? this.outerRadius : this.innerRadius;
      let px = cos(angle) * rad;
      let py = sin(angle) * rad;
      line(0, 0, px, py);
    }

    pop();
  }
}
