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
    1501: 6,
    1600: 6,
    1601: 6,
    1655: 7,
    1750: 7,
    1751: 7,
    1800: 7,
    1801: 7,
    1850: 7,
    1851: 7,
    1900: 7,
    1901: 7,
    1950: 7,
    1951: 7,
    2000: 7,
    2001: 7
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
    1501: 8,
    1600: 8,
    1601: 8,
    1700: 8,
    1701: 8,
    1750: 8,
    1751: 8,
    1800: 8,
    1801: 8,
    1850: 8,
    1851: 8,
    1900: 8,
    1901: 8,
    1950: 8,
    1951: 8,
    2000: 8,
    2001: 8
};

const mineshaftBigUpdateLevels = new Set([10, 25, 50, 100, 200, 400, 500, 600, 700, 800, 850, 900, 1000, 1200, 1400, 1500, 1600, 1750, 1875, 2000]);

function getIncrementValueAtLevel(incrementMap, targetLevel, fallbackValue) {
    let resolvedValue = fallbackValue;
    const keys = Object.keys(incrementMap)
        .map(function(key) {
            return parseInt(key, 10);
        })
        .filter(function(level) {
            return Number.isFinite(level) && level <= targetLevel;
        })
        .sort(function(a, b) {
            return a - b;
        });

    for (let i = 0; i < keys.length; i++) {
        resolvedValue = incrementMap[keys[i]];
    }

    return resolvedValue;
}

function getMineshaftMultipliers(level) {
    if (level < 21) {
        return { cost: costMultiplier, stat: statMultiplier };
    }
    if (level < 101) {
        return { cost: costMultiplier21, stat: statMultiplier21 };
    }
    if (level < 401) {
        return { cost: costMultiplier101, stat: statMultiplier101 };
    }
    if (level < 801) {
        return { cost: costMultiplier401, stat: statMultiplier401 };
    }
    if (level < 851) {
        return { cost: costMultiplier801, stat: statMultiplier801 };
    }
    if (level < 1001) {
        return { cost: costMultiplier851, stat: statMultiplier851 };
    }
    if (level < 1501) {
        return { cost: costMultiplier1001, stat: statMultiplier1001 };
    }

    return { cost: costMultiplier1501, stat: statMultiplier1501 };
}

function getMineshaftSuperCashReward(tier) {
    const superCashRewards = {
        0: 2,
        21: 12,
        22: 18,
        23: 24,
        24: 30,
        25: 40,
        31: 50
    };
    let reward = 2;

    for (let i = 0; i < Object.keys(superCashRewards).length; i++) {
        const tierKey = parseInt(Object.keys(superCashRewards)[i], 10);
        if (tier >= tierKey) {
            reward = superCashRewards[tierKey];
        }
    }

    return reward;
}

