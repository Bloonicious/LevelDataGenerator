// Array to store skillpoint data
var skillpointsData = [];

// Function to generate JSON data for skillpoints
function generateLevels_skillpoints() {
    var levelInput = document.getElementById("levelInput").value;
    var skillpointInput = document.getElementById("skillpointInput").value;
    
    var output = document.getElementById("output");
    output.innerHTML = ""; // Clear previous output
    
    // Validate inputs
    if (!levelInput || isNaN(levelInput) || levelInput <= 0) {
        output.innerHTML = "Please enter a valid number of levels.";
        return;
    }
    
    if (!skillpointInput || isNaN(skillpointInput) || skillpointInput <= 0) {
        output.innerHTML = "Please enter a valid skillpoint ID.";
        return;
    }
    
    // Find skillpoint data for the given ID
    var skillpointData = skillpointsData.find(function(item) {
        return item["0 Param data"]["0 SInt64 SkillPointNo"] == skillpointInput;
    });
    
    if (!skillpointData) {
        output.innerHTML = "Skillpoint data not found for the given ID.";
        return;
    }
    
    // Generate JSON data for skillpoints
    var levels = [];
    for (var i = 1; i <= levelInput; i++) {
        levels.push({
            "0 Param data": {
                "0 SInt64 Level": i,
                "0 SInt64 SkillPointNo": skillpointInput,
                "0 double Cost": skillpointData["0 Param data"]["0 double Cost"] * Math.pow(1.1, i - 1),
                "0 double SuperCashCost": skillpointData["0 Param data"]["0 double SuperCashCost"]
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
