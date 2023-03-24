import processing.serial.*;

import java.util.LinkedList;

LinkedList<Integer> queue = new LinkedList<Integer>();
int width = 800;
int height = 600;
int queueSize = 256;
int val = 0;
int tickSize = 10; //<>//

int fontSize = 16;

void setup(){
  size(800, 600);
  textSize(fontSize);
}

void draw(){
  int startTime = millis();

  background(255);
  if (queue.size() >= queueSize){
      queue.remove();
  }
  int newData = val;
  queue.add(newData);
  val++;
  
  // Calculate the size of the graph area based on the canvas size and the desired margin
  int margin = 50;
  int graphWidth = width - 2*margin;
  int graphHeight = height - 2*margin;

  // Calculate the position of the graph area in the middle of the canvas
  int graphX = margin;
  int graphY = margin;

  // Draw the x-axis label and tick marks
  textAlign(CENTER);
  for (int i = 0; i <= queueSize; i += 10) {
    float x = map(i, 0, queueSize, graphX, graphX + graphWidth);
    line(x, graphY + graphHeight, x, graphY + graphHeight + 10);
    text(i, x, graphY + graphHeight + 20);
  }
  text("Time", width/2, height - 30);

  // Draw the y-axis label and tick marks
  textAlign(RIGHT, CENTER);
  for (int i = 0; i <= height; i += 50) {
    float y = map(i, 0, height, graphY + graphHeight, graphY);
    line(graphX - 10, y, graphX, y);
    text(i, graphX - 20, y);
  }
  translate(graphX - 40, graphY + graphHeight/2);
  rotate(-HALF_PI);
  text("Queue Element Value", 0, 0);
  rotate(HALF_PI);
  translate(-(graphX - 40), -(graphY + graphHeight/2));

  // Draw the data points as a line graph
  stroke(0, 0, 255);
  strokeWeight(2);
  noFill();
  beginShape();
  float x = graphX;
  for (int data : queue) {
    float y = map(data, 0, height, graphY + graphHeight, graphY);
    vertex(x, y);
    x += graphWidth / queueSize;
  }
  endShape();
  int timeTaken = millis() - startTime;
  println("Time taken: " + timeTaken + " ms");
}
