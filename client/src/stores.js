import { writable, derived } from 'svelte/store';

// Event Cache Inter-Component Store
const eventCache = writable([]);
export const globalEventCache = {
    subscribe: eventCache.subscribe,
    addMessage: message => {
        eventCache.update(existingItems => {
            return [...existingItems, message]
        });
    }
};

// Base Simulation Inter-Component Data Store
export let simulationDataStore = writable({
    "serverInfo": {
        "uid": undefined,
        // "serverURL": "http://localhost:8080"
        "serverURL": "http://cse155.herokuapp.com"
    },
    "speed": "10",                 // Measured in miles per hour
    "engineRPM": "1000",           // Measured in revolutions per second
    "fuelLevelPercent": "100",     // Measured in percentage of a full tank
    "turnIndicatorStatus" : "OFF", // Options: LEFT, OFF, RIGHT
    "alertBar": "",                // By default, there shouldn't be any text displayed, so empty
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

/* Base Inter-Component Scenario Store
 * The scenario store that allows the scenario to be passed between components
*/
export let simulationScenarioStore = writable({});
