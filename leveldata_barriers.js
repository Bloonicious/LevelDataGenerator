let levelData_barriers = [];

let indexes_barriers = {
    byOrder: new Map(),
    byFromTier: new Map(),
    byToTier: new Map()
};

function buildIndexes_barriers() {
    indexes_barriers.byOrder.clear();
    indexes_barriers.byFromTier.clear();
    indexes_barriers.byToTier.clear();

    for (let i = 0; i < levelData_barriers.length; i++) {
        const entry = levelData_barriers[i];
        const data = entry["0 Param data"];

        const order = data["0 int Order"];
        indexes_barriers.byOrder.set(order, entry);

        const fromTier = data["0 int FromTier"];
        if (!indexes_barriers.byFromTier.has(fromTier)) {
            indexes_barriers.byFromTier.set(fromTier, []);
        }
        indexes_barriers.byFromTier.get(fromTier).push(entry);

        const toTier = data["0 int ToTier"];
        if (!indexes_barriers.byToTier.has(toTier)) {
            indexes_barriers.byToTier.set(toTier, []);
        }
        indexes_barriers.byToTier.get(toTier).push(entry);
    }
}

function clearIndexes_barriers() {
    indexes_barriers.byOrder.clear();
    indexes_barriers.byFromTier.clear();
    indexes_barriers.byToTier.clear();
}

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

    if (levelData_barriers.length > 0) {
        const lastBarrier = levelData_barriers[levelData_barriers.length - 1]["0 Param data"] || {};
        const lastOrder = parseInt(lastBarrier["0 int Order"], 10);
        const lastFromTier = parseInt(lastBarrier["0 int FromTier"], 10);
        const lastToTier = parseInt(lastBarrier["0 int ToTier"], 10);
        const lastCost = parseFloat(lastBarrier["0 double Cost"]);
        const lastBuildTime = parseFloat(lastBarrier["0 double BuildTimeInSeconds"]);

        if (Number.isFinite(lastOrder)) {
            order = lastOrder + 1;
        }
        if (Number.isFinite(lastFromTier) && Number.isFinite(lastToTier)) {
            tierSpan = Math.max(1, lastToTier - lastFromTier + 1);
            fromTier = lastToTier + 1;
            toTier = fromTier + tierSpan - 1;
        }
        if (Number.isFinite(lastCost)) {
            cost = lastCost * costMultiplier;
        }
        if (Number.isFinite(lastBuildTime)) {
            buildTime = lastBuildTime * buildTimeMultiplier;
        }
    }

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

    buildIndexes_barriers();
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
