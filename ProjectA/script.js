let x;
let y;
let noiseOffset; 
let xNoiseOffset; 
let yNoiseOffset; 
let bubbles = [];
let tentacleColor; 

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas")
  canvas.parent("p5-canvas-container")
  colorMode(HSB); 
  x = width / 2;
  y = height / 2;

  // Initialize the noise offsets
  noiseOffset = random(1000);
  xNoiseOffset = random(1000);
  yNoiseOffset = random(1000);

  // Tentacle color
  tentacleColor = color(random(360), 80, 100); 

  // Initialize bubbles
  for (let i = 0; i < 20; i++) {
    bubbles.push(createBubble());
  }
}

function draw() {
  let mappedVal = map(mouseY, 0, height, 100, 20);
  background(240, 90, mappedVal);

  // Tentacle position based on noise
  x += map(noise(xNoiseOffset), 0, 1, -2, 2);
  y += map(noise(yNoiseOffset), 0, 1, -2, 2);

  // Keep on the canvas
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);

  // Smooth movement
  xNoiseOffset += 0.01;
  yNoiseOffset += 0.01;

  // Draw the tentacle
  push();
  translate(x, y); 
  stroke(tentacleColor); 

  for (let i = 0; i < 400; i += 10) {
    // Determine if the mouse is close to the tentacle
    let d = dist(mouseX, mouseY, x, y + i / 4);

    // Reaction when mouse is near
    let j;
    if (d < 50) {
      let noiseVal = noise(noiseOffset + i * 0.05 + frameCount * 0.02);
      j = map(noiseVal, 0, 1, -10, 10);
    } else {
      // Regular sine wave movement
      j = 20 * sin((frameCount - i) / 100);
    }

    // Tentacle
    let s = map(i, 0, 400, 30, 4); 
    noFill();
    circle(j, i / 4, s);
  }

  pop();

  // Increment noise offset
  noiseOffset += 0.01;

  updateBubbles();
}

function updateBubbles() {
  for (let bubble of bubbles) {
    // Update vertical position
    bubble.y -= bubble.speed; 

    // Horizontal movement
    let noiseVal = noise(bubble.noiseOffset + frameCount * 0.01);
    bubble.x += map(noiseVal, 0, 1, -1, 1); 

    // Bubble
    fill(bubble.hue, 50, 100, 0.7); 
    noStroke();
    ellipse(bubble.x, bubble.y, bubble.size);

    // Bubble highlight
    colorMode(RGB);
    fill(255, 255, 255, 127);
    let highlightSize = bubble.size * 0.4; 
    ellipse(
      bubble.x - bubble.size * 0.15,
      bubble.y - bubble.size * 0.15,
      highlightSize
    ); 

    colorMode(HSB);

    // Reset bubble
    if (bubble.y < -bubble.size) {
      Object.assign(bubble, createBubble()); 
      bubble.y = height + bubble.size; 
    }
  }
}

function createBubble() {
  return {
    x: random(width), 
    y: height + random(0, 100), 
    size: random(10, 30), 
    hue: random(360),
    speed: random(1, 3), 
    noiseOffset: random(1000),
  };
}

function mousePressed() {
  tentacleColor = color(random(360), 80, 100);
}
