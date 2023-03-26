let video;
let poseNet;
let pose;
let skeleton;
let brush1, brush2, brush3, brush4, brush5, canvas;



//this variable is used to change the screen depending on whether there's someone there or not. Mark made it automatically 0.
let detectedState = 0;




preload = () => {

    //loads images

    brush1 = loadImage("img/purp.png");
    brush2 = loadImage("img/yellow.png");
    brush3 = loadImage("img/pink.png");
    brush4 = loadImage("img/orange.png");
    brush5 = loadImage("img/green.png");
    canvas = loadImage("img/canvas.jpg");



}





function setup() {

    createCanvas(windowWidth, windowHeight);

    video = createCapture(VIDEO);

    video.size(width, height);

    video.hide();

    poseNet = ml5.poseNet(video, {

        flipHorizontal: true //flips interaction to mirror user

    }, modelLoaded);

    poseNet.on('pose', gotPoses);





}


/* 

This function scans for people. Mark wrote if someone is on screen (poses.length > 0), change the variable detectedState to either 1 or 2, depending on what state it's currently at. Its state is automatically at 0 when the code first runs because he wrote "let detectedState = 0" at the top. 

*/

function gotPoses(poses) {


    if (poses.length > 0) { //poses.length is part of the library; any value above 0 means someone is on screen 

        pose = poses[0].pose;

        if (detectedState == 1) { //if state is 1, change to 2.
            detectedState = 2;

        } else if (detectedState == 0) { //if state is 0, change to 1. This is what first happens when the code starts.
            detectedState = 1;
        }


    } else {
        detectedState = 0;
    }


}



//setTimeout(gotPoses, 8000); //delays the above function by 8 seconds so that users have time to read whats on screen





function modelLoaded() {

    console.log('poseNet ready');





}





function draw() {




    // So once it detects someone, the state is either 1 or 2. 
    if (detectedState > 0) {


        if (detectedState == 1) {
            background(canvas);

        }




        push();

        translate(pose.nose.x, pose.nose.y);

        let sz = random(20, 200); //randomly picks sizes between 20 and 200

        let rot = random(0, TWO_PI); //value of rotation

        rotate(rot); //rotation function

        tint(255, 50); //changes transparency. 50 means 50% transparent

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

        tint(255, 50);

        image(brush5, 0, 0, sz5, sz5); //green 

        pop();








        //if no one is there (detectedState is 0), show this:


    } else {



        //feel free to write/design the intro page to w/e u want lol

        background(100);

        fill(255, 255, 255);

        textSize(windowWidth * 0.05);

        text('Lorem ipsum dolor sit amet, consectetur.', windowWidth * 0.055, windowHeight * 0.5);





    }




}
