video = "";
status = "";
objects = [];
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function preload() {
    video = createCapture(300, 300);
    video.hide();
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
}

function ST() {
    object_detector = ml5.objectDetector("COCOSSD", modelLoaded);
    document.getElementById("Status").innerHTML="Status - Detecting Objects";
    textINPUT = document.getElementById("textinput").value;
    recognition.start();
 }

function draw() {
    image(video, 0, 0, 300, 300);

        if(status!=""){

            objectDetector.detect(video, gotResult);

            for(var i=0; i<objects.length; i++) {
                document.getElementById("Status").innerHTML="Status : Objects Detected";
                document.getElementById("Objects").innerHTML="Number of Objects : "+objects.length;
                
                fill("#8B0000");
                percent = floor(objects[i].confidence*100);
                text(objects[i].label+""+percent+"%", objects[i].x, objects[i].y);
                noFill();
                stroke("#8B0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                console.log("Hello this is a test");
                
                if(objects[i].label == textINPUT){
                    video.stop();
                    objectDetector.detect(gotResult);
                    document.getElementById("found").innerHTML=textINPUT+" FOUND";

                    console.log(textINPUT+" FOUND");
                    speak();
                }

                else {
                    video.stop();
                    document.getElementById("found").innerHTML=textINPUT+" NOT FOUND";

                    console.log(textINPUT+" NOT FOUND");
                    speakI();
                }
            }

        }
    }

    function speak() {
        speak_data = innerHTML=textINPUT+" FOUND";
        var utter_this =  new SpeechSynthesisUtterance(speak_data);
    }

    function speakI() {
        speak_data = innerHTML=textINPUT+" NOT FOUND";
        var utter_this =  new SpeechSynthesisUtterance(speak_data);
    }

function modelLoaded() {
    console.log("Model is loaded…");
    status = true;
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}