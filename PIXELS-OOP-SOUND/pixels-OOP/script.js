let mycloud = [];
let open = false;
let p_open = true;

var capture;
var tracker
var w = 640,
    h = 480;

function setup() {

    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function () {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    let canvas = createCanvas(w, h);
    canvas.parent("p5-container");

    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function draw() {
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();

    noFill();
    stroke(255);

    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(map(i, 0, positions.length, 0, 360), 50, 100);
        ellipse(positions[60][0], positions[60][1], 4, 4);
        text(60, positions[60][0], positions[60][1]);
        ellipse(positions[57][0], positions[57][1], 4, 4);
        text(57, positions[57][0], positions[57][1]);
    }

    if (positions.length > 0) {
        let d = dist(positions[60][0], positions[60][1], positions[57][0], positions[57][1]);
        textSize(20);
        text(d, 100, 100);
        rect(20, 20, d * 3, 20);

        if (d > 20) {
            open = true;
        } else {
            open = false;
        }
        if (p_open != open && open == true) {
            mycloud.push(new Cloud(positions[57][0], positions[57][1], random(40, 80)));
        }

    }

    for (let i = 0; i < mycloud.length; i++) {
        mycloud[i].display();
        mycloud[i].update();
    }
    for (let i = mycloud.length - 1; i >= 0; i--) {
        let b = mycloud[i];
        if (mycloud[i].x > width) {
            mycloud.splice(i, 1); // (index, quantity)
        }
    }
    p_open=open;

}

class Cloud {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.speedX = map(this.s, 100, 50, 0.3, 3);
        this.speedY = map(this.s, 100, 50, 0.003, 0.01);
        this.h = random(360);
    }
    display() {
        push();
        translate(this.x, this.y);

        push();
        noFill();
        stroke(this.h, 30, 100);
        strokeWeight(this.s / 10);
        beginShape();
        let lineLength = this.s * 1.1;
        for (let i = -this.s * 1.1; i <= lineLength; i += lineLength / 10) {
            let v = 10 * sin(frameCount * 0.1 - i / (0.2 * this.s));
            vertex(i, v);
            //circle(i, v, 5);
        }
        endShape();
        pop();

        noStroke();
        fill(this.h, 30, 100);
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

}
