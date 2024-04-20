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
        newLevel["0 Param data"]["0 double Capacity"] = lastLevel["0 Param data"]["0 double Capacity"] * currentStatMultiplier;
        newLevel["0 Param data"]["0 double LoadingPerSecond"] = lastLevel["0 Param data"]["0 double LoadingPerSecond"] * currentStatMultiplier;

        // Increment speed by 1 millisecond (0.001) for each level
        newLevel["0 Param data"]["0 double Speed"] = lastLevel["0 Param data"]["0 double Speed"] + 0.001;

        // Apply big update for specific levels if needed
        if ([10, 40, 80, 150, 300, 500, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000].includes(currentLevel)) {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 1;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 15;

            // Update capacity and loading per second according to big update
            if ([10, 40, 150, 300, 500, 1000, 1100, 1200, 1300, 1400, 1500, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400].includes(currentLevel)) {
                newLevel["0 Param data"]["0 double Capacity"] *= 2;
                newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 2;
            } else if (currentLevel === 80) {
                newLevel["0 Param data"]["0 double Capacity"] *= 1.25;
                newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 1.25;
            } else if (currentLevel === 800) {
                newLevel["0 Param data"]["0 double Capacity"] *= 1.5;
                newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 1.5;
            } else if (currentLevel === 900) {
                newLevel["0 Param data"]["0 double Capacity"] *= 2.25;
                newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 2.25;
            } else if (currentLevel === 1600) {
                newLevel["0 Param data"]["0 double Capacity"] *= 3;
                newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 3;
            } else if ([2000, 2100, 2200, 2300, 2400].includes(currentLevel)) {
                newLevel["0 Param data"]["0 double SuperCashReward"] = 400;
            } else if ([2500, 2600, 2700, 2800, 2900].includes(currentLevel)) {
                newLevel["0 Param data"]["0 double Capacity"] *= 3;
                newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 3;
                newLevel["0 Param data"]["0 double SuperCashReward"] = 500;
            } else if (currentLevel === 3000) {
                newLevel["0 Param data"]["0 double Capacity"] *= 5;
                newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 5;
                newLevel["0 Param data"]["0 double SuperCashReward"] = 500;
            } else {
                newLevel["0 Param data"]["0 double SuperCashReward"] = 0;
            }
        } else {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 0;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 0;
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
