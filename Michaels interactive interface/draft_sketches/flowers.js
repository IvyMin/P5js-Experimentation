let shapes = [];
let drawing = false;

preload = () => {
    for (let i = 0; i < 7; i++) {
        shapes[i] = loadImage('img/plant' + (i + 1) + ".svg");
    }
}

mousePressed = () => {
    drawing = true;
}

mouseReleased = () => {
    drawing = false;
}

setup = () => {
    createCanvas(windowWidth, windowHeight);
    background(255);

}

draw = () => {
    if (drawing) {

        push();
        translate(mouseX, mouseY);
        let rand = floor(random(0, 7));
        let img = shapes[rand];
        let sz = random(30, 120);
        let rot = random(0, TWO_PI);
        rotate(rot);
        image(img, 0, 0, sz, sz);
        pop();
    }

}
