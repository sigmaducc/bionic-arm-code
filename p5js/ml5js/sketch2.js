let nn;
let fileList = ["handclose", "thumb", "index", "middle", "ring", "pinky"];
let dataList = [];
let motions = [];
let sets = [];
let file;
let d;
function preload(){
    for (let set = 0; set < 19; set++){
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
        sets.push(motions);
    }
    d = loadJSON("sets.json");
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

    for (let set = 0; set < sets.length; set++){
        for (let motion = 0; motion < sets[set].length; motion++){
            const inputs = sets[set][motion];
            const output =  {
                label: obj[motion]
            };
            nn.addData(inputs, output);
            console.log(inputs, output)
        }
    }
    nn.saveData("sets", function (err, res){
        if (err){
            console.log(err);
        }
        console.log(res);
    });
    // const trainingOptions = {
    //     epochs: 30,
    // }
    // nn.train(trainingOptions, finishedTraining);
}

function draw(){

}