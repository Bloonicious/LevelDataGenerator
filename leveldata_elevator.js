let levelData_elevator = [];

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

        // Increment cost, speed, capacity, and loading per second based on the current level
        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * 1.16; // Example multiplier, adjust as needed
        newLevel["0 Param data"]["0 double Speed"] = lastLevel["0 Param data"]["0 double Speed"] * 1.1; // Example multiplier, adjust as needed
        newLevel["0 Param data"]["0 double Capacity"] = lastLevel["0 Param data"]["0 double Capacity"] * 1.1; // Example multiplier, adjust as needed
        newLevel["0 Param data"]["0 double LoadingPerSecond"] = lastLevel["0 Param data"]["0 double LoadingPerSecond"] * 1.1; // Example multiplier, adjust as needed

        // Apply big update for specific levels if needed

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
