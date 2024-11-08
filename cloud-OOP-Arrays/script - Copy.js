
let cloud = [];
let n = 2;
let sound;

function preload(){
    sound = loadSound("assets/thunder.mp3")
}
function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent("p5-container");

    for (let i = 0; i < n; i++) {
        cloud[i] = new Cloud(-random(width), random(height), random(30, 100));
    }

}

function draw() {
    background(255);
    for (let i = 0; i < n; i++) {
        cloud[i].display();
        cloud[i].update();
        cloud[i].putItBack()
        for (let j = 0; j < n; j++) {
            if (i != j) {
                cloud[i].detectCollition(cloud[j]);
            }

        }
    }

}

class Cloud {
    constructor(u, v, s) {
        this.x = u;
        this.y = v;
        this.s = s;
        this.speedY = map(this.s, 30, 100, 0.03, 0.001);
        this.speedX = map(this.s, 30, 100, 2, 0.5);
        this.h = random(360);
        this.sound = sound;
    }
    display() {
        push();
        colorMode(HSB);
        translate(this.x, this.y);
        push();
        stroke(0);
        strokeWeight(this.s/10);
        noFill();
        beginShape();
        let lineLength = this.s * 1.1;
        for (let i = -this.s * 1.1; i <= lineLength; i += lineLength / 20) {
            let v = 10 * sin(frameCount * 0.1 - 0.05 * i);
            vertex(i, v);
            // circle(i, v, 5);
        }
        endShape();
        pop();

        fill(this.h, 30, 100);
        noStroke();
        circle(0, 0, this.s);
        for (let a = 0; a < 2 * PI; a += PI / 6) {
            push();
            translate(0, 0);
            rotate(a);
            circle(this.s * 0.5, this.s * 0.3, this.s * 0.5);
            pop();
        }
        fill(0);
        circle(-this.s * 0.3, 0, this.s * 0.05);
        circle(this.s * 0.3, 0, this.s * 0.05);
        arc(0, 0, this.s * 0.3, this.s * 0.3, 0, PI);
        pop();
    }
    update() {
        this.x = this.x + this.speedX;
        this.y = lerp(this.y, height * noise(frameCount * this.speedY), 0.1);
    }
    putItBack() {
        if (this.x > width + this.s) {
            this.x = -random(width);
            this.s = random(30, 100);
            this.h = random(360);
        }
    }
    detectCollition(other) {
        let d = dist(other.x, other.y, this.x, this.y);
        if (d < 1.5*(other.s + this.s) / 2) {
            // this.speedX = -this.speedX;
            // other.speedX = -other.speedX;
            this.h = random(100);
            if(this.sound.isPlaying()==false && this.x>-this.s && this.x < width+this.s){
                this.sound.play();
            }
           // sound.play();
        }
    }

}

