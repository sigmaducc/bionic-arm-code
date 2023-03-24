ArrayList wave = new ArrayList();
int waveLength = 880;
float prevX = 0, prevY = 0;
float multiplier = 7.5;

int val = 0;

void setup() {
  size(900,600);
}

void draw(){
  int starttime = millis();
  // background reset on frame
  background(0); 
  if(wave.size() >= waveLength) 
  {
    wave.remove(0); 
  }
  wave.add(val);
  val++;
 
  // add samples to canvas
  for(int i = 0; i < wave.size(); i++)
  {
    stroke(255);    
    if(prevX == 0 && prevY == 0)
    {
      prevX = i;
      prevY = ((Integer)wave.get(i));
    }
    line(prevX, prevY, i, ((Integer)wave.get(i)));
    prevX = i;
    prevY = ((Integer)wave.get(i)); 
  }
  int time = millis() - starttime;
}
