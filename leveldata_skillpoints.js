let levelData_skillpoints = [];

let skillpointCostMultiplier = 1.5;
let skillpointCostMultiplier31 = 2;
let skillpointCostMultiplier101 = 1.4;
let skillpointCostMultiplier151 = 1.3;
let skillpointCostMultiplier501 = 1.4;
let skillpointCostMultiplier816 = 1.1;
let skillpointCostMultiplier2501 = 1.2;

function generateLevels_skillpoints() {
    let currentLevel = parseInt(document.getElementById('skillPointIDInput').value);
    let currentSkillpointCost = parseFloat(document.getElementById('skillpointCostInput').value);
    let currentSuperCashCost = parseFloat(document.getElementById('skillpointSuperCashCostInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    let lastLevel = {
        "0 Param data": {
            "0 SInt64 SkillPointNo": currentLevel - 1,
            "0 double Cost": currentSkillpointCost,
            "0 double SuperCashCost": currentSuperCashCost
        }
    };

    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = {};
        newLevel["0 Param data"] = {};
        newLevel["0 Param data"]["0 SInt64 SkillPointNo"] = lastLevel["0 Param data"]["0 SInt64 SkillPointNo"] + 1;
        
        // Convert the skillpoint ID to a string before storing it in the level data
        let skillpointIDAsString = newLevel["0 Param data"]["0 SInt64 SkillPointNo"].toString();
        newLevel["0 Param data"]["0 SInt64 SkillPointNo"] = skillpointIDAsString;

        // Determine the correct multiplier based on the skillpoint id
        let currentCostMultiplier;
        if (newLevel["0 Param data"]["0 SInt64 SkillPointNo"] < 31) {
            currentCostMultiplier = skillpointCostMultiplier;
        } else if (newLevel["0 Param data"]["0 SInt64 SkillPointNo"] < 101) {
            currentCostMultiplier = skillpointCostMultiplier31;
        } else if (newLevel["0 Param data"]["0 SInt64 SkillPointNo"] < 151) {
            currentCostMultiplier = skillpointCostMultiplier101;
        } else if (newLevel["0 Param data"]["0 SInt64 SkillPointNo"] < 501) {
            currentCostMultiplier = skillpointCostMultiplier151;
        } else if (newLevel["0 Param data"]["0 SInt64 SkillPointNo"] < 816) {
            currentCostMultiplier = skillpointCostMultiplier501;
        } else if (newLevel["0 Param data"]["0 SInt64 SkillPointNo"] < 2501) {
            currentCostMultiplier = skillpointCostMultiplier816;
        } else {
            currentCostMultiplier = skillpointCostMultiplier2501;
        }

        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * currentCostMultiplier;
        newLevel["0 Param data"]["0 double SuperCashCost"] = lastLevel["0 Param data"]["0 double SuperCashCost"].toString();

        // Push the new level data
        levelData_skillpoints.push(newLevel);
        lastLevel = newLevel;
    }

    // Display the generated levels
    displayLevels_skillpoints();
}

function displayLevels_skillpoints() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData_skillpoints, null, 4);
}

function copyJsonSkillpoint() {
    let filename = `skillpoint_data.json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData_skillpoints, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
