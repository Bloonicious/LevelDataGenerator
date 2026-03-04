let levelData_managerCost = [];

function generateLevels_managerCost() {
    let currentLevel = parseInt(document.getElementById("amountManagersInput").value, 10);
    let currentWarehouseManagerCost = parseFloat(document.getElementById("warehouseManagerCostInput").value);
    let currentElevatorManagerCost = parseFloat(document.getElementById("elevatorManagerCostInput").value);
    let currentMineshaftManagerCost = parseFloat(document.getElementById("mineshaftManagerCostInput").value);
    let elevatorWarehouseMultiplier = parseFloat(document.getElementById("managerCostElevatorWarehouseMultiplierInput").value);
    let shaftMultiplier = parseFloat(document.getElementById("managerCostShaftMultiplierInput").value);
    let levelsToGenerate = parseInt(document.getElementById("levelsToGenerateInput").value, 10);

    if (!Number.isFinite(currentLevel)) {
        currentLevel = 1;
    }
    if (!Number.isFinite(currentWarehouseManagerCost)) {
        currentWarehouseManagerCost = 0;
    }
    if (!Number.isFinite(currentElevatorManagerCost)) {
        currentElevatorManagerCost = 0;
    }
    if (!Number.isFinite(currentMineshaftManagerCost)) {
        currentMineshaftManagerCost = 0;
    }
    if (!Number.isFinite(elevatorWarehouseMultiplier)) {
        elevatorWarehouseMultiplier = 1;
    }
    if (!Number.isFinite(shaftMultiplier)) {
        shaftMultiplier = 1;
    }
    if (!Number.isFinite(levelsToGenerate) || levelsToGenerate <= 0) {
        displayLevels_managerCost();
        return;
    }

    let lastLevel = {
        "0 Param data": {
            "0 int AmountManagersBought": currentLevel - 1,
            "0 double Ground": currentWarehouseManagerCost,
            "0 double Elevator": currentElevatorManagerCost,
            "0 double Corridor": currentMineshaftManagerCost
        }
    };

    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = {};

        newLevel["0 Param data"] = {};
        newLevel["0 Param data"]["0 int AmountManagersBought"] = lastLevel["0 Param data"]["0 int AmountManagersBought"] + 1;
        newLevel["0 Param data"]["0 double Ground"] = lastLevel["0 Param data"]["0 double Ground"] * elevatorWarehouseMultiplier;
        newLevel["0 Param data"]["0 double Elevator"] = lastLevel["0 Param data"]["0 double Elevator"] * elevatorWarehouseMultiplier;
        newLevel["0 Param data"]["0 double Corridor"] = lastLevel["0 Param data"]["0 double Corridor"] * shaftMultiplier;

        levelData_managerCost.push(newLevel);
        lastLevel = newLevel;
    }

    if (typeof window.recordGeneratedCount === "function") {
        window.recordGeneratedCount(levelsToGenerate);
    }

    displayLevels_managerCost();
}

function displayLevels_managerCost() {
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = JSON.stringify(levelData_managerCost, null, 4);
}

function copyJsonManagerCost() {
    let filename = "manager_costs.json";
    let json = JSON.stringify(levelData_managerCost, null, 4);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
