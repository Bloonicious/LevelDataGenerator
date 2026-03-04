let levelData_barriers = [];

function generateLevels_barriers() {
    let currentOrder = parseInt(document.getElementById("barrierOrderInput").value, 10);
    let currentFromTier = parseInt(document.getElementById("barrierFromTierInput").value, 10);
    let currentToTier = parseInt(document.getElementById("barrierToTierInput").value, 10);
    let currentCost = parseFloat(document.getElementById("barrierCostInput").value);
    let currentBuildTime = parseFloat(document.getElementById("barrierBuildTimeInput").value);
    let currentSecondsReduced = parseInt(document.getElementById("barrierSecondsReducedInput").value, 10);
    let currentMaxVideos = parseInt(document.getElementById("barrierMaxVideosInput").value, 10);
    let costMultiplier = parseFloat(document.getElementById("barrierCostMultiplierInput").value);
    let buildTimeMultiplier = parseFloat(document.getElementById("barrierBuildTimeMultiplierInput").value);
    let levelsToGenerate = parseInt(document.getElementById("levelsToGenerateInput").value, 10);

    if (!Number.isFinite(currentOrder)) {
        currentOrder = 0;
    }
    if (!Number.isFinite(currentFromTier)) {
        currentFromTier = 1;
    }
    if (!Number.isFinite(currentToTier)) {
        currentToTier = currentFromTier;
    }
    if (currentToTier < currentFromTier) {
        currentToTier = currentFromTier;
    }
    if (!Number.isFinite(currentCost)) {
        currentCost = 0;
    }
    if (!Number.isFinite(currentBuildTime)) {
        currentBuildTime = 0;
    }
    if (!Number.isFinite(currentSecondsReduced)) {
        currentSecondsReduced = 0;
    }
    if (!Number.isFinite(currentMaxVideos)) {
        currentMaxVideos = 0;
    }
    if (!Number.isFinite(costMultiplier)) {
        costMultiplier = 1;
    }
    if (!Number.isFinite(buildTimeMultiplier)) {
        buildTimeMultiplier = 1;
    }
    if (!Number.isFinite(levelsToGenerate) || levelsToGenerate <= 0) {
        displayLevels_barriers();
        return;
    }

    let tierSpan = Math.max(1, currentToTier - currentFromTier + 1);
    let order = currentOrder;
    let fromTier = currentFromTier;
    let toTier = currentToTier;
    let cost = currentCost;
    let buildTime = currentBuildTime;

    for (let i = 0; i < levelsToGenerate; i++) {
        levelData_barriers.push({
            "0 Param data": {
                "0 int Order": order,
                "0 int FromTier": fromTier,
                "0 int ToTier": toTier,
                "0 double Cost": cost,
                "0 double BuildTimeInSeconds": buildTime,
                "0 int SecondsReducedPerVideoWatched": currentSecondsReduced,
                "0 int MaxNumberOfVideosPerHour": currentMaxVideos
            }
        });

        order += 1;
        fromTier = toTier + 1;
        toTier = fromTier + tierSpan - 1;
        cost *= costMultiplier;
        buildTime *= buildTimeMultiplier;
    }

    if (typeof window.recordGeneratedCount === "function") {
        window.recordGeneratedCount(levelsToGenerate);
    }

    displayLevels_barriers();
}

function displayLevels_barriers() {
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = JSON.stringify(levelData_barriers, null, 4);
}

function copyJsonBarrier() {
    let filename = "mine_barriers.json";
    let json = JSON.stringify(levelData_barriers, null, 4);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
