// Define the starting level data
const startingLevel = {
    Tier: 29,
    Level: 800,
    Cost: 3.24e+108,
    NumberOfWorkers: 6,
    GainPerSecondPerWorker: 3.67e+95,
    CapacityPerWorker: 1.44e+96,
    WorkerWalkingSpeedPerSecond: 5,
    BigUpdate: 1,
    SuperCashReward: 40
};

// Define the multiplier for cost, gain, and capacity per level
const costMultiplier = 1.225;
const gainMultiplier = 1.2;
const capacityMultiplier = 1.2;

// Define the number of levels to generate
const numberOfLevels = 50;

// Initialize an array to store the generated levels
let levels = [];

// Generate new levels based on the previous level data
let currentLevel = { ...startingLevel };
for (let i = 0; i < numberOfLevels; i++) {
    currentLevel = {
        Tier: currentLevel.Tier,
        Level: currentLevel.Level + 1,
        Cost: currentLevel.Cost * costMultiplier,
        NumberOfWorkers: currentLevel.NumberOfWorkers,
        GainPerSecondPerWorker: currentLevel.GainPerSecondPerWorker * gainMultiplier,
        CapacityPerWorker: currentLevel.CapacityPerWorker * capacityMultiplier,
        WorkerWalkingSpeedPerSecond: currentLevel.WorkerWalkingSpeedPerSecond,
        BigUpdate: 0,
        SuperCashReward: 0
    };
    levels.push(currentLevel);
}

// Output the generated levels
console.log(levels);
