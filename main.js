document.addEventListener("DOMContentLoaded", function() {
    var generatorBehaviorSelect = document.getElementById("generatorBehaviorSelect");
    var generateLevelsButton = document.getElementById("generateLevelsButton");
    var managerRarityInput = document.getElementById("managerRarityInput");
    var activeTimeInput = document.getElementById("activeTimeInput");
    var activeCooldownInput = document.getElementById("activeCooldownInput");
    var managerGenderInput = document.getElementById("managerGenderInput");
    var legacyManagerFormatInput = document.getElementById("legacyManagerFormatInput");
    var legacyDataOptions = document.getElementById("legacyDataOptions");

    function setGenerateButtonText(selectedGenerator) {
        if (selectedGenerator === "skillpoints") {
            generateLevelsButton.textContent = "Generate Skillpoints";
        } else if (selectedGenerator === "managers") {
            generateLevelsButton.textContent = "Generate Managers";
        } else if (selectedGenerator === "managerCost") {
            generateLevelsButton.textContent = "Generate Manager Costs";
        } else if (selectedGenerator === "barriers") {
            generateLevelsButton.textContent = "Generate Barriers";
        } else if (selectedGenerator === "collectibles") {
            generateLevelsButton.textContent = "Generate Collectibles";
        } else if (selectedGenerator === "collectibleFactors") {
            generateLevelsButton.textContent = "Generate Collectible Factors";
        } else {
            generateLevelsButton.textContent = "Generate Levels";
        }
    }

    function showInputBoxes(selectedGenerator) {
        var inputGroups = {
            mineshaft: document.getElementById("mineshaftInputs"),
            elevator: document.getElementById("elevatorInputs"),
            warehouse: document.getElementById("warehouseInputs"),
            barriers: document.getElementById("barrierInputs"),
            skillpoints: document.getElementById("skillpointInputs"),
            managers: document.getElementById("managerInputs"),
            managerCost: document.getElementById("managerCostInputs"),
            collectibles: document.getElementById("collectiblesInputs"),
            collectibleFactors: document.getElementById("collectibleFactorInputs")
        };

        Object.keys(inputGroups).forEach(function(key) {
            inputGroups[key].style.display = "none";
        });

        if (inputGroups[selectedGenerator]) {
            inputGroups[selectedGenerator].style.display = "block";
        }
    }

    function syncManagerLegacyState() {
        if (!legacyManagerFormatInput || !managerGenderInput) {
            return;
        }

        managerGenderInput.disabled = legacyManagerFormatInput.checked;
    }

    function applyManagerTimingDefaults() {
        if (!managerRarityInput || !activeTimeInput || !activeCooldownInput) {
            return;
        }

        var timingByRarity = {
            1: { activeTime: 60, cooldown: 300 },
            2: { activeTime: 180, cooldown: 900 },
            3: { activeTime: 600, cooldown: 3000 },
            4: { activeTime: 900, cooldown: 3600 }
        };
        var selectedRarity = parseInt(managerRarityInput.value, 10);

        if (!timingByRarity[selectedRarity]) {
            selectedRarity = 1;
        }

        activeTimeInput.value = timingByRarity[selectedRarity].activeTime;
        activeCooldownInput.value = timingByRarity[selectedRarity].cooldown;
    }

    function toggleLegacyDataOptionVisibility(selectedGenerator) {
        if (!legacyDataOptions) {
            return;
        }

        var showLegacyOption = selectedGenerator === "mineshaft" ||
            selectedGenerator === "elevator" ||
            selectedGenerator === "warehouse";

        legacyDataOptions.style.display = showLegacyOption ? "block" : "none";
    }

    var savedGeneratorBehavior = localStorage.getItem("generatorBehavior");
    if (savedGeneratorBehavior) {
        generatorBehaviorSelect.value = savedGeneratorBehavior;
    }

    showInputBoxes(generatorBehaviorSelect.value);
    setGenerateButtonText(generatorBehaviorSelect.value);
    toggleLegacyDataOptionVisibility(generatorBehaviorSelect.value);
    toggleJsonButtons();
    applyManagerTimingDefaults();
    syncManagerLegacyState();

    generatorBehaviorSelect.addEventListener("change", function() {
        var selectedGenerator = generatorBehaviorSelect.value;
        localStorage.setItem("generatorBehavior", selectedGenerator);
        showInputBoxes(selectedGenerator);
        setGenerateButtonText(selectedGenerator);
        toggleLegacyDataOptionVisibility(selectedGenerator);
        toggleJsonButtons();
    });

    if (legacyManagerFormatInput) {
        legacyManagerFormatInput.addEventListener("change", syncManagerLegacyState);
    }

    if (managerRarityInput) {
        managerRarityInput.addEventListener("change", applyManagerTimingDefaults);
    }

    var mainTabButton = document.getElementById("mainTabButton");
    var tutorialTabButton = document.getElementById("tutorialTabButton");
    var settingsTabButton = document.getElementById("settingsTabButton");
    var statsTabButton = document.getElementById("statsTabButton");
    var changelogTabButton = document.getElementById("changelogTabButton");

    var mainContent = document.getElementById("mainContent");
    var tutorialContent = document.getElementById("tutorialContent");
    var settingsContent = document.getElementById("settingsContent");
    var statsContent = document.getElementById("statsContent");
    var changelogContent = document.getElementById("changelogContent");

    mainTabButton.addEventListener("click", function() {
        mainTabButton.classList.add("active");
        tutorialTabButton.classList.remove("active");
        settingsTabButton.classList.remove("active");
        statsTabButton.classList.remove("active");
        changelogTabButton.classList.remove("active");

        mainContent.style.display = "block";
        tutorialContent.style.display = "none";
        settingsContent.style.display = "none";
        statsContent.style.display = "none";
        changelogContent.style.display = "none";
    });

    tutorialTabButton.addEventListener("click", function() {
        tutorialTabButton.classList.add("active");
        changelogTabButton.classList.remove("active");
        settingsTabButton.classList.remove("active");
        statsTabButton.classList.remove("active");
        mainTabButton.classList.remove("active");

        tutorialContent.style.display = "block";
        changelogContent.style.display = "none";
        settingsContent.style.display = "none";
        statsContent.style.display = "none";
        mainContent.style.display = "none";
    });

    settingsTabButton.addEventListener("click", function() {
        settingsTabButton.classList.add("active");
        changelogTabButton.classList.remove("active");
        statsTabButton.classList.remove("active");
        tutorialTabButton.classList.remove("active");
        mainTabButton.classList.remove("active");

        settingsContent.style.display = "block";
        changelogContent.style.display = "none";
        statsContent.style.display = "none";
        tutorialContent.style.display = "none";
        mainContent.style.display = "none";
    });

    statsTabButton.addEventListener("click", function() {
        statsTabButton.classList.add("active");
        changelogTabButton.classList.remove("active");
        settingsTabButton.classList.remove("active");
        tutorialTabButton.classList.remove("active");
        mainTabButton.classList.remove("active");

        statsContent.style.display = "block";
        changelogContent.style.display = "none";
        settingsContent.style.display = "none";
        tutorialContent.style.display = "none";
        mainContent.style.display = "none";
    });

    changelogTabButton.addEventListener("click", function() {
        changelogTabButton.classList.add("active");
        mainTabButton.classList.remove("active");
        tutorialTabButton.classList.remove("active");
        settingsTabButton.classList.remove("active");
        statsTabButton.classList.remove("active");

        changelogContent.style.display = "block";
        mainContent.style.display = "none";
        tutorialContent.style.display = "none";
        settingsContent.style.display = "none";
        statsContent.style.display = "none";
    });

    generateLevelsButton.addEventListener("click", function() {
        var selectedGenerator = generatorBehaviorSelect.value;

        if (selectedGenerator === "elevator") {
            generateLevels_elevator();
        } else if (selectedGenerator === "warehouse") {
            generateLevels_warehouse();
        } else if (selectedGenerator === "mineshaft") {
            generateLevels_mineshaft();
        } else if (selectedGenerator === "barriers") {
            generateLevels_barriers();
        } else if (selectedGenerator === "skillpoints") {
            generateLevels_skillpoints();
        } else if (selectedGenerator === "managers") {
            generateLevels_managers();
        } else if (selectedGenerator === "managerCost") {
            generateLevels_managerCost();
        } else if (selectedGenerator === "collectibles") {
            generateLevels_collectibles();
        } else if (selectedGenerator === "collectibleFactors") {
            generateLevels_collectibleFactors();
        }
    });
});

