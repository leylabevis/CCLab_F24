let particles = [];
let sound;
let amplitude;
let isPlaying = false;

function preload() {
  sound = loadSound('adagio.mp3', 
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
  canvas.parent("p5-canvas-container");
  background(0); 
  amplitude = new p5.Amplitude(); 
}

function draw() {
  if (isPlaying) {
    background(20, 20, 30, 20); 

    let level = amplitude.getLevel(); 
    let numParticles = int(map(level, 0, 0.5, 1, 15)); 

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
    this.size = random(5, 20);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.color = this.generateColor(level);
    this.shape = int(random(0, 3)); 
  }

  update(level) {
    this.x += this.speedX * (1 + level * 5);
    this.y += this.speedY * (1 + level * 5);

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    this.size = map(level, 0, 0.5, 5, 50); 
    this.color = this.generateColor(level); 
  }

  generateColor(level) {
    let vibrancy = map(level, 0, 0.5, 150, 255);
    return color(random(100, vibrancy), random(100, vibrancy), random(150, vibrancy), 200);
  }

  show() {
    noStroke();
    fill(this.color);

    if (this.shape === 0) {
      ellipse(this.x, this.y, this.size, this.size); 
    } else if (this.shape === 1) {
      rect(this.x, this.y, this.size, this.size);
    } else if (this.shape === 2) {
      this.drawTriangle(this.x, this.y, this.size); 
    }
  }

  drawTriangle(x, y, size) {
    let h = size * sqrt(3) / 2; 
    triangle(x, y - h / 2, x - size / 2, y + h / 2, x + size / 2, y + h / 2);
  }
}
