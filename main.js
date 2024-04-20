document.addEventListener("DOMContentLoaded", function() {
    // Get the tab buttons
    var mainTabButton = document.getElementById("mainTabButton");
    var tutorialTabButton = document.getElementById("tutorialTabButton");
    var settingsTabButton = document.getElementById("settingsTabButton");

    // Get the content divs
    var mainContent = document.getElementById("mainContent");
    var tutorialContent = document.getElementById("tutorialContent");
    var settingsContent = document.getElementById("settingsContent");

    // Add event listeners to the tab buttons
    mainTabButton.addEventListener("click", function() {
        mainTabButton.classList.add("active");
        tutorialTabButton.classList.remove("active");
        settingsTabButton.classList.remove("active");

        mainContent.style.display = "block";
        tutorialContent.style.display = "none";
        settingsContent.style.display = "none";
    });

    tutorialTabButton.addEventListener("click", function() {
        tutorialTabButton.classList.add("active");
        settingsTabButton.classList.remove("active");
        mainTabButton.classList.remove("active");

        tutorialContent.style.display = "block";
        settingsContent.style.display = "none";
        mainContent.style.display = "none";
    });

    settingsTabButton.addEventListener("click", function() {
        settingsTabButton.classList.add("active");
        tutorialTabButton.classList.remove("active");
        mainTabButton.classList.remove("active");

        settingsContent.style.display = "block";
        tutorialContent.style.display = "none";
        mainContent.style.display = "none";
    });

    // Add event listener to the generator behavior select
    var generatorBehaviorSelect = document.getElementById("generatorBehaviorSelect");
    generatorBehaviorSelect.addEventListener("change", function() {
        var selectedGenerator = generatorBehaviorSelect.value;
        var elevatorInputs = document.getElementById("elevatorInputs");
        var warehouseInputs = document.getElementById("warehouseInputs");
        var mineshaftInputs = document.getElementById("mineshaftInputs");

        // Hide all input boxes by default
        elevatorInputs.style.display = "none";
        warehouseInputs.style.display = "none";
        mineshaftInputs.style.display = "none";

        // Show input boxes based on the selected generator
        if (selectedGenerator === "elevator") {
            elevatorInputs.style.display = "block";
        } else if (selectedGenerator === "warehouse") {
            warehouseInputs.style.display = "block";
        } else {
            mineshaftInputs.style.display = "block";
        }
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
