let serial;
let latestData;
let queue = [];
let windowSize = 500;
let startTime;

function setup() {
 createCanvas(800, 600);
 serial = new p5.SerialPort();
 serial.list();
 serial.open('COM3');
 startTime = millis();
 serial.on('data', gotData);
 serial.on('open', gotOpen);
}

function gotData() {
  let time = millis();
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;

  let data = Number(currentString);
  queue.push(data);
  while (millis() - startTime > windowSize) {
    return ;
  }  
  let sum = queue.reduce((a, b) => a + b);
  let sumSq = queue.reduce((a, b) => a + b * b);
  let mean = int(sum / queue.length);
  let rms = int(sqrt(sumSq / queue.length));
  console.log(mean, rms, queue.length, millis() - time);
  latestData = currentString;
}

function gotOpen() {
  print("Serial Port is Open");
}

function draw() {
 background(255,255,255);
 fill(0,0,0);
 text(latestData, 10, 10);
 // Polling method
 /*
 if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);
 }
 */
}