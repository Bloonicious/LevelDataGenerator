let levelData_collectibleFactors = [];

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