function generateLevels_mineshaft() {
    let currentLevel = parseInt(document.getElementById('mineshaftLevelInput').value);
    let currentTier = parseInt(document.getElementById('tierInput').value);
    let currentCost = parseFloat(document.getElementById('mineshaftCostInput').value);
    let currentGain = parseFloat(document.getElementById('mineshaftGainInput').value);
    let currentCapacity = parseFloat(document.getElementById('mineshaftCapacityInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);
    let includeLegacySuperCash = document.getElementById("legacySuperCashInput").checked;

    if (!Number.isFinite(currentLevel)) {
        currentLevel = 1;
    }
    if (!Number.isFinite(currentTier)) {
        currentTier = 1;
    }
    if (!Number.isFinite(currentCost)) {
        currentCost = 0;
    }
    if (!Number.isFinite(currentGain)) {
        currentGain = 0;
    }
    if (!Number.isFinite(currentCapacity)) {
        currentCapacity = 0;
    }
    if (!Number.isFinite(levelsToGenerate) || levelsToGenerate <= 0) {
        displayLevels_mineshaft();
        return;
    }

    let lastLevel = levelData_mineshaft.length > 0 ? levelData_mineshaft[levelData_mineshaft.length - 1] : null;
    if (lastLevel && lastLevel["0 Param data"] && Number.isFinite(parseInt(lastLevel["0 Param data"]["0 int Tier"], 10))) {
        currentTier = parseInt(lastLevel["0 Param data"]["0 int Tier"], 10);
    }

    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = { "0 Param data": {} };

        if (!lastLevel) {
            const isBigUpdateLevel = mineshaftBigUpdateLevels.has(currentLevel);
            newLevel["0 Param data"]["0 int Tier"] = currentTier;
            newLevel["0 Param data"]["0 int Level"] = currentLevel;
            newLevel["0 Param data"]["0 double Cost"] = currentCost;
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = getIncrementValueAtLevel(workerCountIncrementLevel, currentLevel, 1);
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] = currentGain;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] = currentCapacity;
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = getIncrementValueAtLevel(workerSpeedIncrementLevel, currentLevel, 2);
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = isBigUpdateLevel ? 1 : 0;
            if (includeLegacySuperCash) {
                newLevel["0 Param data"]["0 double SuperCashReward"] = isBigUpdateLevel ? getMineshaftSuperCashReward(currentTier) : 0;
            }

            levelData_mineshaft.push(newLevel);
            lastLevel = newLevel;
            continue;
        }

        const newLevelNumber = parseInt(lastLevel["0 Param data"]["0 int Level"], 10) + 1;
        const multipliers = getMineshaftMultipliers(newLevelNumber);
        const isBigUpdateLevel = mineshaftBigUpdateLevels.has(newLevelNumber);
        newLevel["0 Param data"]["0 int Tier"] = currentTier;
        newLevel["0 Param data"]["0 int Level"] = newLevelNumber;

        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * multipliers.cost;
        if (workerCountIncrementLevel[newLevel["0 Param data"]["0 int Level"]]) {
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = workerCountIncrementLevel[newLevel["0 Param data"]["0 int Level"]];
        } else {
            newLevel["0 Param data"]["0 int NumberOfWorkers"] = lastLevel["0 Param data"]["0 int NumberOfWorkers"];
        }
        newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] = lastLevel["0 Param data"]["0 double GainPerSecondPerWorker"] * multipliers.stat;
        newLevel["0 Param data"]["0 double CapacityPerWorker"] = lastLevel["0 Param data"]["0 double CapacityPerWorker"] * multipliers.stat;
        if (workerSpeedIncrementLevel[newLevel["0 Param data"]["0 int Level"]]) {
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = workerSpeedIncrementLevel[newLevel["0 Param data"]["0 int Level"]];
        } else {
            newLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"] = lastLevel["0 Param data"]["0 int WorkerWalkingSpeedPerSecond"];
        }

        // Apply big update and super cash rewards
        if (isBigUpdateLevel) {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 1;
            if (includeLegacySuperCash) {
                newLevel["0 Param data"]["0 double SuperCashReward"] = getMineshaftSuperCashReward(currentTier);
            }
        } else {
            newLevel["0 Param data"]["1 UInt8 BigUpdate"] = 0;
            if (includeLegacySuperCash) {
                newLevel["0 Param data"]["0 double SuperCashReward"] = 0;
            }
        }

        // Apply special conditions for specific levels
        if ([25, 50, 100, 200, 400, 500, 600, 700, 800].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 2;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 2;
        } else if ([850, 900].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 3;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 3;
        } else if ([1000, 1200, 1400].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 4;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 4;
        } else if ([1500, 1600].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 5;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 5;
        } else if ([1875].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 7;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 7;
        } else if ([1750, 2000].includes(newLevel["0 Param data"]["0 int Level"])) {
            newLevel["0 Param data"]["0 double GainPerSecondPerWorker"] *= 10;
            newLevel["0 Param data"]["0 double CapacityPerWorker"] *= 10;
        }
        
        // Copy the generated level to the output
        levelData_mineshaft.push(newLevel);
        lastLevel = newLevel;
    }

    if (typeof window.recordGeneratedCount === "function") {
        window.recordGeneratedCount(levelsToGenerate);
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
