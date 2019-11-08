let mobileNet;
let classifier;
let video;
let label = 'loading model';
let confidence;
let loadBtn;

function modelReady() {
    console.log('Model is ready!');
    classifier.load('model.json', customModelReady);
}

function customModelReady() {
    console.log('Custom Model is ready!');
    label = 'model is ready';
    classifier.classify(gotResults);
}

function videoReady() {
    console.log('Video is ready!');
}

function setup() {
    createCanvas(640, 550);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobileNet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobileNet.classification(video, videoReady);

    loadBtn = createButton('load');
    loadBtn.mousePressed(() => {
        classifier.load();
    });
}

function draw() {
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(18);
    text(label, 20, height - 25);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        confidence = Math.round(results[0].confidence * 100);
        if(confidence > 98){
            label = `that\'s a damn ${results[0].label}`;
        } else {
            label = 'wtf is that';
        }
        classifier.classify(gotResults);
    }
}