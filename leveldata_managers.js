// Array to store manager data
let levelData_managers = [];

// Array to store manager names
let managerNames = [];

// Function to fetch manager names from JSON file
function fetchManagerNames() {
    // Replace 'manager_names.json' with the actual path to your JSON file
    fetch('manager_names.json')
        .then(response => response.json())
        .then(data => {
            managerNames = data;
            console.log('Manager names loaded:', managerNames);
        })
        .catch(error => console.error('Error fetching manager names:', error));
}

// Call the function to fetch manager names when the page loads
fetchManagerNames();

function generateLevels_managers() {
    let currentLevel = parseInt(document.getElementById('managerIDInput').value);
    let currentRarity = parseInt(document.getElementById('managerRarityInput').value);
    let currentEffect = parseInt(document.getElementById('effectIDInput').value);
    let currentActiveTime = parseFloat(document.getElementById('activeTimeInput').value);
    let currentCooldown = parseFloat(document.getElementById('activeCooldownInput').value);
    let currentArea = document.getElementById('managerAreaInput').value;
    let levelsToGenerate = parseInt(document.getElementById('levelsToGenerateInput').value);

    for (let i = 0; i < levelsToGenerate; i++) {
        let newLevel = {
            "0 Param data": {
                "0 int ManagerID": currentLevel + i,
                "0 string Name": getRandomManagerName(), // Assign a random manager name
                "0 int RarityID": currentRarity,
                "0 int EffectID": currentEffect,
                "0 string Area": currentArea,
                "0 double DelayPerClickInSeconds": 0.05,
                "0 double ValueX": getValueX(currentEffect), // Calculate ValueX based on EffectID
                "0 double ActiveTime": currentActiveTime,
                "0 double Cooldown": currentCooldown,
                "1 UInt8 AvailableThroughPurchase": 1,
                "1 UInt8 RatingReward": 0,
                "0 int ManagerBuyOrder": 0
            }
        };

        // Push the new level data
        levelData_managers.push(newLevel);
    }

    // Display the generated levels
    displayLevels_managers();
}

// Function to calculate ValueX based on EffectID
function getValueX(effectID) {
    switch (effectID) {
        case 1: // Junior
            return 0.4;
        case 2: // Senior
            return 0.7;
        case 3: // Executive
            return 0.8;
        default:
            return 0; // Default value
    }
}

// Function to display a random manager name
function getRandomManagerName() {
    if (managerNames.length > 0) {
        // Generate a random index to select a manager name from the array
        const randomIndex = Math.floor(Math.random() * managerNames.length);
        const firstName = managerNames[randomIndex].Name;
        const surname = managerNames[randomIndex].Surname;
        return `${firstName} ${surname}`;
    } else {
        return "Unknown"; // Default name if manager names array is empty
    }
}

// Function to display the generated levels
function displayLevels_managers() {
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = JSON.stringify(levelData_managers, null, 4);
}

// Function to copy JSON data for managers
function copyJsonManager() {
    let filename = `managers.json`;
    let outputDiv = document.getElementById('output');
    let json = JSON.stringify(levelData_managers, null, 4);
    let blob = new Blob([json], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
