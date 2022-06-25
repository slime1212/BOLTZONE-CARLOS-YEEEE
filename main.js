song = "";

function preload() {
    song = loadSound('song.mp4')
}

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function modelLoaded() { console.log('PoseNet is initialized.') }

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log('Left score: ' + scoreLeftWrist + ', Right score: ' + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Xcor of left wrist: ' + leftWristX + ', Ycor of left wrist: ' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('Xcor of right wrist: ' + rightWristX + ', Ycor of right wrist: ' + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('navy');
    stroke('blue');

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        numLeftWristY = Number(leftWristY);
        removeDecimals = floor(numLeftWristY);
        volume = removeDecimals / 500;
        document.getElementById('volume').innerHTML = 'Volume: ' + volume;
        song.setVolume(volume);
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById('speed').innerHTML = 'Speed: 0.5x';
            song.rate(0.5);
        }

        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById('speed').innerHTML = 'Speed: 1x';
            song.rate(1);
        }

        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById('speed').innerHTML = 'Speed: 1.5x';
            song.rate(1.5);
        }

        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById('speed').innerHTML = 'Speed: 2x';
            song.rate(2);
        }
        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById('speed').innerHTML = 'Speed: 2.5x';
            song.rate(2.5);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1.1);
}