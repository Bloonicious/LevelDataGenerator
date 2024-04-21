// Array to store skillpoint data
var skillpointsData = [];

// Function to generate JSON data for skillpoints
function generateLevels_skillpoints() {
    var skillPointIDInput = document.getElementById("skillPointIDInput").value;
    var skillpointCostInput = document.getElementById("skillpointCostInput").value;
    var skillpointSuperCashCostInput = document.getElementById("skillpointSuperCashCostInput").value;

    var output = document.getElementById("output");
    output.innerHTML = ""; // Clear previous output

    // Validate inputs
    if (!skillPointIDInput || isNaN(skillPointIDInput) || skillPointIDInput <= 0) {
        output.innerHTML = "Please enter a valid SkillPoint ID.";
        return;
    }

    if (!skillpointCostInput || isNaN(skillpointCostInput) || skillpointCostInput <= 0) {
        output.innerHTML = "Please enter a valid Cost.";
        return;
    }

    if (!skillpointSuperCashCostInput || isNaN(skillpointSuperCashCostInput) || skillpointSuperCashCostInput <= 0) {
        output.innerHTML = "Please enter a valid SuperCash Cost.";
        return;
    }

    // Generate JSON data for skillpoints
    var levels = [];
    for (var i = 1; i <= 10; i++) { // Generating data for 10 levels for demonstration
        levels.push({
            "0 Param data": {
                "0 SInt64 Level": i,
                "0 SInt64 SkillPointNo": skillPointIDInput,
                "0 double Cost": skillpointCostInput * Math.pow(1.1, i - 1),
                "0 double SuperCashCost": skillpointSuperCashCostInput
            }
        });
    }

    // Display JSON data
    output.innerHTML = JSON.stringify(levels, null, 2);
}

// Function to copy JSON data for skillpoints
function copyJsonSkillpoint() {
    var output = document.getElementById("output").textContent;

    // Create a blob object containing the JSON data
    var blob = new Blob([output], { type: "application/json" });

    // Create a link element to trigger the download
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "skillpoint_data.json";

    // Append the link to the document body and click it
    document.body.appendChild(a);
    a.click();

    // Remove the link from the document body
    document.body.removeChild(a);
}

// Function to initialize skillpoints data
function initializeSkillpointsData() {
    // Add initial skillpoint data
    skillpointsData.push({
        "0 Param data": {
            "0 SInt64 SkillPointNo": "1",
            "0 double Cost": 8470000000000000,
            "0 double SuperCashCost": 200
        }
    });

    // Add more skillpoint data as needed
}

// Initialize skillpoints data
initializeSkillpointsData();