function toggleJsonButtons() {
    var selectedGenerator = document.getElementById("generatorBehaviorSelect").value;
    var buttonMap = {
        mineshaft: document.getElementById("copyMineshaftJsonButton"),
        elevator: document.getElementById("copyElevatorJsonButton"),
        warehouse: document.getElementById("copyWarehouseJsonButton"),
        barriers: document.getElementById("copyBarrierJsonButton"),
        skillpoints: document.getElementById("copySkillpointJsonButton"),
        managers: document.getElementById("copyManagerJsonButton"),
        managerCost: document.getElementById("copyManagerCostJsonButton"),
        collectibles: document.getElementById("copyCollectiblesJsonButton"),
        collectibleFactors: document.getElementById("copyCollectibleFactorJsonButton")
    };

    Object.keys(buttonMap).forEach(function(key) {
        buttonMap[key].style.display = "none";
    });

    if (buttonMap[selectedGenerator]) {
        buttonMap[selectedGenerator].style.display = "inline-block";
    }
}

function removeGeneratedLines() {
    var selectedGenerator = document.getElementById("generatorBehaviorSelect").value;
    var resetNamesOnRemoveInput = document.getElementById("managerResetNamesOnRemoveInput");

    levelData_mineshaft = [];
    levelData_elevator = [];
    levelData_warehouse = [];
    levelData_barriers = [];
    levelData_skillpoints = [];
    levelData_managers = [];
    levelData_managerCost = [];
    levelData_collectibles = [];
    levelData_collectibleFactors = [];

    if (typeof displayLevels_mineshaft === "function") {
        displayLevels_mineshaft();
    }
    if (typeof displayLevels_elevator === "function") {
        displayLevels_elevator();
    }
    if (typeof displayLevels_warehouse === "function") {
        displayLevels_warehouse();
    }
    if (typeof displayLevels_barriers === "function") {
        displayLevels_barriers();
    }
    if (typeof displayLevels_skillpoints === "function") {
        displayLevels_skillpoints();
    }
    if (typeof displayLevels_managers === "function") {
        displayLevels_managers();
    }
    if (typeof displayLevels_managerCost === "function") {
        displayLevels_managerCost();
    }
    if (typeof displayLevels_collectibles === "function") {
        displayLevels_collectibles();
    }
    if (typeof displayLevels_collectibleFactors === "function") {
        displayLevels_collectibleFactors();
    }

    if (selectedGenerator === "managers" &&
        resetNamesOnRemoveInput &&
        resetNamesOnRemoveInput.checked &&
        typeof window.resetUsedManagerNames === "function") {
        window.resetUsedManagerNames();
    }
}
