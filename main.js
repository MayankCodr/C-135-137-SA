video = "";
input = "";
objects = [];
function preload(){
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function modelLoaded(){
    console.log("Model is loaded");
    status = true;

}
function gotResult(error, results){
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for ( i = 0; i < objects.length; i++) {
            input = document.getElementById("object").value;
            document.getElementById("status").innerHTML = "Status : Object detected";
            percent = floor(objects[i].confidence*100);
            fill("red");
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y +15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);
            if (objects[i].label == input) {
                document.getElementById("found").innerHTML = input +" "+ "Found";
                speak();

            }
            else{
                document.getElementById("found").innerHTML = input +" "+ "Not found";
            }
        }
        if (objects.length == 0) {
            document.getElementById("found").innerHTML = input +" "+ "Not found";
        }

    }

}
function start(){
    document.getElementById("status").innerHTML = "Status :- Detecting Object";
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = input + "Found";
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
  }
