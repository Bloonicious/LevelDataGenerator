let levelData_elevator = [];

let indexes_elevator = {
    byLevel: new Map(),
    byBigUpdate: new Map()
};

function buildIndexes_elevator() {
    indexes_elevator.byLevel.clear();
    indexes_elevator.byBigUpdate.clear();

    for (let i = 0; i < levelData_elevator.length; i++) {
        const entry = levelData_elevator[i];
        const data = entry["0 Param data"];

        const level = data["0 int Level"];
        indexes_elevator.byLevel.set(level, entry);

        const bigUpdate = data["1 UInt8 BigUpdate"];
        if (!indexes_elevator.byBigUpdate.has(bigUpdate)) {
            indexes_elevator.byBigUpdate.set(bigUpdate, []);
        }
        indexes_elevator.byBigUpdate.get(bigUpdate).push(entry);
    }
}

function clearIndexes_elevator() {
    indexes_elevator.byLevel.clear();
    indexes_elevator.byBigUpdate.clear();
}

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
let elevatorCostMultiplier4001 = 1.20;
let elevatorStatMultiplier4001 = 1.1667;
let elevatorCostMultiplier5001 = 1.225;
let elevatorStatMultiplier5001 = 1.1875;

const elevatorBigUpdateLevels = new Set([10, 40, 80, 150, 300, 500, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3200, 3400, 3500, 3700, 3900, 4000, 4200, 4400, 4500, 4600, 4800, 5000, 5200, 5400, 5500]);
const elevatorDoubleLevels = new Set([10, 40, 150, 300, 500, 600, 1000, 1100, 1200, 1300, 1400, 1500, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400]);
const elevatorReward400Levels = new Set([2000, 2100, 2200, 2300, 2400]);
const elevatorTimesThreeLevels = new Set([2500, 2600, 2700, 2800, 2900]);
const elevatorTimesFiveLevels = new Set([3000, 3500, 4000, 4500, 5000, 5500]);
const elevatorTimesFourLevels = new Set([3200, 3400, 3700, 3900]);
const elevatorTimesSixLevels = new Set([4200, 4400, 4600, 4800, 5200, 5400]);

function getElevatorMultipliers(level) {
    if (level < 11) {
        return { cost: elevatorCostMultiplier, stat: elevatorStatMultiplier };
    }
    if (level < 21) {
        return { cost: elevatorCostMultiplier11, stat: elevatorStatMultiplier11 };
    }
    if (level < 41) {
        return { cost: elevatorCostMultiplier21, stat: elevatorStatMultiplier21 };
    }
    if (level < 101) {
        return { cost: elevatorCostMultiplier41, stat: elevatorStatMultiplier41 };
    }
    if (level < 2501) {
        return { cost: elevatorCostMultiplier101, stat: elevatorStatMultiplier101 };
    }
    if (level < 3001) {
        return { cost: elevatorCostMultiplier2501, stat: elevatorStatMultiplier2501 };
    }
    if (level < 4001) {
        return { cost: elevatorCostMultiplier3001, stat: elevatorStatMultiplier3001 };
    }
    if (level < 5001) {
        return { cost: elevatorCostMultiplier4001, stat: elevatorStatMultiplier4001 };
    }

    return { cost: elevatorCostMultiplier5001, stat: elevatorStatMultiplier5001 };
}

function getElevatorSuperCashReward(level, includeLegacySuperCash) {
    if (!includeLegacySuperCash) {
        return null;
    }
    if (elevatorReward400Levels.has(level)) {
        return 400;
    }
    if (elevatorTimesThreeLevels.has(level) || elevatorTimesFiveLevels.has(level) || elevatorTimesSixLevels.has(level)) {
        return 500;
    }
    if (elevatorTimesFourLevels.has(level)) {
        return 300;
    }
    if (elevatorBigUpdateLevels.has(level)) {
        return 15;
    }

    return 0;
}

