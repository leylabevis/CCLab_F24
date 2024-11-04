let mic;
function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent("p5-container")
    mic = new p5.AudioIn()
    mic.start()
  }
  
  function draw() {
    background(220);
    let level = mic.getLevel()
    // textSize(30)
    // text(level, 50, height/2)
    let s = map(level, 0, 1, 0, 10*width)
    
    circle(width/2, height/2, s)
  }