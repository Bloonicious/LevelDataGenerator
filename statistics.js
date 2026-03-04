document.addEventListener("DOMContentLoaded", function() {
    const storageKey = "totalLevelsGenerated";
    let totalLevels = parseInt(localStorage.getItem(storageKey), 10);

    if (!Number.isFinite(totalLevels) || totalLevels < 0) {
        totalLevels = 0;
    }

    function updateTotalLevels() {
        document.getElementById("totalLevelsOutput").innerText = totalLevels;
    }

    window.recordGeneratedCount = function(levelCount) {
        const parsedCount = parseInt(levelCount, 10);
        if (!Number.isFinite(parsedCount) || parsedCount <= 0) {
            return;
        }

        totalLevels += parsedCount;
        localStorage.setItem(storageKey, totalLevels.toString());
        updateTotalLevels();
    };

    window.resetGeneratedCount = function() {
        totalLevels = 0;
        localStorage.setItem(storageKey, "0");
        updateTotalLevels();
    };

    updateTotalLevels();
});
