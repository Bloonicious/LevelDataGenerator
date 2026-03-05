let levelData_collectibles = [];

function generateLevels_collectibles() {
    let currentCollectibleId = parseInt(document.getElementById("collectibleIDInput").value, 10);
    let collectibleType = document.getElementById("collectibleTypeInput").value;
    let rarityId = parseInt(document.getElementById("collectibleRarityInput").value, 10);
    let variant = parseInt(document.getElementById("collectibleVariantInput").value, 10);
    let maxLevel = parseInt(document.getElementById("collectibleMaxLevelInput").value, 10);
    let isActivated = parseInt(document.getElementById("collectibleIsActivatedInput").value, 10);
    let secondaryEffectId = parseInt(document.getElementById("collectibleSecondaryEffectIdInput").value, 10);
    let secondaryEffectTargetId = parseInt(document.getElementById("collectibleSecondaryEffectTargetIdInput").value, 10);
    let incrementVariant = document.getElementById("collectibleIncrementVariantInput").checked;
    let levelsToGenerate = parseInt(document.getElementById("levelsToGenerateInput").value, 10);

    if (!Number.isFinite(currentCollectibleId)) {
        currentCollectibleId = 1;
    }
    if (!Number.isFinite(rarityId)) {
        rarityId = 1;
    }
    if (!Number.isFinite(variant)) {
        variant = 1;
    }
    if (!Number.isFinite(maxLevel)) {
        maxLevel = 50;
    }
    if (!Number.isFinite(isActivated)) {
        isActivated = 0;
    }
    if (!Number.isFinite(secondaryEffectId)) {
        secondaryEffectId = 0;
    }
    if (!Number.isFinite(secondaryEffectTargetId)) {
        secondaryEffectTargetId = 0;
    }
    if (!Number.isFinite(levelsToGenerate) || levelsToGenerate <= 0) {
        displayLevels_collectibles();
        return;
    }

    let nextCollectibleId = currentCollectibleId;
    let nextVariant = variant;
    if (levelData_collectibles.length > 0) {
        const lastCollectible = levelData_collectibles[levelData_collectibles.length - 1]["0 Param data"] || {};
        const lastCollectibleId = parseInt(lastCollectible["0 int CollectibleID"], 10);
        const lastVariant = parseInt(lastCollectible["0 int Variant"], 10);

        if (Number.isFinite(lastCollectibleId)) {
            nextCollectibleId = lastCollectibleId + 1;
        }
        if (incrementVariant && Number.isFinite(lastVariant)) {
            nextVariant = lastVariant + 1;
        }
    }

    for (let i = 0; i < levelsToGenerate; i++) {
        levelData_collectibles.push({
            "0 Param data": {
                "0 int CollectibleID": nextCollectibleId + i,
                "1 string CollectibleType": collectibleType,
                "0 int RarityID": rarityId,
                "0 int Variant": incrementVariant ? nextVariant + i : variant,
                "0 int MaxLevel": maxLevel,
                "1 UInt8 IsActivated": isActivated,
                "0 int SecondaryEffectId": secondaryEffectId,
                "0 int SecondaryEffectTargetId": secondaryEffectTargetId
            }
        });
    }

    if (typeof window.recordGeneratedCount === "function") {
        window.recordGeneratedCount(levelsToGenerate);
    }

    displayLevels_collectibles();
}

function displayLevels_collectibles() {
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = JSON.stringify(levelData_collectibles, null, 4);
}

function copyJsonCollectibles() {
    let filename = "collectibles.json";
    let json = JSON.stringify(levelData_collectibles, null, 4);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
