let levelData_warehouse = [];

let workerSpeedIncrementLevel = {
    1: 2,
    535: 3,
    1535: 4,
    2409: 5
};

let workerCountIncrementLevel = {
    1: 1,
    20: 2,
    100: 3,
    400: 4,
    800: 5,
    2600: 6
};

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

        // Increment cost, capacity, and loading per second based on the current level
        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * 1.16; // Example multiplier, adjust as needed
        newLevel["0 Param data"]["0 double CapacityPerWorker"] = lastLevel["0 Param data"]["0 double CapacityPerWorker"] * 1.1; // Example multiplier, adjust as needed
        newLevel["0 Param data"]["0 double LoadingPerSecond"] = lastLevel["0 Param data"]["0 double LoadingPerSecond"] * 1.1; // Example multiplier, adjust as needed

        // Apply big update for specific levels
        if (currentLevel === 20 || currentLevel === 50 || currentLevel === 100 || currentLevel === 200 || currentLevel === 400 || currentLevel === 600 || currentLevel === 800 || currentLevel === 850 || currentLevel === 950 || currentLevel === 1050 || currentLevel === 1150 || currentLevel === 1250) {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 1;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 15;
        } else {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 0;
            newLevel["0 Param data"]["0 double SuperCashReward"] = 0;
        }

        // Increment worker speed and count based on current level
        if (workerSpeedIncrementLevel[currentLevel]) {
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = workerSpeedIncrementLevel[currentLevel];
        }
        if (workerCountIncrementLevel[currentLevel]) {
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = workerCountIncrementLevel[currentLevel];
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
    let json = JSON.stringify(levelData, null, 4);
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
