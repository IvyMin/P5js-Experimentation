let video;
let poseNet;
let pose;
let skeleton;


function setup() {


    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    poseNet = ml5.poseNet(video, {
        flipHorizontal: true //flips interaction
    }, modelLoaded);
    poseNet.on('pose', gotPoses);

    fill(0, 0, 0);
    rect(0, 0, windowWidth, windowHeight);



}



function gotPoses(poses) {
    //console.log(poses); 
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}


function modelLoaded() {
    console.log('poseNet ready');
}

function draw() {


    if (pose) {


        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

        fill(226, 78, 64, 90);
        noStroke();
        ellipse(pose.nose.x, pose.nose.y, d); //red
        fill(236, 148, 38, 90);
        noStroke();
        ellipse(pose.rightWrist.x, pose.rightWrist.y, d); //orange
        fill(250, 200, 1, 90);
        noStroke();
        ellipse(pose.leftWrist.x, pose.leftWrist.y, d); //yellow
        fill(123, 157, 66, 90);
        noStroke();
        ellipse(pose.leftKnee.x, pose.leftKnee.y, d); //green
        fill(121, 183, 207, 90);
        noStroke();
        ellipse(pose.rightKnee.x, pose.rightKnee.y, d); //blue


        fill(255, 255, 255);
        textSize(windowWidth * 0.03);
        text('Where creativity happens', windowWidth * 0.35, windowHeight * 0.5);


    } 
    
   


}
