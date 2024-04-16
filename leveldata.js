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

// Default level counts for worker speed and worker count increment
let workerSpeedLevelCount = 969; // Worker speed incremented starting at level 969
let workerCountLevelCount = 850; // Worker count incremented starting at level 850

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
        if ([10, 25, 50, 100, 200, 400, 500, 600, 700, 800, 850, 900, 1000, 1200, 1400, 1500].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 1;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 2;
        } else {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 0;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 0;
        }

        // Apply special conditions for specific levels
        if ([25, 50, 100, 200, 400, 500, 600, 700, 800, 850, 900, 1000, 1200, 1400, 1500].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 2;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 2;
        } else if ([850, 900, 1000, 1200, 1400, 1500].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 3;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 3;
        } else if ([1000, 1200, 1400, 1500].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 4;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 4;
        } else if ([1500].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 5;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 5;
        }

        // Increase worker speed at specific levels
        if (newLevel["0 Param data"]["0 int Level"] >= workerSpeedLevelCount) {
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = lastLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] + 1;
        } else {
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = lastLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"];
        }

        // Increase worker count at specific levels
        if (newLevel["0 Param data"]["0 int Level"] >= workerCountLevelCount) {
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = lastLevel["0 Param data"]["0 int NumberOfWorkers"] + 1;
        } else {
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = lastLevel["0 Param data"]["0 int NumberOfWorkers"];
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

function exportToJsonFile() {
    let filename = 'level_data.json';
    let jsonStr = JSON.stringify(levelData, null, 4);

    let blob = new Blob([jsonStr], { type: 'application/json' });
    let link = document.createElement('a');
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

// Call this function to export the level data to a JSON file
function copyJson() {
    exportToJsonFile();
}
