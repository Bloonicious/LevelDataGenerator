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

    // Add event listener to the generator behavior select
    generatorBehaviorSelect.addEventListener("change", function() {
        // Store the selected generator behavior in localStorage
        var selectedGenerator = generatorBehaviorSelect.value;
        localStorage.setItem("generatorBehavior", selectedGenerator);

        // Show input boxes based on the selected generator
        showInputBoxes(selectedGenerator);

        // Toggle JSON buttons visibility based on the selected generator
        toggleJsonButtons(selectedGenerator);
    });

    // Function to show input boxes based on the selected generator
    function showInputBoxes(selectedGenerator) {
        var elevatorInputs = document.getElementById("elevatorInputs");
        var warehouseInputs = document.getElementById("warehouseInputs");
        var mineshaftInputs = document.getElementById("mineshaftInputs");
        var skillpointInputs = document.getElementById("skillpointInputs");

        // Hide all input boxes by default
        elevatorInputs.style.display = "none";
        warehouseInputs.style.display = "none";
        mineshaftInputs.style.display = "none";
        skillpointInputs.style.display = "none";

        // Show input boxes based on the selected generator
        if (selectedGenerator === "elevator") {
            elevatorInputs.style.display = "block";
        } else if (selectedGenerator === "warehouse") {
            warehouseInputs.style.display = "block";
        } else if (selectedGenerator === "mineshaft") {
            mineshaftInputs.style.display = "block";
        } else if (selectedGenerator === "skillpoints") {
            skillpointInputs.style.display = "block";
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
        } else {
            generateLevels_mineshaft();
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

    if (selectedGenerator === 'elevator') {
        elevatorButton.style.display = 'inline-block';
        warehouseButton.style.display = 'none';
        mineshaftButton.style.display = 'none';
        skillpointButton.style.display = 'none';
    } else if (selectedGenerator === 'warehouse') {
        elevatorButton.style.display = 'none';
        warehouseButton.style.display = 'inline-block';
        mineshaftButton.style.display = 'none';
        skillpointButton.style.display = 'none';
    } else if (selectedGenerator === 'mineshaft') {
        elevatorButton.style.display = 'none';
        warehouseButton.style.display = 'none';
        mineshaftButton.style.display = 'inline-block';
        skillpointButton.style.display = 'none';
    } else if (selectedGenerator === 'skillpoints') {
        elevatorButton.style.display = 'none';
        warehouseButton.style.display = 'none';
        mineshaftButton.style.display = 'none';
        skillpointButton.style.display = 'inline-block';
    }
}
