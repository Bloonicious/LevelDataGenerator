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

        // Determine the correct multiplier based on the level
        let currentCostMultiplier;
        if (currentLevel < 21) {
            currentCostMultiplier = currentWarehouseManagerCost, currentElevatorManagerCost, currentMineshaftManagerCost;
        } else {
            currentCostMultiplier = currentWarehouseManagerCost21, currentElevatorManagerCost21, currentMineshaftManagerCost21;
        }

        // Increment cost, capacity, and loading per second based on the current level
        newLevel["0 Param data"]["0 double Ground"] = lastLevel["0 Param data"]["0 double Ground"] * currentCostMultiplier;
        newLevel["0 Param data"]["0 double Elevator"] = lastLevel["0 Param data"]["0 double Elevator"] * currentCostMultiplier;
        newLevel["0 Param data"]["0 double Corridor"] = lastLevel["0 Param data"]["0 double Corridor"] * currentCostMultiplier;

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
