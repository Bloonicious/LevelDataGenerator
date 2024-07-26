let levelData_skillpoints = [];

let skillpointCostMultiplier = 1.5;
let skillpointCostMultiplier31 = 2;
let skillpointCostMultiplier101 = 1.4;
let skillpointCostMultiplier151 = 1.3;
let skillpointCostMultiplier501 = 1.4;
let skillpointCostMultiplier816 = 1.1;
let skillpointCostMultiplier2501 = 1.2;

function generateLevels_skillpoints() {
    // Read and parse input values
    let currentLevel = parseInt(document.getElementById('skillPointIDInput').value);
    let currentSkillpointCost = parseFloat(document.getElementById('skillpointCostInput').value);
    let currentSuperCashCost = parseFloat(document.getElementById('skillpointSuperCashCostInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    // Initialize last level object
    let lastLevel = {
        "0 Param data": {
            "0 SInt64 SkillPointNo": currentLevel - 1,
            "0 double Cost": currentSkillpointCost,
            "0 double SuperCashCost": currentSuperCashCost
        }
    };

    // Generate levels
    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = {};
        newLevel["0 Param data"] = {};

        // Calculate new skillpoint number as a number
        let newSkillPointNo = lastLevel["0 Param data"]["0 SInt64 SkillPointNo"] + 1;
        newLevel["0 Param data"]["0 SInt64 SkillPointNo"] = newSkillPointNo;

        // Determine the correct cost multiplier based on the skillpoint number
        let currentCostMultiplier;
        if (newSkillPointNo < 31) {
            currentCostMultiplier = skillpointCostMultiplier;
        } else if (newSkillPointNo < 101) {
            currentCostMultiplier = skillpointCostMultiplier31;
        } else if (newSkillPointNo < 151) {
            currentCostMultiplier = skillpointCostMultiplier101;
        } else if (newSkillPointNo < 501) {
            currentCostMultiplier = skillpointCostMultiplier151;
        } else if (newSkillPointNo < 816) {
            currentCostMultiplier = skillpointCostMultiplier501;
        } else if (newSkillPointNo < 2501) {
            currentCostMultiplier = skillpointCostMultiplier816;
        } else {
            currentCostMultiplier = skillpointCostMultiplier2501;
        }

        // Calculate new costs
        newLevel["0 Param data"]["0 double Cost"] = lastLevel["0 Param data"]["0 double Cost"] * currentCostMultiplier;
        newLevel["0 Param data"]["0 double SuperCashCost"] = lastLevel["0 Param data"]["0 double SuperCashCost"];

        // Convert the skillpoint ID to a string for storage in the JSON output
        newLevel["0 Param data"]["0 SInt64 SkillPointNo"] = newSkillPointNo.toString();

        // Add new level data to the array
        levelData_skillpoints.push(newLevel);

        // Update lastLevel for the next iteration
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
    let json = JSON.stringify(levelData_skillpoints, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
