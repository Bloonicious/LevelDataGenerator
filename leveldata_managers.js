let levelData_managers = [];

function generateLevels_managers() {
    let currentLevel = parseInt(document.getElementById('managerIDInput').value);
    let currentRarity = parseInt(document.getElementById('managerRarityInput').value);
    let currentEffect = parseInt(document.getElementById('effectIDInput').value);
    let currentActiveTime = parseFloat(document.getElementById('activeTimeInput').value);
    let currentCooldown = parseFloat(document.getElementById('activeCooldownInput').value);
    let currentArea = parseFloat(document.getElementById('managerAreaInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    let lastLevel = {
        "0 Param data": {
            "0 int ManagerID": currentLevel - 1,
            "0 string Name": currentName,
            "0 int RarityID": currentRarity,
            "0 int EffectID": currentEffect,
            "0 string Area": currentArea,
            "0 double DelayPerClickInSeconds": 0.05,
            "0 double ValueX": currentActiveTime,
            "0 double ActiveTime": currentActiveTime,
            "0 double Cooldown": currentCooldown,
            "1 UInt8 AvailableThroughPurchase": 1,
            "1 UInt8 RatingReward": 0,
            "0 int ManagerBuyOrder": 0
        }
    };

    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = {};

        newLevel["0 Param data"] = {};
        newLevel["0 Param data"]["0 int ManagerID"] = lastLevel["0 Param data"]["0 int ManagerID"] + 1;

        // Push the new level data
        levelData_managers.push(newLevel);
        lastLevel = newLevel;
    }

    // Display the generated levels
    displayLevels_managers();
}

function displayLevels_managerCost() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData_managers, null, 4);
}

function copyJsonManagers() {
    let filename = `managers.json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData_managerCost, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
