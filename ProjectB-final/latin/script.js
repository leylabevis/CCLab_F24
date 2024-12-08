let img;
let sound, amplitude;
let s = 10; 
let isPlaying = false; 

function preload() {
  img = loadImage("redrose.jpg"); 
  sound = loadSound("latin.mp3"); 
}

function setup() {
  let canvas=createCanvas(600, 350);
  canvas.parent("p5-canvas-container")
  img.resize(width, height); 

  amplitude = new p5.Amplitude();
}

function draw() {
  if (!isPlaying) {
    image(img, 0, 0, width, height);
  } else {
    background(220, 5);
    img.loadPixels(); 

    let level = amplitude.getLevel(); 
    let circleMaxSize = map(level, 0, 0.3, 10, 40); 

    for (let n = 0; n < 100; n++) {
      let x = floor(random(img.width)); 
      let y = floor(random(img.height)); 

      let i = (x + y * img.width) * 4; 
      let r = img.pixels[i + 0];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2]; 

      noStroke();
      fill(r, g, b);
      circle(x, y, random(5, circleMaxSize)); 
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
