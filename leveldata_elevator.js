let levelData_elevator = [];

let elevatorCostMultiplier = 1.20;
let elevatorStatMultiplier = 1.30;
let elevatorCostMultiplier11 = 1.20;
let elevatorStatMultiplier11 = 1.25;
let elevatorCostMultiplier21 = 1.17;
let elevatorStatMultiplier21 = 1.20;
let elevatorCostMultiplier41 = 1.15;
let elevatorStatMultiplier41 = 1.15;
let elevatorCostMultiplier101 = 1.13;
let elevatorStatMultiplier101 = 1.11;
let elevatorCostMultiplier2501 = 1.15;
let elevatorStatMultiplier2501 = 1.13;
let elevatorCostMultiplier3001 = 1.18;
let elevatorStatMultiplier3001 = 1.15;

function generateLevels_elevator() {
    let currentLevel = parseInt(document.getElementById('levelInput').value);
    let currentCost = parseFloat(document.getElementById('elevatorCostInput').value);
    let currentSpeed = parseFloat(document.getElementById('speedInput').value);
    let currentCapacity = parseFloat(document.getElementById('elevatorCapacityInput').value);
    let currentLoadingPerSecond = parseFloat(document.getElementById('elevatorLoadingInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    let lastLevel = {
        "0 Param data": {
            "0 int Level": currentLevel - 1,
            "0 double Cost": currentCost,
            "0 double Speed": currentSpeed,
            "0 double Capacity": currentCapacity,
            "0 double LoadingPerSecond": currentLoadingPerSecond,
            "1 UInt8 BigUpdate": 0,
            "0 double SuperCashReward": 0
        }
    };

    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = {};

        newLevel["0 Param data"] = {};
        newLevel["0 Param data"]["0 int Level"] = lastLevel["0 Param data"]["0 int Level"] + 1;

        // Determine the correct multiplier based on the level
        let currentCostMultiplier;
        let currentStatMultiplier;
        if (currentLevel < 11) {
            currentCostMultiplier = elevatorCostMultiplier;
            currentStatMultiplier = elevatorStatMultiplier;
        } else if (currentLevel < 21) {
            currentCostMultiplier = elevatorCostMultiplier11;
            currentStatMultiplier = elevatorStatMultiplier11;
        } else if (currentLevel < 41) {
            currentCostMultiplier = elevatorCostMultiplier21;
            currentStatMultiplier = elevatorStatMultiplier21;
        } else if (currentLevel < 101) {
            currentCostMultiplier = elevatorCostMultiplier41;
            currentStatMultiplier = elevatorStatMultiplier41;
        } else if (currentLevel < 2501) {
            currentCostMultiplier = elevatorCostMultiplier101;
            currentStatMultiplier = elevatorStatMultiplier101;
        } else if (currentLevel < 3001) {
            currentCostMultiplier = elevatorCostMultiplier2501;
            currentStatMultiplier = elevatorStatMultiplier2501;
        } else {
            currentCostMultiplier = elevatorCostMultiplier3001;
            currentStatMultiplier = elevatorStatMultiplier3001;
        }

        // Increment cost, capacity, and loading per second based on the current level
        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * currentCostMultiplier;
        // Increment speed by 2 milliseconds (0.002) for each level
        newLevel["0 Param data"]["0 double Speed"] = lastLevel["0 Param data"]["0 double Speed"] + 0.002;
        newLevel["0 Param data"]["0 double Capacity"] = lastLevel["0 Param data"]["0 double Capacity"] * currentStatMultiplier;
        newLevel["0 Param data"]["0 double LoadingPerSecond"] = lastLevel["0 Param data"]["0 double LoadingPerSecond"] * currentStatMultiplier;

        // Apply big update for specific levels if needed
        if (newLevel["0 Param data"]["0 int Level"] === 10 || newLevel["0 Param data"]["0 int Level"] === 40 || newLevel["0 Param data"]["0 int Level"] === 80 || newLevel["0 Param data"]["0 int Level"] === 150 || newLevel["0 Param data"]["0 int Level"] === 300 || newLevel["0 Param data"]["0 int Level"] === 500 || newLevel["0 Param data"]["0 int Level"] === 800 || newLevel["0 Param data"]["0 int Level"] === 900 || newLevel["0 Param data"]["0 int Level"] === 1000 || newLevel["0 Param data"]["0 int Level"] === 1100 || newLevel["0 Param data"]["0 int Level"] === 1200 || newLevel["0 Param data"]["0 int Level"] === 1300 || newLevel["0 Param data"]["0 int Level"] === 1400 || newLevel["0 Param data"]["0 int Level"] === 1500 || newLevel["0 Param data"]["0 int Level"] === 1600 || newLevel["0 Param data"]["0 int Level"] === 1700 || newLevel["0 Param data"]["0 int Level"] === 1800 || newLevel["0 Param data"]["0 int Level"] === 1900 || newLevel["0 Param data"]["0 int Level"] === 2000 || newLevel["0 Param data"]["0 int Level"] === 2100 || newLevel["0 Param data"]["0 int Level"] === 2200 || newLevel["0 Param data"]["0 int Level"] === 2300 || newLevel["0 Param data"]["0 int Level"] === 2400 || newLevel["0 Param data"]["0 int Level"] === 2500 || newLevel["0 Param data"]["0 int Level"] === 2600 || newLevel["0 Param data"]["0 int Level"] === 2700 || newLevel["0 Param data"]["0 int Level"] === 2800 || newLevel["0 Param data"]["0 int Level"] === 2900 || newLevel["0 Param data"]["0 int Level"] === 3000 || newLevel["0 Param data"]["0 int Level"] === 3200 || newLevel["0 Param data"]["0 int Level"] === 3400 || newLevel["0 Param data"]["0 int Level"] === 3500) {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 1;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 15;
        } else {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 0;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 0;
        }

        // Update capacity and loading per second according to big update
        if (newLevel["0 Param data"]["0 int Level"] === 10 || newLevel["0 Param data"]["0 int Level"] === 40 || newLevel["0 Param data"]["0 int Level"] === 150 || newLevel["0 Param data"]["0 int Level"] === 300 || newLevel["0 Param data"]["0 int Level"] === 500 || newLevel["0 Param data"]["0 int Level"] === 1000 || newLevel["0 Param data"]["0 int Level"] === 600 || newLevel["0 Param data"]["0 int Level"] === 1100 || newLevel["0 Param data"]["0 int Level"] === 1200 || newLevel["0 Param data"]["0 int Level"] === 1300 || newLevel["0 Param data"]["0 int Level"] === 1400 || newLevel["0 Param data"]["0 int Level"] === 1500 || newLevel["0 Param data"]["0 int Level"] === 1700 || newLevel["0 Param data"]["0 int Level"] === 1800 || newLevel["0 Param data"]["0 int Level"] === 1900 || newLevel["0 Param data"]["0 int Level"] === 2000 || newLevel["0 Param data"]["0 int Level"] === 2100 || newLevel["0 Param data"]["0 int Level"] === 2200 || newLevel["0 Param data"]["0 int Level"] === 2300 || newLevel["0 Param data"]["0 int Level"] === 2400) {
            newLevel["0 Param data"]["0 double Capacity"] *= 2;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 2;
        } else if (newLevel["0 Param data"]["0 int Level"] === 80) {
            newLevel["0 Param data"]["0 double Capacity"] *= 1.25;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 1.25;
        } else if (newLevel["0 Param data"]["0 int Level"] === 800) {
            newLevel["0 Param data"]["0 double Capacity"] *= 1.5;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 1.5;
        } else if (newLevel["0 Param data"]["0 int Level"] === 900) {
            newLevel["0 Param data"]["0 double Capacity"] *= 2.25;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 2.25;
        } else if (newLevel["0 Param data"]["0 int Level"] === 1600) {
            newLevel["0 Param data"]["0 double Capacity"] *= 3;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 3;
        } else if (newLevel["0 Param data"]["0 int Level"] === 2000 || newLevel["0 Param data"]["0 int Level"] === 2100 || newLevel["0 Param data"]["0 int Level"] === 2200 || newLevel["0 Param data"]["0 int Level"] === 2300 || newLevel["0 Param data"]["0 int Level"] === 2400) {
            newLevel["0 Param data"]["0 double SuperCashReward"] = 400;
        } else if (newLevel["0 Param data"]["0 int Level"] === 2500 || newLevel["0 Param data"]["0 int Level"] === 2600 || newLevel["0 Param data"]["0 int Level"] === 2700 || newLevel["0 Param data"]["0 int Level"] === 2800 || newLevel["0 Param data"]["0 int Level"] === 2900) {
            newLevel["0 Param data"]["0 double Capacity"] *= 3;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 3;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 500;
        } else if (newLevel["0 Param data"]["0 int Level"] === 3000 || newLevel["0 Param data"]["0 int Level"] === 3500) {
            newLevel["0 Param data"]["0 double Capacity"] *= 5;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 5;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 500;
        } else if (newLevel["0 Param data"]["0 int Level"] === 3200 || newLevel["0 Param data"]["0 int Level"] === 3400) {
            newLevel["0 Param data"]["0 double Capacity"] *= 4;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 4;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 300;
        }

        // Push the new level data
        levelData_elevator.push(newLevel);
        lastLevel = newLevel;
    }

    // Display the generated levels
    displayLevels_elevator();
}

function displayLevels_elevator() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData_elevator, null, 4);
}

function copyJsonElevator() {
    let filename = `level_data_elevator.json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData_elevator, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function removeGeneratedLines() {
    // Clear the levelData_elevator array
    levelData_elevator = [];
    // Update the displayed levels
    displayLevels_elevator();
}
