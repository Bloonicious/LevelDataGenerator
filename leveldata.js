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
    let isBigUpdate = document.getElementById('bigUpdateInput').checked;
    let currentSupercash = parseFloat(document.getElementById('supercashInput').value);
    let currentWorkers = parseInt(document.getElementById('workersInput').value);
    let currentWalkingSpeed = parseInt(document.getElementById('walkingSpeedInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    let lastLevel = {
        "0 Param data": {
            "0 int Tier": currentTier,
            "0 int Level": currentLevel - 1,
            "0 double Cost": currentCost,
            "0 int NumberOfWorkers": currentWorkers,
            "0 double GainPerSecondPerWorker": currentGain,
            "0 double CapacityPerWorker": currentCapacity,
            "0 int WorkerWalkingSpeedPerSecond": currentWalkingSpeed,
            "1 UInt8 BigUpdate": isBigUpdate ? 1 : 0,
            "0 double SuperCashReward": currentSupercash
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

        // Apply big update for level 850, 900, and 1000
        if (newLevel["0 Param data"]["0 int Level"] === 850 || newLevel["0 Param data"]["0 int Level"] === 900 || newLevel["0 Param data"]["0 int Level"] === 1000) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 3.6;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 3.6;
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = Math.min(lastLevel["0 Param data"]["0 int NumberOfWorkers"] + 1, 7);
            newLevel["0 Param data"]["0 double SuperCashReward"] = 40;
        } else if (newLevel["0 Param data"]["0 int Level"] > 969) {
            // Increase worker movement speed after level 969
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] += 1;
        }

        levelData.push(newLevel);
        lastLevel = newLevel;
    }

    updateOutput();
}

function updateOutput() {
    document.getElementById('output').innerHTML = `<pre>${JSON.stringify(levelData, null, 2)}</pre>`;
}

function copyJson() {
    let output = document.getElementById('output');
    let range = document.createRange();
    range.selectNodeContents(output);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
}
