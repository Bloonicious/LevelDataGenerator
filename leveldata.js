let levelData = [];

let costMultiplier = 1.16;
let statMultiplier = 1.1;
let costMultiplier21 = 1.148;
let statMultiplier21 = 1.08;
let costMultiplier101 = 1.08;
let statMultiplier101 = 1.07;
let costMultiplier401 = 1.199;
let statMultiplier401 = 1.15;
let costMultiplier801 = 1.225;
let statMultiplier801 = 1.2;
let costMultiplier851 = 1.233;
let statMultiplier851 = 1.2;
let costMultiplier1001 = 1.275;
let statMultiplier1001 = 1.23;

function generateLevels() {
    let currentLevel = parseInt(document.getElementById('levelInput').value);
    let currentTier = parseInt(document.getElementById('tierInput').value);
    let currentCost = parseFloat(document.getElementById('costInput').value);
    let currentGain = parseFloat(document.getElementById('gainInput').value);
    let currentCapacity = parseFloat(document.getElementById('capacityInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    let lastLevel = {
        "0 Param data": {
            "0 int Tier": currentTier,
            "0 int Level": currentLevel - 1,
            "0 double Cost": currentCost,
            "0 double GainPerSecondPerWorker": currentGain,
            "0 double CapacityPerWorker": currentCapacity,
            "0 int WorkerWalkingSpeedPerSecond": 2,
            "1 UInt8 BigUpdate": 0,
            "0 double SuperCashReward": 0,
            "0 int NumberOfWorkers": 1
        }
    };

    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = {};

        newLevel["0 Param data"] = {};
        newLevel["0 Param data"]["0 int Tier"] = currentTier;
        newLevel["0 Param data"]["0 int Level"] = lastLevel["0 Param data"]["0 int Level"] + 1;

        // Determine the correct multiplier based on the level
        let currentCostMultiplier;
        let currentStatMultiplier;
        if (newLevel["0 Param data"]["0 int Level"] < 21) {
            currentCostMultiplier = costMultiplier;
            currentStatMultiplier = statMultiplier;
        } else if (newLevel["0 Param data"]["0 int Level"] < 101) {
            currentCostMultiplier = costMultiplier21;
            currentStatMultiplier = statMultiplier21;
        } else if (newLevel["0 Param data"]["0 int Level"] < 401) {
            currentCostMultiplier = costMultiplier101;
            currentStatMultiplier = statMultiplier101;
        } else if (newLevel["0 Param data"]["0 int Level"] < 801) {
            currentCostMultiplier = costMultiplier401;
            currentStatMultiplier = statMultiplier401;
        } else if (newLevel["0 Param data"]["0 int Level"] < 851) {
            currentCostMultiplier = costMultiplier801;
            currentStatMultiplier = statMultiplier801;
        } else if (newLevel["0 Param data"]["0 int Level"] < 1001) {
            currentCostMultiplier = costMultiplier851;
            currentStatMultiplier = statMultiplier851;
        } else {
            currentCostMultiplier = costMultiplier1001;
            currentStatMultiplier = statMultiplier1001;
        }

        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * currentCostMultiplier;
        newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] = lastLevel["0 Param data"]["0 double GainPerSecondPerWorker"] * currentStatMultiplier;
        newLevel["0 Param data"]["0 double CapacityPerWorker"] = lastLevel["0 Param data"]["0 double CapacityPerWorker"] * currentStatMultiplier;

        // Apply big update for specific levels
        if (newLevel["0 Param data"]["0 int Level"] === 10 || newLevel["0 Param data"]["0 int Level"] === 25 || newLevel["0 Param data"]["0 int Level"] === 50 || newLevel["0 Param data"]["0 int Level"] === 100 || newLevel["0 Param data"]["0 int Level"] === 200 || newLevel["0 Param data"]["0 int Level"] === 400 || newLevel["0 Param data"]["0 int Level"] === 500 || newLevel["0 Param data"]["0 int Level"] === 600 || newLevel["0 Param data"]["0 int Level"] === 700 || newLevel["0 Param data"]["0 int Level"] === 800 || newLevel["0 Param data"]["0 int Level"] === 850 || newLevel["0 Param data"]["0 int Level"] === 900 || newLevel["0 Param data"]["0 int Level"] === 1000 || newLevel["0 Param data"]["0 int Level"] === 1200 || newLevel["0 Param data"]["0 int Level"] === 1400 || newLevel["0 Param data"]["0 int Level"] === 1500) {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 1;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 2;
        } else {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 0;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 0;
        }

        // Apply special conditions for specific levels
        if (newLevel["0 Param data"]["0 int Level"] === 25 || newLevel["0 Param data"]["0 int Level"] === 50 || newLevel["0 Param data"]["0 int Level"] === 100 || newLevel["0 Param data"]["0 int Level"] === 200 || newLevel["0 Param data"]["0 int Level"] === 400 || newLevel["0 Param data"]["0 int Level"] === 500 || newLevel["0 Param data"]["0 int Level"] === 600 || newLevel["0 Param data"]["0 int Level"] === 700 || newLevel["0 Param data"]["0 int Level"] === 800) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 2;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 2;
        } else if (newLevel["0 Param data"]["0 int Level"] === 850 || newLevel["0 Param data"]["0 int Level"] === 900) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 3;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 3;
        } else if (newLevel["0 Param data"]["0 int Level"] === 1000 || newLevel["0 Param data"]["0 int Level"] === 1200 || newLevel["0 Param data"]["0 int Level"] === 1400) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 4;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 4;
        } else if (newLevel["0 Param data"]["0 int Level"] === 1500) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 5;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 5;
        }
        
        // Copy the generated level to the output
        levelData.push(newLevel);
        lastLevel = newLevel;
    }

    // Display the generated levels
    displayLevels();
}

function displayLevels() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData, null, 4);
}

function copyJson() {
    let tierInput = document.getElementById('tierInput').value;
    let filename = `level_data(${tierInput}).json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
