let particles = [];
let sound;
let amplitude;
let isPlaying = false;

function preload() {
  // Load the new audio file
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
  createCanvas(windowWidth, windowHeight);
  background(20); // Set initial background
  amplitude = new p5.Amplitude();

  // Automatically start playing music
  if (sound.isLoaded()) {
    sound.loop();
    isPlaying = true;
  }
}

function draw() {
  if (isPlaying) {
    background(20, 20, 30, 20); // Semi-transparent background for fading effect

    let level = amplitude.getLevel(); // Get current amplitude
    let numParticles = int(map(level, 0, 0.5, 1, 15)); // More particles at higher amplitude

    // Add new particles based on amplitude
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(random(width), random(height)));
    }

    // Update and display particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(level);
      particles[i].show();

      // Remove particles that are too small
      if (particles[i].size < 2) {
        particles.splice(i, 1);
      }
    }
  }
}

function mousePressed() {
  // Toggle play/pause on click
  if (isPlaying) {
    sound.pause();
    isPlaying = false;
  } else {
    sound.loop();
    isPlaying = true;
  }
}

// Particle Class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 20);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.color = color(random(100, 255), random(100, 200), random(150, 255), 200);
  }

  update(level) {
    // Move particle based on speed and amplitude
    this.x += this.speedX * (1 + level * 5);
    this.y += this.speedY * (1 + level * 5);

    // Wrap around canvas
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    // Adjust size and color vibrancy with amplitude
    this.size -= 0.1;
    let vibrancy = map(level, 0, 0.5, 150, 255);
    this.color = color(random(100, vibrancy), random(100, vibrancy), random(150, vibrancy), 200);
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
