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

    // Get the generator behavior select element
    var generatorBehaviorSelect = document.getElementById("generatorBehaviorSelect");

    // Add event listener to the generator behavior select
    generatorBehaviorSelect.addEventListener("change", function() {
        var selectedBehavior = generatorBehaviorSelect.value;

        // Load the corresponding level data script based on the selected behavior
        if (selectedBehavior === "mineshaft") {
            // Load mineshaft level data script
            loadLevelDataScript("leveldata.js");
        } else if (selectedBehavior === "elevator") {
            // Load elevator level data script
            loadLevelDataScript("leveldata_elevator.js");
        } else if (selectedBehavior === "warehouse") {
            // Load warehouse level data script
            loadLevelDataScript("leveldata_warehouse.js");
        }
    });
});

function loadLevelDataScript(scriptSrc) {
    // Remove the previously loaded level data script
    var oldScript = document.getElementById("levelDataScript");
    if (oldScript) {
        oldScript.parentNode.removeChild(oldScript);
    }

    // Create a new script element
    var newScript = document.createElement("script");
    newScript.id = "levelDataScript";
    newScript.src = scriptSrc;

    // Append the new script element to the document head
    document.head.appendChild(newScript);
}
