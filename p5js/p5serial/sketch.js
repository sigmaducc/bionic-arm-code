let serial;

function setup() {
  serial = new p5.SerialPort();
  serial.open('COM3');
  serial.on('open', setupPlotly);
  serial.on('data', updatePlotly);
}
 
function openPort(){
  console.log("Port open!");
}

function serialData(){
  let time = Date.now();
  currentString = trim(serial.readLine());
  if (!currentString) return;
  console.log(currentString, Date.now() - time);
}


