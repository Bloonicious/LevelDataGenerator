document.addEventListener("DOMContentLoaded", function() {
    // Get the tab buttons
    var mainTabButton = document.getElementById("mainTabButton");
    var tutorialTabButton = document.getElementById("tutorialTabButton");

    // Get the content divs
    var mainContent = document.getElementById("mainContent");
    var tutorialContent = document.getElementById("tutorialContent");

    // Add event listeners to the tab buttons
    mainTabButton.addEventListener("click", function() {
        mainTabButton.classList.add("active");
        tutorialTabButton.classList.remove("active");

        mainContent.style.display = "block";
        tutorialContent.style.display = "none";
    });

    tutorialTabButton.addEventListener("click", function() {
        tutorialTabButton.classList.add("active");
        mainTabButton.classList.remove("active");

        tutorialContent.style.display = "block";
        mainContent.style.display = "none";
    });
});
