let nn;
let fileList = ["handclose", "thumb", "index", "middle", "ring", "pinky"];
let dataList = [];
let motions = [];
let trainingSets = [];
let testingSets = [];
let file;
let testJson;

function preload(){
    for (let set = 0; set < 17; set++){
        motions = [];
        for (var motion = 0; motion < fileList.length; motion++) {
            if (set == 0){
                file = `datasets/1000/Gautam/New folder/${fileList[motion]}.txt`;
            }
            else{
                file = `datasets/1000/Gautam/New folder (${set + 1})/${fileList[motion]}.txt`;
            }
            let motionData = loadStrings(decodeURI(file));
            motions.push(motionData);
        }
        trainingSets.push(motions);
    }
    testJson = loadJSON("testData.json");
}

function setup(){
    let options = {
        inputs: 999,
        outputs: 6,
        task: "classification",
        debug: true,
    }
    nn = ml5.neuralNetwork(options);
    
    let obj = {
        0: "Hand Close",
        1: "Thumb",
        2: "Index",
        3: "Middle",
        4: "Ring",
        5: "Pinky"
    }

    for (let set = 0; set < trainingSets.length; set++){
        for (let motion = 0; motion < trainingSets[set].length; motion++){
            const inputs = trainingSets[set][motion];
            const output =  {
                label: obj[motion]
            };
            nn.addData(inputs, output);
            console.log(inputs, output);
        }
    }

    // for (let set = 0; set < testingSets.length; set++){
    //     for (let motion = 0; motion < testingSets[set].length; motion++){
    //         const inputs = testingSets[set][motion];
    //         const output =  {
    //             label: obj[motion]
    //         };
    //         nn.addData(inputs, output);
    //         console.log(inputs, output);
    //     }
    // }
    nn.normalizeData();
    // nn.saveData("testData", function (err, res){
    //     if (err){
    //         console.log(err);
    //     }
    //     console.log(res);
    // });
    const trainingOptions = {
        epochs: 30,
    }
    nn.train(trainingOptions, finishedTraining);
}

function finishedTraining(){
    console.log("Finished Training");
    // classify();
    // nn.saveData("testData", function (err, res){
    //     if (err){
    //         console.log(err);
    //     }
    //     console.log(res);
    // });
}

function classify(){
    // let input = testJson.data[0].xs;
    // input = input[0]; // remove the first dimension to get a 1D array
    // input.length = 36604; // pad or truncate the array to have length 36604
    // input = [input]; // convert back to a 2D array with shape [1, 36604]
    nn.classify(input, handleResults);
}

function handleResults(error, result) {
    if(error){
      console.error(error);
      return;
    }
    console.log(result);
}

function draw(){
    
}