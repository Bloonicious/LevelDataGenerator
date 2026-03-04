let levelData_managers = [];

const usedManagerNamesStorageKey = "usedManagerNames";
const managerNameDatabase = buildManagerNameDatabase(window.managerNamesDb);
const usedManagerNameKeys = new Set();
let usedManagerNameValues = [];

loadUsedManagerNames();

function buildManagerNameDatabase(rawDatabase) {
    let database = rawDatabase || {};
    let maleFullNames = [];
    let femaleFullNames = [];
    let maleFirstNames = [];
    let femaleFirstNames = [];
    let surnames = [];

    if (Array.isArray(database)) {
        for (let i = 0; i < database.length; i++) {
            let firstName = normalizeNamePart(database[i].Name);
            let surname = normalizeNamePart(database[i].Surname);
            if (!firstName || !surname) {
                continue;
            }

            maleFullNames.push(`${firstName} ${surname}`);
            femaleFullNames.push(`${firstName} ${surname}`);
            maleFirstNames.push(firstName);
            femaleFirstNames.push(firstName);
            surnames.push(surname);
        }
    } else {
        maleFullNames = normalizeNameList(database.maleFullNames);
        femaleFullNames = normalizeNameList(database.femaleFullNames);
        maleFirstNames = normalizeNameList(database.maleFirstNames);
        femaleFirstNames = normalizeNameList(database.femaleFirstNames);
        surnames = normalizeNameList(database.surnames);
    }

    return {
        maleFullNames: uniqueNameList(maleFullNames),
        femaleFullNames: uniqueNameList(femaleFullNames),
        maleFirstNames: uniqueNameList(maleFirstNames),
        femaleFirstNames: uniqueNameList(femaleFirstNames),
        surnames: uniqueNameList(surnames)
    };
}

