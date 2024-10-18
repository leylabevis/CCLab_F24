let x;
let y;
let tentacleOffset = [-75, -25, 25, 75]; 
let noiseOffsets = []; 

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas")
  canvas.parent("p5-canvas-container")
  x = width / 2;
  y = height / 2;
  
  // random noise offsets for each tentacle
  for (let t = 0; t < tentacleOffset.length; t++) {
    noiseOffsets.push(random(1000)); 
  }
}

function draw() {
  background(0);
  noFill();
  
  for (let t = 0; t < tentacleOffset.length; t++) {
    push();
    translate(x + tentacleOffset[t], y); 

    for (let i = 0; i < 400; i += 10) {
      // determines if the mouse is close to tentacle
      let d = dist(mouseX, mouseY, x + tentacleOffset[t], y + i / 4);
      
      // reaction when mouse is near
      let j;
      if (d < 50) { 
        
        let noiseVal = noise(noiseOffsets[t] + i * 0.05 + frameCount * 0.02);
        j = map(noiseVal, 0, 1, -10, 10); 
      } else {
        // regular sine wave movement
        j = 20 * sin((frameCount - i) / 100);
      }

      // circles
      let s = map(i, 0, 400, 60, 6);
      
      stroke(255);
      circle(j, i / 4, s);
    }

    pop();
    
    // increment noise offset
    noiseOffsets[t] += 0.01;
  }
}
