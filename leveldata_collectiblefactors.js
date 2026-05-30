let levelData_collectibleFactors = [];

let indexes_collectibleFactors = {
    byCollectibleID: new Map(),
    byCollectibleLevel: new Map(),
    byCollectibleIDAndLevel: new Map()
};

function buildIndexes_collectibleFactors() {
    indexes_collectibleFactors.byCollectibleID.clear();
    indexes_collectibleFactors.byCollectibleLevel.clear();
    indexes_collectibleFactors.byCollectibleIDAndLevel.clear();

    for (let i = 0; i < levelData_collectibleFactors.length; i++) {
        const entry = levelData_collectibleFactors[i];
        const data = entry["0 Param data"];

        const collectibleId = data["0 int CollectibleID"];
        if (!indexes_collectibleFactors.byCollectibleID.has(collectibleId)) {
            indexes_collectibleFactors.byCollectibleID.set(collectibleId, []);
        }
        indexes_collectibleFactors.byCollectibleID.get(collectibleId).push(entry);

        const level = data["0 int CollectibleLevel"];
        if (!indexes_collectibleFactors.byCollectibleLevel.has(level)) {
            indexes_collectibleFactors.byCollectibleLevel.set(level, []);
        }
        indexes_collectibleFactors.byCollectibleLevel.get(level).push(entry);

        const compositeKey = collectibleId + ":" + level;
        indexes_collectibleFactors.byCollectibleIDAndLevel.set(compositeKey, entry);
    }
}

function clearIndexes_collectibleFactors() {
    indexes_collectibleFactors.byCollectibleID.clear();
    indexes_collectibleFactors.byCollectibleLevel.clear();
    indexes_collectibleFactors.byCollectibleIDAndLevel.clear();
}

function generateLevels_collectibleFactors() {
    let collectibleId = parseInt(document.getElementById("collectibleFactorCollectibleIDInput").value, 10);
    let currentLevel = parseInt(document.getElementById("collectibleFactorLevelInput").value, 10);
    let productionFactor = parseFloat(document.getElementById("collectibleFactorProductionInput").value);
    let partsRequired = parseFloat(document.getElementById("collectibleFactorPartsInput").value);
    let secondaryEffectFactor = parseFloat(document.getElementById("collectibleFactorSecondaryInput").value);
    let productionMultiplier = parseFloat(document.getElementById("collectibleFactorProductionMultiplierInput").value);
    let partsMultiplier = parseFloat(document.getElementById("collectibleFactorPartsMultiplierInput").value);
    let secondaryMultiplier = parseFloat(document.getElementById("collectibleFactorSecondaryMultiplierInput").value);
    let levelsToGenerate = parseInt(document.getElementById("levelsToGenerateInput").value, 10);

    if (!Number.isFinite(collectibleId)) {
        collectibleId = 1;
    }
    if (!Number.isFinite(currentLevel)) {
        currentLevel = 0;
    }
    if (!Number.isFinite(productionFactor)) {
        productionFactor = 1;
    }
    if (!Number.isFinite(partsRequired)) {
        partsRequired = 0;
    }
    if (!Number.isFinite(secondaryEffectFactor)) {
        secondaryEffectFactor = 1;
    }
    if (!Number.isFinite(productionMultiplier) || productionMultiplier <= 0) {
        productionMultiplier = 1;
    }
    if (!Number.isFinite(partsMultiplier) || partsMultiplier <= 0) {
        partsMultiplier = 1;
    }
    if (!Number.isFinite(secondaryMultiplier) || secondaryMultiplier <= 0) {
        secondaryMultiplier = 1;
    }
    if (!Number.isFinite(levelsToGenerate) || levelsToGenerate <= 0) {
        displayLevels_collectibleFactors();
        return;
    }

    if (levelData_collectibleFactors.length > 0) {
        const lastFactor = levelData_collectibleFactors[levelData_collectibleFactors.length - 1]["0 Param data"] || {};
        const lastCollectibleId = parseInt(lastFactor["0 int CollectibleID"], 10);
        const lastLevel = parseInt(lastFactor["0 int CollectibleLevel"], 10);
        const lastProduction = parseFloat(lastFactor["0 double ProductionFactor"]);
        const lastPartsRequired = parseFloat(lastFactor["0 SInt64 PartsRequired"]);
        const lastSecondary = parseFloat(lastFactor["0 double SecondaryEffectFactor"]);

        if (Number.isFinite(lastCollectibleId)) {
            collectibleId = lastCollectibleId;
        }
        if (Number.isFinite(lastLevel)) {
            currentLevel = lastLevel + 1;
        }
        if (Number.isFinite(lastProduction)) {
            productionFactor = lastProduction * productionMultiplier;
        }
        if (Number.isFinite(lastPartsRequired)) {
            partsRequired = lastPartsRequired * partsMultiplier;
        }
        if (Number.isFinite(lastSecondary)) {
            secondaryEffectFactor = lastSecondary * secondaryMultiplier;
        }
    }

    for (let i = 0; i < levelsToGenerate; i++) {
        levelData_collectibleFactors.push({
            "0 Param data": {
                "0 int CollectibleID": collectibleId,
                "0 int CollectibleLevel": currentLevel + i,
                "0 double ProductionFactor": productionFactor,
                "0 SInt64 PartsRequired": Math.max(0, Math.round(partsRequired)).toString(),
                "0 double SecondaryEffectFactor": secondaryEffectFactor
            }
        });

        productionFactor *= productionMultiplier;
        partsRequired *= partsMultiplier;
        secondaryEffectFactor *= secondaryMultiplier;
    }

    if (typeof window.recordGeneratedCount === "function") {
        window.recordGeneratedCount(levelsToGenerate);
    }

    buildIndexes_collectibleFactors();
    displayLevels_collectibleFactors();
}

function displayLevels_collectibleFactors() {
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = JSON.stringify(levelData_collectibleFactors, null, 4);
}

function copyJsonCollectibleFactors() {
    let filename = "collectible_production_factors.json";
    let json = JSON.stringify(levelData_collectibleFactors, null, 4);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
