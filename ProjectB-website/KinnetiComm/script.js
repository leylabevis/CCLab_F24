let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth - 250, 300);
    canvas.parent('interactive'); // Attach to the interactive section
    noStroke();
}

function draw() {
    background(0, 50);
    for (let particle of particles) {
        particle.update();
        particle.show();
    }
    particles = particles.filter(p => !p.isOffScreen());
}

function mouseMoved() {
    let p = new Particle(mouseX, mouseY);
    particles.push(p);
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(5, 15);
        this.color = color(random(255), random(255), random(255));
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
        this.lifespan = 255;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifespan -= 5;
    }

    show() {
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
        ellipse(this.x, this.y, this.size);
    }

    isOffScreen() {
        return this.lifespan <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height;
    }
}
