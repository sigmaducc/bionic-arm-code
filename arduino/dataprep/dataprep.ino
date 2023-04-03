int analogPin = A0;     
int data = 0;           
char userInput;
void setup() {
  Serial.begin(9600);
}

void loop() {
  // int sensorValue = analogRead(A0);
  // sum = sum + sensorValue;
  // count++;
  // if (count > 0) {
  //   int mean = sum / count;
  //   Serial.println(abs(sensorValue - mean));
  //   sum = sum - sensorValue;
  // }
  // Serial.println(sensorValue);
  // delay(10);
  if(Serial.available()> 0){ 
    userInput = Serial.read();               // read user input
      if(userInput == 'g'){                  // if we get expected value 
            data = analogRead(analogPin);    // read the input pin
            Serial.println(data);            
      } // if user input 'g' 
  } // Serial.available
}