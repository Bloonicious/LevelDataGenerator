let levelData = [
    {
        "0 Param data": {
            "0 int Tier": 14,
            "0 int Level": 800,
            "0 double Cost": 1.84e+69,
            "0 int NumberOfWorkers": 6,
            "0 double GainPerSecondPerWorker": 1.3699999999999999e+58,
            "0 double CapacityPerWorker": 5.4999999999999999e+58,
            "0 int WorkerWalkingSpeedPerSecond": 5,
            "1 UInt8 BigUpdate": 1,
            "0 double SuperCashReward": 2
        }
    }
];

let costMultiplier = 1.225;
let statMultiplier = 1.2;
let costMultiplier2 = 1.233;
let statMultiplier2 = 1.2;

function generateLevels() {
    let lastIndex = levelData.length - 1;
    let lastLevel = levelData[lastIndex]["0 Param data"];

    for (let i = 0; i < 50; i++) {
        let newLevel = {};

        newLevel["0 Param data"] = {};
        newLevel["0 Param data"]["0 int Tier"] = lastLevel["0 int Tier"];
        newLevel["0 Param data"]["0 int Level"] = lastLevel["0 int Level"] + 1;

        // Determine the correct multiplier based on the level
        let currentCostMultiplier = lastLevel["0 int Level"] < 851 ? costMultiplier : costMultiplier2;
        let currentStatMultiplier = lastLevel["0 int Level"] < 851 ? statMultiplier : statMultiplier2;

        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 double Cost"] * currentCostMultiplier;
        newLevel["0 Param data"]["0 int NumberOfWorkers"] = lastLevel["0 int NumberOfWorkers"];
        newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] = lastLevel["0 double GainPerSecondPerWorker"] * currentStatMultiplier;
        newLevel["0 Param data"]["0 double CapacityPerWorker"] = lastLevel["0 double CapacityPerWorker"] * currentStatMultiplier;
        newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = lastLevel["0 int WorkerWalkingSpeedPerSecond"];
        newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 0;
        newLevel["0 Param data"]["0 double SuperCashReward"] = 0;

        levelData.push(newLevel);
        lastLevel = newLevel["0 Param data"];
    }

    // Check if the last level generated is level 850, 900, or 1000
    if (lastLevel["0 int Level"] === 850 || lastLevel["0 int Level"] === 900 || lastLevel["0 int Level"] === 1000) {
        lastLevel["1 UInt8 BigUpdate"] = 1;
        lastLevel["0 double SuperCashReward"] = lastLevel["0 int Level"] === 850 ? 2 : 0;
        if (lastLevel["0 int Level"] === 850 || lastLevel["0 int Level"] === 900) {
            lastLevel["0 int NumberOfWorkers"] += 1;
            lastLevel["0 double GainPerSecondPerWorker"] *= 3.6;
            lastLevel["0 double CapacityPerWorker"] *= 3.6;
        } else if (lastLevel["0 int Level"] === 1000) {
            lastLevel["0 double GainPerSecondPerWorker"] *= 4;
            lastLevel["0 double CapacityPerWorker"] *= 4;
        }
    }

    // Increase worker movement speed after level 969
    if (lastLevel["0 int Level"] >= 970) {
        lastLevel["0 int WorkerWalkingSpeedPerSecond"] += 1;
    }

    displayLevels();
}

function viewCurrentValues() {
    let outputDiv = document.getElementById('output');
    outputDiv.textContent = JSON.stringify(levelData, null, 2);
}

function copyJson() {
    let jsonText = JSON.stringify(levelData, null, 2);
    navigator.clipboard.writeText(jsonText).then(function() {
        alert('JSON data copied to clipboard!');
    }, function() {
        alert('Error copying JSON data to clipboard');
    });
}

function displayLevels() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    levelData.forEach(level => {
        let levelDiv = document.createElement('div');
        levelDiv.textContent = JSON.stringify(level, null, 2);
        outputDiv.appendChild(levelDiv);
    });
}

// Initial display of levels
displayLevels();