function applyElevatorMilestones(paramData, includeLegacySuperCash, applyStatMultipliers) {
    const level = parseInt(paramData["0 int Level"], 10);
    const isBigUpdate = elevatorBigUpdateLevels.has(level);
    const superCashReward = getElevatorSuperCashReward(level, includeLegacySuperCash);

    paramData["1 UInt8 BigUpdate"] = isBigUpdate ? 1 : 0;
    if (includeLegacySuperCash) {
        paramData["0 double SuperCashReward"] = superCashReward;
    }

    if (!applyStatMultipliers) {
        return;
    }

    if (elevatorDoubleLevels.has(level)) {
        paramData["0 double Capacity"] *= 2;
        paramData["0 double LoadingPerSecond"] *= 2;
    } else if (level === 80) {
        paramData["0 double Capacity"] *= 1.25;
        paramData["0 double LoadingPerSecond"] *= 1.25;
    } else if (level === 800) {
        paramData["0 double Capacity"] *= 1.5;
        paramData["0 double LoadingPerSecond"] *= 1.5;
    } else if (level === 900) {
        paramData["0 double Capacity"] *= 2.25;
        paramData["0 double LoadingPerSecond"] *= 2.25;
    } else if (level === 1600) {
        paramData["0 double Capacity"] *= 3;
        paramData["0 double LoadingPerSecond"] *= 3;
    } else if (elevatorTimesThreeLevels.has(level)) {
        paramData["0 double Capacity"] *= 3;
        paramData["0 double LoadingPerSecond"] *= 3;
    } else if (elevatorTimesFiveLevels.has(level)) {
        paramData["0 double Capacity"] *= 5;
        paramData["0 double LoadingPerSecond"] *= 5;
    } else if (elevatorTimesFourLevels.has(level)) {
        paramData["0 double Capacity"] *= 4;
        paramData["0 double LoadingPerSecond"] *= 4;
    } else if (elevatorTimesSixLevels.has(level)) {
        paramData["0 double Capacity"] *= 6;
        paramData["0 double LoadingPerSecond"] *= 6;
    }
}

function generateLevels_elevator() {
    let currentLevel = parseInt(document.getElementById('elevatorLevelInput').value);
    let currentCost = parseFloat(document.getElementById('elevatorCostInput').value);
    let currentSpeed = parseFloat(document.getElementById('speedInput').value);
    let currentCapacity = parseFloat(document.getElementById('elevatorCapacityInput').value);
    let currentLoadingPerSecond = parseFloat(document.getElementById('elevatorLoadingInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);
    let includeLegacySuperCash = document.getElementById("legacySuperCashInput").checked;

    if (!Number.isFinite(currentLevel)) {
        currentLevel = 1;
    }
    if (!Number.isFinite(currentCost)) {
        currentCost = 0;
    }
    if (!Number.isFinite(currentSpeed)) {
        currentSpeed = 0;
    }
    if (!Number.isFinite(currentCapacity)) {
        currentCapacity = 0;
    }
    if (!Number.isFinite(currentLoadingPerSecond)) {
        currentLoadingPerSecond = 0;
    }
    if (!Number.isFinite(levelsToGenerate) || levelsToGenerate <= 0) {
        displayLevels_elevator();
        return;
    }

    let lastLevel = levelData_elevator.length > 0 ? levelData_elevator[levelData_elevator.length - 1] : null;

    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = { "0 Param data": {} };

        if (!lastLevel) {
            newLevel["0 Param data"]["0 int Level"] = currentLevel;
            newLevel["0 Param data"]["0 double Cost"] = currentCost;
            newLevel["0 Param data"]["0 double Speed"] = currentSpeed;
            newLevel["0 Param data"]["0 double Capacity"] = currentCapacity;
            newLevel["0 Param data"]["0 double LoadingPerSecond"] = currentLoadingPerSecond;
            applyElevatorMilestones(newLevel["0 Param data"], includeLegacySuperCash, false);

            levelData_elevator.push(newLevel);
            lastLevel = newLevel;
            continue;
        }

        const newLevelNumber = parseInt(lastLevel["0 Param data"]["0 int Level"], 10) + 1;
        const multipliers = getElevatorMultipliers(newLevelNumber);
        newLevel["0 Param data"]["0 int Level"] = newLevelNumber;

        // Increment cost, capacity, and loading per second based on the current level
        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * multipliers.cost;
        // Increment speed by 2 milliseconds (0.002) for each level
        newLevel["0 Param data"]["0 double Speed"] = lastLevel["0 Param data"]["0 double Speed"] + 0.002;
        newLevel["0 Param data"]["0 double Capacity"] = lastLevel["0 Param data"]["0 double Capacity"] * multipliers.stat;
        newLevel["0 Param data"]["0 double LoadingPerSecond"] = lastLevel["0 Param data"]["0 double LoadingPerSecond"] * multipliers.stat;
        applyElevatorMilestones(newLevel["0 Param data"], includeLegacySuperCash, true);

        // Push the new level data
        levelData_elevator.push(newLevel);
        lastLevel = newLevel;
    }

    if (typeof window.recordGeneratedCount === "function") {
        window.recordGeneratedCount(levelsToGenerate);
    }

    buildIndexes_elevator();
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
