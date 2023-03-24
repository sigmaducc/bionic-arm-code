import java.util.LinkedList;
import processing.serial.*;

Serial myPort;
static String EMGVal;
int sensorVal = 0;

LinkedList<Integer> queue = new LinkedList<Integer>();
int queueSize = 256;
int val = 0;
float rms = 0;

void setup() {
  size(1600, 400);
  String portName = "COM6";
  myPort = new Serial(this, portName, 9600);
}

void draw(){
  if ( myPort.available() > 0) {
    val = myPort.readStringUntil('\n'); 
  try {
    sensorVal = Integer.valueOf(val.trim());
  }
  catch(Exception e) {
    ;
  }
  int starttime = millis(); //<>//
  background(255);
  if(queue.size() >= queueSize) 
  {
    queue.remove(0); 
  }
  queue.add(val);
  val = (int)random(300, 400);
  
  int margin = 60;
  int leftMargin = 60;

  int graphWidth = width - leftMargin;
  int graphHeight = height - margin;
  
  int gh = 800;

  int graphX = margin;
  int graphY = margin/4;
  
  fill(0);
  translate(graphX - leftMargin, graphY + graphHeight/2);
  rotate(-HALF_PI);
  text("Queue Element Value", 0, 0);
  rotate(HALF_PI);
  translate(-(graphX - leftMargin), -(graphY + graphHeight/2));
  for(int i = 0; i <= queue.size(); i+=8)
  {
    stroke(255);
    float x = map(i, 0, queueSize, graphX, graphWidth);
    line(x, graphY + graphHeight, x, graphY + graphHeight + 10);
    text(i, x, graphY + graphHeight + 10);
  }
  
  textAlign(RIGHT, CENTER);
  for (int i = 0; i <= gh; i += 50) {
    stroke(255);
    float y = map(i, 0, gh, graphY + graphHeight, graphY);
    line(graphX - 10, y, graphX, y);
    text(i, graphX - 20, y);
  }
  fill(0);
  textAlign(CENTER);
  textSize(16);
  text("Time", width/2, height - 15);
  
  // Calculate the Mean
  float sum = 0;
  for (int data: queue) {
    sum += data;
  }
  float mean = sum / queueSize;
  stroke(0, 255, 0);
  float mx = map(mean, 0, gh, graphY + graphHeight, graphY);
  line(0, mx, width, mx);
  
  // Calculate the RMS
  float sumOfSquares = 0;
  for (int data: queue) {
    sumOfSquares += pow(data - mean, 2);
  }
  float rms = sqrt(sumOfSquares / queueSize);
  stroke(255, 0, 0);
  float rmsx = map(rms, 0, gh, graphY + graphHeight, graphY);
  line(0, rmsx, width, rmsx);
  
  stroke(0, 0, 255);
  strokeWeight(2);
  noFill();
  beginShape();
  float x = graphX;
  for (float data : queue) {
    data = abs(data - mean);
    println("Data: " + data);
    float y = map(data, 0, gh, graphY + graphHeight, graphY);
    vertex(x, y);
    x += graphWidth / queueSize;
  }
  endShape();
  
  int time = millis() - starttime; //<>//
  
  println("RMS: " + rms + "    Mean: " + mean + "    Time: " + time);
}
