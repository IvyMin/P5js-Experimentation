let MAX_PARTICLES = 400;
let shapes = [];
let drawing = false;
//ARRAYS
let particles = [];
let pool = [];


let wander1 = 0.5;
let wander2 = 4.0;
let drag1 = .9;
let drag2 = .99;
let force1 = 2;
let force2 = 8;
let theta1 = -0.5;
let theta2 = 0.5;
let size1 = 180;
let size2 = 240;
let sizeScalar = 0.99;


// The Particle ES6
class Particle {
    constructor(x, y, size) {
        this.alive = true;
        this.size = size || 10;
        this.end = random(80, 150);
        this.wander = 0.25;
        this.theta = random(TWO_PI);
        this.drag = 0.92;
        this.rot = 0;
        this.shape;
        this.location = createVector(x || 0.0, y || 0.0);
        this.velocity = createVector(0.0, 0.0);
    }
    move() {
        this.location.add(this.velocity);
        this.velocity.mult(this.drag);
        this.theta += random(theta1, theta2) * this.wander;
        this.velocity.x += sin(this.theta) * 0.02;
        this.velocity.y += cos(this.theta) * 0.02;
        if (this.size > this.end) {
            this.size *= sizeScalar;
            this.rot += (random(0.01, 0.07) / this.drag);
        }
        this.alive = this.size > this.end;
    }
    show() {
        //fill(this.color);
        noStroke();
        push();
        translate(this.location.x, this.location.y);
        rotate(this.rot);
        image(this.shape, -this.size / 2, -this.size / 2, this.size, this.size);
        //ellipse(0, 0, this.size, this.size);
        pop();
    }
}


let spawn = (x, y) => {
    var particle, theta, force;
    if (particles.length >= MAX_PARTICLES) {
        pool.push(particles.shift());
    }
    particle = new Particle(mouseX, mouseY, random(size1, size2));
    particle.wander = random(wander1, wander2);
    particle.shape = random(shapes);
    particle.drag = random(drag1, drag2);
    theta = random(TWO_PI);
    force = random(force1, force2);
    particle.velocity.x = sin(theta) * force;
    particle.velocity.y = cos(theta) * force;
    particles.push(particle);
}

let update = () => {
    var i, particle;
    for (i = 0; i < particles.length; i++) {
        particle = particles[i];
        if (particle.alive) {
            particle.move();
        }
    }
}

let moved = () => {
    var particle, max, i;
    max = random(1, 4);
    for (i = 0; i < max; i++) {
        spawn(mouseX, mouseY);
    }
}


// Usual preload, setup, draw

preload = () => {
    for (let i = 0; i < 7; i++) {
        shapes[i] = loadImage('img/plant' + (i + 1) + ".svg");
    }
}

setup = () => {
    createCanvas(windowWidth, windowHeight);
        background(0);

}

draw = () => {
    if (drawing) moved();
    update();
    background(255);
    for (let i = 0; i < particles.length; i++) {
        particles[i].show();
    }
}

mousePressed = () => {
    drawing = true;
}
mouseReleased = () => {
    drawing = false;
}
