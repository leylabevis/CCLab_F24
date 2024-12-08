let particles = [];
let sound;
let amplitude;
let isPlaying = false;

const materialColors = [
  '#F44336', // Red
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#2196F3', // Blue
  '#00BCD4', // Cyan
  '#FF9800'  // Orange
];

function preload() {
  sound = loadSound('hiphop.mp3', 
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
  let canvas=createCanvas(600, 350);
  canvas.parent("p5-canvas-container")
  background(20); 
  amplitude = new p5.Amplitude();
}

function draw() {
  if (isPlaying) {
    background(20, 20, 30, 20); 

    let level = amplitude.getLevel(); 
    let numParticles = int(map(level, 0, 0.5, 1, 20)); 

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(random(width), random(height), level));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(level);
      particles[i].show();

      if (particles[i].size < 2) {
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
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.size = random(10, 40);
    this.speedX = random(-4, 4);
    this.speedY = random(-4, 4);
    this.angle = random(TWO_PI);
    this.color = this.generateColor(); 
    this.sharpness = random(0.5, 2); 
    this.history = []; 
  }

  update(level) {
    this.x += this.speedX * (1 + level * 10);
    this.y += this.speedY * (1 + level * 10);

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    this.history.push(createVector(this.x, this.y));

    if (this.history.length > 10) {
      this.history.shift(); 
    }

    this.size = map(level, 0, 0.5, 10, 60); 
  }

  generateColor() {
    let colorIndex = int(random(materialColors.length));
    return color(materialColors[colorIndex]); 
  }

  show() {
    noStroke();
    
    for (let i = 0; i < this.history.length; i++) {
      let alpha = map(i, 0, this.history.length, 50, 150); 
      fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], alpha); 
      let size = this.size * (i / this.history.length); 
      ellipse(this.history[i].x, this.history[i].y, size, size);
    }

    this.drawSharpShape(this.x, this.y, this.size, this.sharpness);
  }

  drawSharpShape(x, y, size, sharpness) {
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = map(i, 0, 6, 0, TWO_PI);
      let rad = size * (sharpness + sin(angle * 3) * 0.2); 
      let px = x + rad * cos(angle);
      let py = y + rad * sin(angle);
      vertex(px, py);
    }
    endShape(CLOSE);
  }
}
