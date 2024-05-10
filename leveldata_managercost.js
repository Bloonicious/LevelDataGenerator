let levelData_managerCost = [];

let warehouseManagerCostMultiplier = 5;
let elevatorManagerCostMultiplier = 5;
let mineshaftManagerCostMultiplier = 2;
let warehouseManagerCostMultiplier21 = 9;
let elevatorManagerCostMultiplier21 = 9;
let mineshaftManagerCostMultiplier21 = 6;

function generateLevels_managerCost() {
    let currentLevel = parseInt(document.getElementById('amountManagersInput').value);
    let currentWarehouseManagerCost = parseFloat(document.getElementById('warehouseManagerCostInput').value);
    let currentElevatorManagerCost = parseFloat(document.getElementById('elevatorManagerCostInput').value);
    let currentMineshaftManagerCost = parseFloat(document.getElementById('mineshaftManagerCostInput').value);
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

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

        // Determine the correct multiplier based on the level and manager type
        let warehouseCostMultiplier = currentLevel < 21 ? warehouseManagerCostMultiplier : warehouseManagerCostMultiplier21;
        let elevatorCostMultiplier = currentLevel < 21 ? elevatorManagerCostMultiplier : elevatorManagerCostMultiplier21;
        let mineshaftCostMultiplier = currentLevel < 21 ? mineshaftManagerCostMultiplier : mineshaftManagerCostMultiplier21;

        // Increment cost based on the current level and manager type
        newLevel["0 Param data"]["0 double Ground"] = lastLevel["0 Param data"]["0 double Ground"] * (warehouseCostMultiplier);
        newLevel["0 Param data"]["0 double Elevator"] = lastLevel["0 Param data"]["0 double Elevator"] * (elevatorCostMultiplier);
        newLevel["0 Param data"]["0 double Corridor"] = lastLevel["0 Param data"]["0 double Corridor"] * (mineshaftCostMultiplier);

        // Push the new level data
        levelData_managerCost.push(newLevel);
        lastLevel = newLevel;
    }

    // Display the generated levels
    displayLevels_managerCost();
}

function displayLevels_managerCost() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData_managerCost, null, 4);
}

function copyJsonManagerCost() {
    let filename = `manager_costs.json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData_managerCost, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