function normalizeNamePart(value) {
    if (typeof value !== "string") {
        return "";
    }

    return value
        .replace(/[\u00A0\u00C2]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeNameList(values) {
    if (!Array.isArray(values)) {
        return [];
    }

    return values
        .map(normalizeNamePart)
        .filter(function(name) {
            return name.length > 0;
        });
}

function uniqueNameList(values) {
    return Array.from(new Set(values));
}

function normalizeNameKey(name) {
    return normalizeNamePart(name).toLowerCase();
}

function addUsedManagerName(name) {
    const normalizedName = normalizeNamePart(name);
    const nameKey = normalizeNameKey(normalizedName);

    if (!normalizedName || !nameKey || usedManagerNameKeys.has(nameKey)) {
        return;
    }

    usedManagerNameKeys.add(nameKey);
    usedManagerNameValues.push(normalizedName);
}

function loadUsedManagerNames() {
    try {
        const rawNames = localStorage.getItem(usedManagerNamesStorageKey);
        const parsedNames = JSON.parse(rawNames || "[]");

        if (!Array.isArray(parsedNames)) {
            return;
        }

        for (let i = 0; i < parsedNames.length; i++) {
            addUsedManagerName(parsedNames[i]);
        }
    } catch (error) {
        console.error("Unable to load used manager names:", error);
    }
}

function persistUsedManagerNames() {
    try {
        localStorage.setItem(usedManagerNamesStorageKey, JSON.stringify(usedManagerNameValues));
    } catch (error) {
        console.error("Unable to persist used manager names:", error);
    }
}

function resetUsedManagerNames() {
    usedManagerNameKeys.clear();
    usedManagerNameValues = [];

    try {
        localStorage.removeItem(usedManagerNamesStorageKey);
    } catch (error) {
        console.error("Unable to reset used manager names:", error);
    }
}

window.resetUsedManagerNames = resetUsedManagerNames;

function extractManagerName(managerEntry) {
    if (!managerEntry || !managerEntry["0 Param data"]) {
        return "";
    }

    return normalizeNamePart(
        managerEntry["0 Param data"]["1 string Name"] ||
        managerEntry["0 Param data"]["0 string Name"] ||
        ""
    );
}

function syncUsedNamesFromGeneratedManagers() {
    for (let i = 0; i < levelData_managers.length; i++) {
        addUsedManagerName(extractManagerName(levelData_managers[i]));
    }
}

function pickUnusedFullName(pool, seed) {
    if (!Array.isArray(pool) || pool.length === 0) {
        return "";
    }

    const startIndex = Math.abs(seed) % pool.length;
    for (let i = 0; i < pool.length; i++) {
        const candidate = pool[(startIndex + i) % pool.length];
        if (!usedManagerNameKeys.has(normalizeNameKey(candidate))) {
            return candidate;
        }
    }

    return "";
}

function buildMixedUniqueName(firstNamePool, surnamePool, seed) {
    if (!Array.isArray(firstNamePool) || firstNamePool.length === 0 ||
        !Array.isArray(surnamePool) || surnamePool.length === 0) {
        return "";
    }

    const attempts = Math.max(500, firstNamePool.length);
    for (let i = 0; i < attempts; i++) {
        const firstName = firstNamePool[(seed + (i * 13)) % firstNamePool.length];
        const surname = surnamePool[((seed * 7) + (i * 17)) % surnamePool.length];
        const candidate = normalizeNamePart(`${firstName} ${surname}`);

        if (!candidate || usedManagerNameKeys.has(normalizeNameKey(candidate))) {
            continue;
        }

        return candidate;
    }

    return "";
}

function getUniqueManagerName(genderId, managerSeed) {
    const genderFullPool = genderId === 1 ? managerNameDatabase.femaleFullNames : managerNameDatabase.maleFullNames;
    const backupFullPool = genderId === 1 ? managerNameDatabase.maleFullNames : managerNameDatabase.femaleFullNames;
    const genderFirstPool = genderId === 1 ? managerNameDatabase.femaleFirstNames : managerNameDatabase.maleFirstNames;
    const backupFirstPool = genderId === 1 ? managerNameDatabase.maleFirstNames : managerNameDatabase.femaleFirstNames;
    const combinedFirstPool = genderFirstPool.concat(backupFirstPool);

    let chosenName = pickUnusedFullName(genderFullPool, managerSeed);
    if (!chosenName) {
        chosenName = pickUnusedFullName(backupFullPool, managerSeed);
    }
    if (!chosenName) {
        chosenName = buildMixedUniqueName(genderFirstPool, managerNameDatabase.surnames, managerSeed);
    }
    if (!chosenName) {
        chosenName = buildMixedUniqueName(combinedFirstPool, managerNameDatabase.surnames, managerSeed);
    }

    if (!chosenName) {
        const fallbackBase = `Manager ${managerSeed}`;
        let fallbackName = fallbackBase;
        let counter = 2;
        while (usedManagerNameKeys.has(normalizeNameKey(fallbackName))) {
            fallbackName = `${fallbackBase} ${counter}`;
            counter += 1;
        }
        chosenName = fallbackName;
    }

    addUsedManagerName(chosenName);
    return chosenName;
}

function generateLevels_managers() {
    let currentLevel = parseInt(document.getElementById("managerIDInput").value, 10);
    let currentRarity = parseInt(document.getElementById("managerRarityInput").value, 10);
    let currentEffect = parseInt(document.getElementById("effectIDInput").value, 10);
    let currentActiveTime = parseFloat(document.getElementById("activeTimeInput").value);
    let currentCooldown = parseFloat(document.getElementById("activeCooldownInput").value);
    let currentArea = document.getElementById("managerAreaInput").value;
    let currentGenderId = parseInt(document.getElementById("managerGenderInput").value, 10);
    let legacyManagerFormat = document.getElementById("legacyManagerFormatInput").checked;
    let levelsToGenerate = parseInt(document.getElementById("levelsToGenerateInput").value, 10);

    if (!Number.isFinite(currentLevel)) {
        currentLevel = 1;
    }
    if (!Number.isFinite(currentRarity)) {
        currentRarity = 1;
    }
    if (!Number.isFinite(currentEffect)) {
        currentEffect = 1;
    }
    if (!Number.isFinite(currentActiveTime)) {
        currentActiveTime = 60;
    }
    if (!Number.isFinite(currentCooldown)) {
        currentCooldown = 300;
    }
    if (!Number.isFinite(currentGenderId)) {
        currentGenderId = 0;
    }
    if (!Number.isFinite(levelsToGenerate) || levelsToGenerate <= 0) {
        displayLevels_managers();
        return;
    }

    syncUsedNamesFromGeneratedManagers();

    for (let i = 0; i < levelsToGenerate; i++) {
        let managerBaseId = currentLevel + i;
        let managerId = managerBaseId;

        if (!legacyManagerFormat && currentGenderId === 1) {
            managerId = managerBaseId + 100000;
        }

        let managerName = getUniqueManagerName(currentGenderId, managerBaseId + (i * 31));
        let managerData;

        if (legacyManagerFormat) {
            managerData = {
                "0 int ManagerID": managerBaseId,
                "0 string Name": managerName,
                "0 int RarityID": currentRarity,
                "0 int EffectID": currentEffect,
                "0 string Area": currentArea,
                "0 double DelayPerClickInSeconds": 0.05,
                "0 double ValueX": getValueX(currentRarity, currentEffect),
                "0 double ActiveTime": currentActiveTime,
                "0 double Cooldown": currentCooldown,
                "1 UInt8 AvailableThroughPurchase": 1,
                "1 UInt8 RatingReward": 0,
                "0 int ManagerBuyOrder": 0
            };
        } else {
            managerData = {
                "0 int ManagerID": managerId,
                "1 string Name": managerName,
                "0 int GenderId": currentGenderId,
                "0 int RarityID": currentRarity,
                "0 int EffectID": currentEffect,
                "1 string Area": currentArea,
                "0 double ValueX": getValueX(currentRarity, currentEffect),
                "0 double ActiveTime": currentActiveTime,
                "0 double Cooldown": currentCooldown,
                "1 UInt8 AvailableThroughPurchase": 1,
                "1 UInt8 RatingReward": 0,
                "0 int ManagerBuyOrder": 0
            };
        }

        levelData_managers.push({
            "0 Param data": managerData
        });
    }

    persistUsedManagerNames();

    if (typeof window.recordGeneratedCount === "function") {
        window.recordGeneratedCount(levelsToGenerate);
    }

    displayLevels_managers();
}

function getValueForRarity(rarityID, values) {
    if (rarityID < 1 || rarityID > values.length) {
        return 0;
    }

    return values[rarityID - 1];
}

function getValueX(rarityID, effectID) {
    if (effectID === 3 || effectID === 10 || effectID === 16) {
        return getValueForRarity(rarityID, [0.4, 0.7, 0.8, 0.9]);
    }

    if (effectID === 1 || effectID === 8 || effectID === 12) {
        return getValueForRarity(rarityID, [3, 5, 7, 10]);
    }

    if (effectID === 11) {
        return getValueForRarity(rarityID, [2, 4, 6, 8]);
    }

    if (effectID === 4 || effectID === 5) {
        return getValueForRarity(rarityID, [3, 5, 8, 11]);
    }

    if (effectID === 7 || effectID === 14) {
        return getValueForRarity(rarityID, [0.2, 0.4, 0.6, 0.8]);
    }

    return getValueForRarity(rarityID, [1.5, 2.5, 4, 6]);
}

function displayLevels_managers() {
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = JSON.stringify(levelData_managers, null, 4);
}

function copyJsonManager() {
    let filename = "managers.json";
    let json = JSON.stringify(levelData_managers, null, 4);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
