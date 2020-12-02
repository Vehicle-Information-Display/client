// --[ Imports ]--
import { writable } from 'svelte/store';

// --[ Simulation Core Data Storage ]--
let simulationDataStore = writable({
    "speed": "10",               // Measured in miles per hour
    "engineRPM": "1000",           // Measured in revolutions per second
    "fuelLevelPercent": "100",  // Measured in percentage of a full tank
    "turnIndicatorStatus" : "OFF", // Options: LEFT, OFF, RIGHT
    "annunciatorLights" : {
        "engineOverheat": "false",
        "lowTirePressure" : "false",
        "lowBatteryLevel" : "false",
        "checkEngine" : "false",
        "headlights" : "false",
        "highBeams" : "false",
        "doorsUnlocked" : "false"
    },
    "infotainment" : {
        "phoneConnected" : "false",
        "currentMedia" : "null",     // ID corresponding to media currently being played (or paused)
        "mediaPlaying": "false",
        "weather" : {
            "weatherType" : "SUNNY", // Options: SUNNY, RAIN
            "temperature" : "70",    // Degrees Fahrenheit
        }
    },
    "climateControl" : {
        "seatWarmerStatus" : "OFF",      // Options: HEAT, OFF, COOL
        "airConditionerStatus" : "OFF",  // Options: HEAT, OFF, COOL
        "ventilationStatus" : "OFF"      // Options: OFF, LOW, MEDIUM, HIGH
    }
});

// The scenario store that allows the scenario to be passed between components
let simulationScenarioStore = writable({});

// The local simulation store subscriber object that contains the up-to-date simulation scenario to use
let simulationScenario = {};  // Define here, use elsewhere
const unsubscribe = simulationScenarioStore.subscribe(scenario => {
    simulationScenario = scenario;
});

// --[ Simulation Core Interface ]--

// Function to allow passing messages from the simulation to the app
let messageToApp = (message) => {}                  // By default this should do nothing
let simulationRegisterMessageToApp = function (callback) {
    messageToApp = callback;
}

// Simulation tick function that is called regularly by the app timer
let simulationTick = function(globalTickTime) {

    // Check if an instruction is scheduled to run at the current time
    if (simulationScenario.has(globalTickTime)) {
        const instructionWrapper = simulationScenario.get(globalTickTime);
        handleInstruction(instructionWrapper.instruction, instructionWrapper.value);
    }
}

// High-level function to pass messages to the simulation
let simulationSendMessage = function (message) {
    switch (message.category) {
        case "simulation_instruction":
            handleInstruction(message.payload.instruction, message.payload.value);
            break;
        default:
            console.debug("[WARNING] Unknown message received by simulation! Discarding...");
            break;
    }
}

// --[ Simulation Instruction Parsing & Handling ]--

// Handles a documented simulation instruction
let handleInstruction = function (instruction, value) {
    switch (instruction) {
        case "setSpeed":
            console.debug("[DEBUG] Received setSpeed instruction for: " + value);
            simulationDataStore.update((sd) => {
                sd.speed = parseInt(value);
                return sd;
            });
            break;
        default:
            console.debug("[ERROR] Simulation received undocumented or invalid instruction!");
            break;
    }
}

// --[ Exports ]--
export { simulationDataStore, simulationScenarioStore, simulationTick, simulationSendMessage, simulationRegisterMessageToApp };
