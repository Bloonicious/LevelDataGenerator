document.addEventListener("DOMContentLoaded", function() {
    // Get the generator behavior select element
    var generatorBehaviorSelect = document.getElementById("generatorBehaviorSelect");

    // Retrieve the selected generator behavior from localStorage
    var savedGeneratorBehavior = localStorage.getItem("generatorBehavior");
    if (savedGeneratorBehavior) {
        generatorBehaviorSelect.value = savedGeneratorBehavior;

        // Trigger change event to show the correct input boxes
        var changeEvent = new Event("change");
        generatorBehaviorSelect.dispatchEvent(changeEvent);
    }

    // Set initial text of "Generate Levels" button based on selected generator
    var generateLevelsButton = document.getElementById("generateLevelsButton");
    if (generatorBehaviorSelect.value === "skillpoints") {
        generateLevelsButton.textContent = "Generate Skillpoints";
    } else if (generatorBehaviorSelect.value === "managers") {
        generateLevelsButton.textContent = "Generate Managers";
    } else if (generatorBehaviorSelect.value === "managerCost") {
        generateLevelsButton.textContent = "Generate Manager Costs";
    }

    // Add event listener to the generator behavior select
    generatorBehaviorSelect.addEventListener("change", function() {
        // Store the selected generator behavior in localStorage
        var selectedGenerator = generatorBehaviorSelect.value;
        localStorage.setItem("generatorBehavior", selectedGenerator);

        // Show input boxes based on the selected generator
        showInputBoxes(selectedGenerator);

        // Toggle JSON buttons visibility based on the selected generator
        toggleJsonButtons(selectedGenerator);

        // Change text of "Generate Levels" button if those selected generators are true
        var generateLevelsButton = document.getElementById("generateLevelsButton");
        if (selectedGenerator === "skillpoints") {
            generateLevelsButton.textContent = "Generate Skillpoints";
        } else if (selectedGenerator === "managers") {
            generateLevelsButton.textContent = "Generate Managers";
        } else if (selectedGenerator === "managerCost") {
            generateLevelsButton.textContent = "Generate Manager Costs";
        } else {
            generateLevelsButton.textContent = "Generate Levels";
        }
    });

    // Function to show input boxes based on the selected generator
    function showInputBoxes(selectedGenerator) {
        var elevatorInputs = document.getElementById("elevatorInputs");
        var warehouseInputs = document.getElementById("warehouseInputs");
        var mineshaftInputs = document.getElementById("mineshaftInputs");
        var skillpointInputs = document.getElementById("skillpointInputs");
        var managerInputs = document.getElementById("managerInputs");
        var managerCostInputs = document.getElementById("managerCostInputs");

        // Hide all input boxes by default
        elevatorInputs.style.display = "none";
        warehouseInputs.style.display = "none";
        mineshaftInputs.style.display = "none";
        skillpointInputs.style.display = "none";
        managerInputs.style.display = "none";
        managerCostInputs.style.display = "none";

        // Show input boxes based on the selected generator
        if (selectedGenerator === "elevator") {
            elevatorInputs.style.display = "block";
        } else if (selectedGenerator === "warehouse") {
            warehouseInputs.style.display = "block";
        } else if (selectedGenerator === "mineshaft") {
            mineshaftInputs.style.display = "block";
        } else if (selectedGenerator === "skillpoints") {
            skillpointInputs.style.display = "block";
        } else if (selectedGenerator === "managers") {
            managerInputs.style.display = "block";
        } else if (selectedGenerator === "managerCost") {
            managerCostInputs.style.display = "block";
        }
    }

    // Call showInputBoxes to initially display input boxes based on the selected generator
    showInputBoxes(generatorBehaviorSelect.value);

    // Add event listeners to the tab buttons
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

    // Add event listener to the "Generate Levels" button
    var generateLevelsButton = document.getElementById("generateLevelsButton");
    generateLevelsButton.addEventListener("click", function() {
        var selectedGenerator = generatorBehaviorSelect.value;

        // Call the appropriate function to generate levels based on the selected generator
        if (selectedGenerator === "elevator") {
            generateLevels_elevator();
        } else if (selectedGenerator === "warehouse") {
            generateLevels_warehouse();
        } else if (selectedGenerator === "mineshaft") {
            generateLevels_mineshaft();
        } else if (selectedGenerator === "skillpoints") {
            generateLevels_skillpoints();
        } else if (selectedGenerator === "managers") {
            generateLevels_managers();
        } else if (selectedGenerator === "managerCost") {
            generateLevels_managerCost();
        }
    });
});
function toggleJsonButtons() {
    var generatorSelect = document.getElementById('generatorBehaviorSelect');
    var selectedGenerator = generatorSelect.value;

    var elevatorButton = document.getElementById('copyElevatorJsonButton');
    var warehouseButton = document.getElementById('copyWarehouseJsonButton');
    var mineshaftButton = document.getElementById('copyMineshaftJsonButton');
    var skillpointButton = document.getElementById('copySkillpointJsonButton');
    var managerButton = document.getElementById('copyManagerJsonButton');
    var managerCostButton = document.getElementById('copyManagerCostJsonButton');

    if (selectedGenerator === 'elevator') {
        elevatorButton.style.display = 'inline-block';
        warehouseButton.style.display = 'none';
        mineshaftButton.style.display = 'none';
        skillpointButton.style.display = 'none';
        managerButton.style.display = 'none';
        managerCostButton.style.display = 'none';
    } else if (selectedGenerator === 'warehouse') {
        elevatorButton.style.display = 'none';
        warehouseButton.style.display = 'inline-block';
        mineshaftButton.style.display = 'none';
        skillpointButton.style.display = 'none';
        managerButton.style.display = 'none';
        managerCostButton.style.display = 'none';
    } else if (selectedGenerator === 'mineshaft') {
        elevatorButton.style.display = 'none';
        warehouseButton.style.display = 'none';
        mineshaftButton.style.display = 'inline-block';
        skillpointButton.style.display = 'none';
        managerButton.style.display = 'none';
        managerCostButton.style.display = 'none';
    } else if (selectedGenerator === 'skillpoints') {
        elevatorButton.style.display = 'none';
        warehouseButton.style.display = 'none';
        mineshaftButton.style.display = 'none';
        skillpointButton.style.display = 'inline-block';
        managerButton.style.display = 'none';
        managerCostButton.style.display = 'none';
    } else if (selectedGenerator === 'managers') {
        elevatorButton.style.display = 'none';
        warehouseButton.style.display = 'none';
        mineshaftButton.style.display = 'none';
        skillpointButton.style.display = 'none';
        managerButton.style.display = 'inline-block';
        managerCostButton.style.display = 'none';
    } else if (selectedGenerator === 'managerCost') {
        elevatorButton.style.display = 'none';
        warehouseButton.style.display = 'none';
        mineshaftButton.style.display = 'none';
        skillpointButton.style.display = 'none';
        managerButton.style.display = 'none';
        managerCostButton.style.display = 'inline-block';
    }
}
function removeGeneratedLines() {
    // Clear the level data arrays for each type
    levelData_mineshaft = [];
    levelData_elevator = [];
    levelData_warehouse = [];
    levelData_skillpoints = [];
    levelData_managers = [];
    levelData_managerCost = [];

    // Update the displayed levels
    displayLevels_mineshaft();
    displayLevels_elevator();
    displayLevels_warehouse();
    displayLevels_skillpoints();
    displayLevels_managers();
    displayLevels_managerCost();
}
