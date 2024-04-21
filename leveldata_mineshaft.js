let levelData_mineshaft = [];

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
let costMultiplier1501 = 1.333;
let statMultiplier1501 = 1.25;

let workerSpeedIncrementLevel = {
    1: 2,
    10: 2,
    11: 2,
    21: 2,
    25: 2,
    37: 2,
    50: 2,
    51: 2,
    83: 3,
    100: 3,
    101: 3,
    200: 3,
    201: 3,
    265: 4,
    400: 4,
    401: 4,
    500: 4,
    501: 4,
    561: 5,
    600: 5,
    601: 5,
    700: 5,
    701: 5,
    800: 5,
    801: 5,
    850: 5,
    851: 5,
    900: 5,
    901: 5,
    950: 5,
    951: 5,
    969: 6,
    1000: 6,
    1001: 6,
    1200: 6,
    1201: 6,
    1400: 6,
    1401: 6,
    1500: 6,
    1501: 6
};

let workerCountIncrementLevel = {
    1: 1,
    10: 2,
    20: 2,
    25: 2,
    37: 2,
    50: 3,
    51: 3,
    100: 4,
    101: 4,
    200: 5,
    201: 5,
    400: 6,
    401: 6,
    500: 6,
    501: 6,
    600: 6,
    601: 6,
    700: 6,
    701: 6,
    800: 6,
    801: 6,
    850: 7,
    851: 7,
    900: 7,
    901: 7,
    1000: 7,
    1001: 7,
    1200: 7,
    1400: 8,
    1500: 8,
    1501: 8
};

function generateLevels_mineshaft() {
    var selectedGenerator = generatorBehaviorSelect.value;

    // Common input IDs
    var levelInput = document.getElementById("mineshaftLevelInput");
    var tierInput = document.getElementById("tierInput");

    // Variables for specific input IDs
    var costInput, superCashInput, skillPointIDInput, tierInput, gainInput, capacityInput;

    // Check the selected generator and set specific input IDs
    if (selectedGenerator === "elevator") {
        costInput = document.getElementById("elevatorCostInput");
        gainInput = document.getElementById("speedInput");
        capacityInput = document.getElementById("elevatorCapacityInput");
    } else if (selectedGenerator === "warehouse") {
        costInput = document.getElementById("warehouseCostInput");
        gainInput = document.getElementById("loadingInput");
        capacityInput = document.getElementById("warehouseCapacityInput");
    } else if (selectedGenerator === "skillpoints") {
        skillPointIDInput = document.getElementById("skillPointIDInput");
        costInput = document.getElementById("skillpointCostInput");
        superCashInput = document.getElementById("skillpointSuperCashCostInput");
    } else {
        // For mineshaft, use the existing IDs
        tierInput = document.getElementById("tierInput");
        costInput = document.getElementById("mineshaftCostInput");
        gainInput = document.getElementById("mineshaftGainInput");
        capacityInput = document.getElementById("mineshaftCapacityInput");
    }
    let currentLevel = parseInt(document.getElementById('mineshaftLevelInput').value);
    let currentTier = parseInt(document.getElementById('tierInput').value);
    let currentCost = parseFloat(document.getElementById('mineshaftCostInput').value);
    let currentGain = parseFloat(document.getElementById('mineshaftGainInput').value);
    let currentCapacity = parseFloat(document.getElementById('mineshaftCapacityInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    let lastLevel = {
        "0 Param data": {
            "0 int Tier": currentTier,
            "0 int Level": currentLevel - 1,
            "0 double Cost": currentCost,
            "0 int NumberOfWorkers": 1,
            "0 double GainPerSecondPerWorker": currentGain,
            "0 double CapacityPerWorker": currentCapacity,
            "0 int WorkerWalkingSpeedPerSecond": 2,
            "1 UInt8 BigUpdate": 0,
            "0 double SuperCashReward": 0
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
        } else if (newLevel["0 Param data"]["0 int Level"] < 1501) {
            currentCostMultiplier = costMultiplier1001;
            currentStatMultiplier = statMultiplier1001;
        } else {
            currentCostMultiplier = costMultiplier1501;
            currentStatMultiplier = statMultiplier1501;
        }

        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * currentCostMultiplier;
        if (workerCountIncrementLevel[newLevel["0 Param data"]["0 int Level"]]) {
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = workerCountIncrementLevel[newLevel["0 Param data"]["0 int Level"]];
        } else {
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = lastLevel["0 Param data"]["0 int NumberOfWorkers"];
        }
        newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] = lastLevel["0 Param data"]["0 double GainPerSecondPerWorker"] * currentStatMultiplier;
        newLevel["0 Param data"]["0 double CapacityPerWorker"] = lastLevel["0 Param data"]["0 double CapacityPerWorker"] * currentStatMultiplier;
        if (workerSpeedIncrementLevel[newLevel["0 Param data"]["0 int Level"]]) {
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = workerSpeedIncrementLevel[newLevel["0 Param data"]["0 int Level"]];
        } else {
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = lastLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"];
        }

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
        levelData_mineshaft.push(newLevel);
        lastLevel = newLevel;
    }

    // Display the generated levels
    displayLevels_mineshaft();
}

function displayLevels_mineshaft() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData_mineshaft, null, 4);
}

function copyJsonMineshaft() {
    let tierInput = document.getElementById('tierInput').value;
    let filename = `level_data(${tierInput}).json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData_mineshaft, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
