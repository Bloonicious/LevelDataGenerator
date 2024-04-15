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

const costMultiplier = 1.225;
const statMultiplier = 1.2;

function generateLevels() {
    let lastIndex = levelData.length - 1;
    let lastLevel = levelData[lastIndex]["0 Param data"];

    for (let i = 0; i < 10; i++) {
        let newLevel = {};

        newLevel["0 Param data"] = {};
        newLevel["0 Param data"]["0 int Tier"] = lastLevel["0 int Tier"];
        newLevel["0 Param data"]["0 int Level"] = lastLevel["0 int Level"] + 1;
        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 double Cost"] * costMultiplier;
        newLevel["0 Param data"]["0 int NumberOfWorkers"] = lastLevel["0 int NumberOfWorkers"];
        newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] = lastLevel["0 double GainPerSecondPerWorker"] * statMultiplier;
        newLevel["0 Param data"]["0 double CapacityPerWorker"] = lastLevel["0 double CapacityPerWorker"] * statMultiplier;
        newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = lastLevel["0 int WorkerWalkingSpeedPerSecond"];
        newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 0;
        newLevel["0 Param data"]["0 double SuperCashReward"] = 0;

        levelData.push(newLevel);
        lastLevel = newLevel["0 Param data"];
    }

    // Check if the last level generated is level 850
    if (lastLevel["0 int Level"] === 850) {
        lastLevel["1 UInt8 BigUpdate"] = 1;
        lastLevel["0 double SuperCashReward"] = 2;
        lastLevel["0 int NumberOfWorkers"] += 1;
        lastLevel["0 double GainPerSecondPerWorker"] *= 3.6;
        lastLevel["0 double CapacityPerWorker"] *= 3.6;
    }
}

function viewCurrentValues() {
    console.log(JSON.stringify(levelData, null, 2));
}

// Call generateLevels() to initially generate levels
generateLevels();
