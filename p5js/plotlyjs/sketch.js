let windowSize = 1000;
let y_min_height = 0;
let y_max_height = 600;
let fileList = ["handclose", "thumb", "index", "middle", "ring", "pinky"];
let dataList = [];

let x = 0;
let y = 0;
let cnt = 0;


function preload() {
  for (var i = 0; i < fileList.length; i++) {
    let file = `datasets/${fileList[i]}.txt`;
    loadStrings(file, appendToList);
  }
}

function appendToList(data){
  dataList.push(data);
}

function setup() {
  noCanvas();
  let starttime  = Date.now();
  let data =  [{
    y: [getData(x, y)],
    type: 'line'
  }];
  
  let layout = {
    xaxis:{
      range: [0, windowSize],
      title: "Values"
    },
    yaxis: {
      range: [y_min_height, y_max_height],
      title: "Amplitude"
    }
  };
  
  Plotly.newPlot('chart', data, layout);
  // console.log("newplot", Date.now() - starttime);
  
//   setInterval(function(){
    
//   }, 1);
}

function getData(i, j) {
  console.log(fileList[i]);
  return dataList[i][j];
}  

function draw() {
  // let time = Date.now();
   if(y >= 999){
      y = 0;
      x++;
    }
    y++;
    Plotly.extendTraces('chart',{ y:[[getData(x, y)]]}, [0]);
    cnt++;
    if(cnt > windowSize) {
      Plotly.relayout('chart',{
        xaxis: {
          range: [cnt - windowSize, cnt]
        }
      });
    } 
  // console.log("setInterval", Date.now()-time);
}