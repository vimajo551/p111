Webcam.set({
    width:350,
    height:300,
    imageFormat:"png",
    pngQuality:90
})
camera = document.getElementById("camera");
Webcam.attach("#camera")
var predction1 = ""
var predction2 = ""

function take(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capturedImg" src="'+data_uri+'"/>'
    })
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/W8M4YWJFJ/model.json",modelLoaded);
function modelLoaded(){
    console.log("model loaded")
}

function speak(){
    var synth = window.speechSynthesis;
    data1 = "a primeira previsão é "+predction1
    data2 = "a segunda previsão é "+predction2
    var utterthis = new SpeechSynthesisUtterance(data1+data2);
    synth.speak(utterthis)
}

function check(){
    img = document.getElementById("capturedImg");
    classifier.classify(img,gotResult)
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }else{
        console.log(results)
        document.getElementById("resultEmotionName").innerHTML = results[0].label
        document.getElementById("resultEmotionName2").innerHTML = results[1].label
        predction1 = results[0].label
        predction2 = results[1].label
        speak()
    }
}