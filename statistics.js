document.addEventListener("DOMContentLoaded", function() {
    // Initialize total levels count
    let totalLevels = 0;

    // Function to update total levels count
    function updateTotalLevels() {
        document.getElementById('totalLevelsOutput').innerText = totalLevels;
    }

    // Listen for level generation events in mineshaft
    document.addEventListener('mineshaftLevelsGenerated', function(event) {
        totalLevels += event.detail.numLevels;
        updateTotalLevels();
    });

    // Listen for level generation events in elevator
    document.addEventListener('elevatorLevelsGenerated', function(event) {
        totalLevels += event.detail.numLevels;
        updateTotalLevels();
    });

    // Listen for level generation events in warehouse
    document.addEventListener('warehouseLevelsGenerated', function(event) {
        totalLevels += event.detail.numLevels;
        updateTotalLevels();
    });

    // Update total levels count on page load
    updateTotalLevels();
});
