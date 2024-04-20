let levelData_warehouse = [];

let warehouseCostMultiplier = 1.20;
let warehouseStatMultiplier = 1.30;
let warehouseCostMultiplier11 = 1.20;
let warehouseStatMultiplier11 = 1.25;
let warehouseCostMultiplier21 = 1.17;
let warehouseStatMultiplier21 = 1.20;
let warehouseCostMultiplier41 = 1.15;
let warehouseStatMultiplier41 = 1.15;
let warehouseCostMultiplier101 = 1.13;
let warehouseStatMultiplier101 = 1.11;
let warehouseCostMultiplier2501 = 1.15;
let warehouseStatMultiplier2501 = 1.13;
let warehouseCostMultiplier3001 = 1.18;
let warehouseStatMultiplier3001 = 1.15;

if (!window.workerSpeedIncrementWarehouseLevel) {
    var workerSpeedIncrementWarehouseLevel = {
        1: 2,
        20: 2,
        21: 2,
        100: 2,
        101: 2,
        400: 2,
        401: 2,
        535: 3,
        800: 3,
        801: 3,
        1535: 4,
        1600: 4,
        1601: 4,
        2000: 4,
        2001: 4,
        2400: 4,
        2401: 4,
        2409: 5,
        2600: 5,
        2601: 5
    };
}

if (!window.workerCountIncrementWarehouseLevel) {
    var workerCountIncrementWarehouseLevel = {
        1: 1,
        20: 2,
        21: 2,
        100: 3,
        101: 3,
        400: 4,
        401: 4,
        800: 5,
        801: 5,
        2000: 5,
        2001: 5,
        2400: 5,
        2401: 5,
        2600: 6,
        2601: 6
    };
}

function generateLevels_warehouse() {
    let currentLevel = parseInt(document.getElementById('levelInput').value);
    let currentCost = parseFloat(document.getElementById('warehouseCostInput').value);
    let currentCapacity = parseFloat(document.getElementById('warehouseCapacityInput').value);
    let currentLoadingPerSecond = parseFloat(document.getElementById('warehouseLoadingInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    let lastLevel = {
        "0 Param data": {
            "0 int Level": currentLevel - 1,
            "0 double Cost": currentCost,
            "0 int NumberOfWorkers": 1,
            "0 double CapacityPerWorker": currentCapacity,
            "0 int WorkerWalkingSpeedPerSecond": 2,
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
            currentCostMultiplier = warehouseCostMultiplier;
            currentStatMultiplier = warehouseStatMultiplier;
        } else if (currentLevel < 21) {
            currentCostMultiplier = warehouseCostMultiplier11;
            currentStatMultiplier = warehouseStatMultiplier11;
        } else if (currentLevel < 41) {
            currentCostMultiplier = warehouseCostMultiplier21;
            currentStatMultiplier = warehouseStatMultiplier21;
        } else if (currentLevel < 101) {
            currentCostMultiplier = warehouseCostMultiplier41;
            currentStatMultiplier = warehouseStatMultiplier41;
        } else if (currentLevel < 2501) {
            currentCostMultiplier = warehouseCostMultiplier101;
            currentStatMultiplier = warehouseStatMultiplier101;
        } else if (currentLevel < 3001) {
            currentCostMultiplier = warehouseCostMultiplier2501;
            currentStatMultiplier = warehouseStatMultiplier2501;
        } else {
            currentCostMultiplier = warehouseCostMultiplier3001;
            currentStatMultiplier = warehouseStatMultiplier3001;
        }

        // Increment cost, capacity, and loading per second based on the current level
        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * currentCostMultiplier;
        newLevel["0 Param data"]["0 double CapacityPerWorker"] = lastLevel["0 Param data"]["0 double CapacityPerWorker"] * currentStatMultiplier;
        newLevel["0 Param data"]["0 double LoadingPerSecond"] = lastLevel["0 Param data"]["0 double LoadingPerSecond"] * currentStatMultiplier;

        // Apply big update for specific levels
        if ([20, 50, 100, 200, 400, 600, 800, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 1;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 15;
        } else {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 0;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 0;
        }

        // Update capacity and loading per second according to big update
        if ([50, 200, 600, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400].includes(currentLevel)) {
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 2;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 2;
        } else if (currentLevel === 100) {
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 1.25;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 1.25;
        } else if (currentLevel === 800) {
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 1.5;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 1.5;
        } else if ([2000, 2100, 2200, 2300, 2400].includes(currentLevel)) {
            newLevel["0 Param data"]["0 double SuperCashReward"] = 400;
        } else if ([2500, 2600, 2700, 2800, 2900].includes(currentLevel)) {
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 3;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 3;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 500;
        } else if (currentLevel === 3000) {
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 5;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] *= 5;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 500;
        } else {
            newLevel["0 Param data"]["0 double SuperCashReward"] = 0;
        }

        // Increment worker speed and count based on current level
        if (workerSpeedIncrementWarehouseLevel[newLevel["0 Param data"]["0 int Level"]]) {
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = workerSpeedIncrementWarehouseLevel[newLevel["0 Param data"]["0 int Level"]];
        }
        if (workerCountIncrementWarehouseLevel[newLevel["0 Param data"]["0 int Level"]]) {
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = workerCountIncrementWarehouseLevel[newLevel["0 Param data"]["0 int Level"]];
        }

        // Push the new level data
        levelData_warehouse.push(newLevel);
        lastLevel = newLevel;
    }

    // Display the generated levels
    displayLevels_warehouse();
}

function displayLevels_warehouse() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData_warehouse, null, 4);
}

function copyJson() {
    let filename = `level_data_warehouse.json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData_warehouse, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function removeGeneratedLines() {
    // Clear the levelData_warehouse array
    levelData_warehouse = [];
    // Update the displayed levels
    displayLevels_warehouse();
}
