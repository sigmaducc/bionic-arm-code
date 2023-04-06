let serial;
function setup() {
    noCanvas();
    serial = new p5.SerialPort();
    serial.open('COM3');
    serial.on('open', openPort);
    serial.on('data', serialData);
    serial.on('list', gotList);
    serial.list();
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

function gotList(thelist) {
    print("List of Serial Ports:");

    for (let i = 0; i < thelist.length; i++) {
        print(i + " " + thelist[i]);
    }
}