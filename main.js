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
});
