let video;
let poseNet;
let pose;
let skeleton;
let brush1, brush2, brush3, brush4, brush5;

preload = () => {
    brush1 = loadImage("img/purp.png");
    brush2 = loadImage("img/yellow.png");
    brush3 = loadImage("img/pink.png");
    brush4 = loadImage("img/orange.png");
    brush5 = loadImage("img/green.png");

}


function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    poseNet = ml5.poseNet(video, {
        flipHorizontal: true //flips interaction
    }, modelLoaded);
    poseNet.on('pose', gotPoses);
    
    
}

function gotPoses(poses) {
    //console.log(poses); 
    if (poses.length > 0) {
        pose = poses[0].pose;

    }

}



function modelLoaded() {
    console.log('poseNet ready');
    
    
}







function draw() {

   
    if (pose) {
        
        //background(255);

        push();
        translate(pose.nose.x, pose.nose.y);
        let sz = random(20, 200);
        let rot = random(0, TWO_PI);
        rotate(rot);
        tint(255, 50); 
        image(brush1, 0, 0, sz, sz); //purple
        pop();

        push();
        translate(pose.rightWrist.x, pose.rightWrist.y);
        let sz2 = random(20, 200);
        let rot2 = random(0, TWO_PI);
        rotate(rot2);
        tint(255, 50); 
        image(brush2, 0, 0, sz2, sz2); //orange
        pop();

        push();
        translate(pose.leftWrist.x, pose.leftWrist.y);
        let sz3 = random(20, 200);
        let rot3 = random(0, TWO_PI);
        rotate(rot3);
        tint(255, 50);
        image(brush3, 0, 0, sz3, sz3); //pink
        pop();

        push();
        translate(pose.rightKnee.x, pose.rightKnee.y);
        let sz4 = random(20, 200);
        let rot4 = random(0, TWO_PI);
        rotate(rot4);
        tint(255, 50);
        image(brush4, 0, 0, sz4, sz4); //orange
        pop();

        push();
        translate(pose.leftKnee.x, pose.leftKnee.y);
        let sz5 = random(20, 200);
        let rot5 = random(0, TWO_PI);
        rotate(rot5);
        image(brush5, 0, 0, sz5, sz5); //green  
        pop();


        /*fill(255, 255, 255);
        textSize(windowWidth * 0.03);
        text('Where creativity happens', windowWidth * 0.35, windowHeight * 0.5);*/

    }
    
    else {
        
        background(255);
        fill(255, 255, 255);
        textSize(windowWidth * 0.05);
        text('Lorem ipsum dolor sit amet, consectetur.', windowWidth * 0.055, windowHeight * 0.5);
    }


}

