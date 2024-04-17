document.addEventListener("DOMContentLoaded", function() {
    // Get the tabs
    var mainTab = document.getElementById("mainTab");
    var tutorialTab = document.getElementById("tutorialTab");

    // Get the content of the tabs
    var mainContent = document.getElementById("mainContent");
    var tutorialContent = document.getElementById("tutorialContent");

    // Hide the tutorial tab by default
    tutorialTab.style.display = "none";

    // Add event listeners to the tabs
    mainTab.addEventListener("click", function() {
        mainTab.classList.add("active");
        tutorialTab.classList.remove("active");

        mainContent.style.display = "block";
        tutorialContent.style.display = "none";
    });

    tutorialTab.addEventListener("click", function() {
        tutorialTab.classList.add("active");
        mainTab.classList.remove("active");

        tutorialContent.style.display = "block";
        mainContent.style.display = "none";
    });
});
