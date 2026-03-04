let levelData_skillpoints = [];

let skillpointCostMultiplier = 1.5;
let skillpointCostMultiplier31 = 2;
let skillpointCostMultiplier101 = 1.4;
let skillpointCostMultiplier151 = 1.3;
let skillpointCostMultiplier501 = 1.4;
let skillpointCostMultiplier816 = 1.1;
let skillpointCostMultiplier2501 = 1.2;

function getLegacySkillpointMultiplier(skillPointNo) {
    if (skillPointNo < 31) {
        return skillpointCostMultiplier;
    } else if (skillPointNo < 101) {
        return skillpointCostMultiplier31;
    } else if (skillPointNo < 151) {
        return skillpointCostMultiplier101;
    } else if (skillPointNo < 501) {
        return skillpointCostMultiplier151;
    } else if (skillPointNo < 816) {
        return skillpointCostMultiplier501;
    } else if (skillPointNo < 2501) {
        return skillpointCostMultiplier816;
    }

    return skillpointCostMultiplier2501;
}

function generateLevels_skillpoints() {
    let currentLevel = parseInt(document.getElementById("skillPointIDInput").value, 10);
    let currentSkillpointCost = parseFloat(document.getElementById("skillpointCostInput").value);
    let currentSuperCashCost = parseFloat(document.getElementById("skillpointSuperCashCostInput").value);
    let customCostMultiplier = parseFloat(document.getElementById("skillpointCostMultiplierInput").value);
    let levelsToGenerate = parseInt(document.getElementById("levelsToGenerateInput").value, 10);

    if (!Number.isFinite(currentLevel)) {
        currentLevel = 1;
    }
    if (!Number.isFinite(currentSkillpointCost)) {
        currentSkillpointCost = 0;
    }
    if (!Number.isFinite(currentSuperCashCost)) {
        currentSuperCashCost = 0;
    }
    if (!Number.isFinite(levelsToGenerate) || levelsToGenerate <= 0) {
        displayLevels_skillpoints();
        return;
    }

    let useCustomMultiplier = Number.isFinite(customCostMultiplier) && customCostMultiplier > 0;

    let lastLevel = {
        "0 Param data": {
            "0 SInt64 SkillPointNo": currentLevel - 1,
            "0 double Cost": currentSkillpointCost,
            "0 double SuperCashCost": currentSuperCashCost
        }
    };

    for (let i = 0; i < levelsToGenerate; i++) {
        let newSkillPointNo = lastLevel["0 Param data"]["0 SInt64 SkillPointNo"] + 1;
        let currentCostMultiplier = useCustomMultiplier ? customCostMultiplier : getLegacySkillpointMultiplier(newSkillPointNo);
        let newCost = lastLevel["0 Param data"]["0 double Cost"] * currentCostMultiplier;

        levelData_skillpoints.push({
            "0 Param data": {
                "0 SInt64 SkillPointNo": newSkillPointNo.toString(),
                "0 double Cost": newCost,
                "0 double SuperCashCost": lastLevel["0 Param data"]["0 double SuperCashCost"]
            }
        });

        lastLevel["0 Param data"]["0 SInt64 SkillPointNo"] = newSkillPointNo;
        lastLevel["0 Param data"]["0 double Cost"] = newCost;
    }

    if (typeof window.recordGeneratedCount === "function") {
        window.recordGeneratedCount(levelsToGenerate);
    }

    displayLevels_skillpoints();
}

function displayLevels_skillpoints() {
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = JSON.stringify(levelData_skillpoints, null, 4);
}

function copyJsonSkillpoint() {
    let filename = "skillpoint_data.json";
    let json = JSON.stringify(levelData_skillpoints, null, 4);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
