let cloud
let cloud2

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent("p5-container");
    x = width/2
    y = height/2
    cloud = new Cloud(random(width), 0, random(50, 100))
    //cloud2 = new Cloud(random(width), 0, 50)
}
function draw() {
    background(220);
    cloud.show()
    //cloud2.show()
}

class Cloud{
    constructor(u, v, s){
        this.x = u
        this.y = v
        this.s = s
        this.speed = random(0.005, 0.01)
        this.h = random(360)
    }
    show(){
        push()
        colorMode(HSB)
        translate(this.x, this.y)
        noStroke()
        fill(this.h, 40, 100)
        //main circle
        circle(0, 0, this.s)
        //circles around
        for(let a=0; a<2*PI; a+=PI/6){
            push()
            rotate(a)
            circle(this.s*0.5, 0, this.s*0.5)
            pop()
    }
    //face
    fill(0)
    circle(-this.s*0.3, 0, this.s*0.05)
    circle(this.s*0.3, 0, this.s*0.05)
    arc(0, 0, this.s*0.3, this.s*0.3, 0, PI)
    pop()

    this.y = height*noise(frameCount*this.speed)
    }
   
}