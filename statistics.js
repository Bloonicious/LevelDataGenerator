document.addEventListener("DOMContentLoaded", function() {
    // Initialize total levels count
    let totalLevels = 0;

    // Function to update total levels count
    function updateTotalLevels() {
        document.getElementById('totalLevelsOutput').innerText = totalLevels;
    }

    // Listen for changes in mineshaft level data
    document.addEventListener('mineshaftDataChanged', function(event) {
        totalLevels = levelData_mineshaft.length;
        updateTotalLevels();
    });

    // Listen for changes in elevator level data
    document.addEventListener('elevatorDataChanged', function(event) {
        totalLevels = levelData_elevator.length;
        updateTotalLevels();
    });

    // Listen for changes in warehouse level data
    document.addEventListener('warehouseDataChanged', function(event) {
        totalLevels = levelData_warehouse.length;
        updateTotalLevels();
    });

    // Update total levels count on page load
    updateTotalLevels();
});
