// --[ Imports ]--
import { writable } from 'svelte/store';
import { simulationDataStore, simulationScenarioStore } from './stores';

// --[ Simulation Core Data Storage ]--

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
        for (const i in instructionWrapper) {
            handleInstruction(instructionWrapper[i].instruction, instructionWrapper[i].value);
        }
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
    try {
        switch (instruction) {
            case "setSpeed":
                try {
                    console.debug("[DEBUG] Received setSpeed instruction for: " + value);
                    simulationDataStore.update((sd) => {
                        sd.speed = parseInt(value);
                        return sd;
                    });
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setSpeed instruction: " + error);
                }
                break;

            case "setRPM":
                try {
                    console.debug("[DEBUG] Received setRPM instruction for: " + value);
                    simulationDataStore.update((sd) => {
                        sd.engineRPM = parseInt(value);
                        return sd;
                    });
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setRPM instruction: " + error);
                }
                break;

            case "setFuelLevel":
                try {
                    console.debug("[DEBUG] Received setFuelLevel instruction for: " + value);
                    simulationDataStore.update((sd) => {
                        sd.fuelLevelPercent = parseInt(value);
                        return sd;
                    });
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setFuelLevel instruction: " + error);
                }
                break;

            case "setTurnIndicator":
                try {
                    console.debug("[DEBUG] Received setTurnIndicator instruction for: " + value);
                    simulationDataStore.update((sd) => {
                        sd.turnIndicatorStatus = toString(value);
                        return sd;
                    });
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setTurnIndicator instruction: " + error);
                }
                break;

            case "emitInstruction":
                try {
                    console.debug("[DEBUG] Received emitInstruction instruction for: " + value);
                    simulationSendMessage({
                        "timestamp": Date.now(),
                        "name": "emitInstruction",
                        "category": "simulationevent",
                        "intendedTarget": "app",
                        "tags": ["instruction"],
                        "payload": {
                            "instruction": value
                        }
                    });
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing emitInstruction instruction: " + error);
                }
                break;

            case "setAlert":
                try {
                    console.debug("[DEBUG] Received setAlert instruction for: " + value);
                    simulationDataStore.update((sd) => {
                        sd.annunciatorLights = toString(value);
                        return sd;
                    });
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setAlert instruction: " + error);
                }
                break;

            case "setAnnunciator":
                try {
                    console.debug("[DEBUG] Received setAnnunciator instruction for ID: " + value.ID + " value: " + value.value);
                    switch (value.ID) {
                        case "engineOverheat":
                            simulationDataStore.update((sd) => {
                                sd.annunciatorLights.engineOverheat = toString(value.value);
                                return sd;
                            });
                            break;
                        case "lowTirePressure":
                            simulationDataStore.update((sd) => {
                                sd.annunciatorLights.lowTirePressure = toString(value.value);
                                return sd;
                            });
                            break;
                        case "lowBatteryLevel":
                            simulationDataStore.update((sd) => {
                                sd.annunciatorLights.lowBatteryLevel = toString(value.value);
                                return sd;
                            });
                            break;
                        case "checkEngine":
                            simulationDataStore.update((sd) => {
                                sd.annunciatorLights.checkEngine = toString(value.value);
                                return sd;
                            });
                            break;
                        case "headlights":
                            simulationDataStore.update((sd) => {
                                sd.annunciatorLights.headlights = toString(value.value);
                                return sd;
                            });
                            break;
                        case "highBeams":
                            simulationDataStore.update((sd) => {
                                sd.annunciatorLights.highBeams = toString(value.value);
                                return sd;
                            });
                            break;
                        case "doorsUnlocked":
                            simulationDataStore.update((sd) => {
                                sd.annunciatorLights.doorsUnlocked = toString(value.value);
                                return sd;
                            });
                            break;
                        default:
                            console.warn("[WARN] Received unimplemented setAnnunciator ID: " + value.ID);
                            break;
                    }
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setAnnunciator instruction: " + error);
                }
                break;

            case "setWeather":
                try {
                    console.debug("[DEBUG] Received setWeather instruction for: " + value);
                    simulationDataStore.update((sd) => {
                        sd.weather.weatherType = toString(value);
                        return sd;
                    });
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setWeather instruction: " + error);
                }
                break;

            case "setOutdoorTemp":
                try {
                    console.debug("[DEBUG] Received setOutdoorTemp instruction for: " + value);
                    simulationDataStore.update((sd) => {
                        sd.weather.temperature = parseInt(value);
                        return sd;
                    });
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setOutdoorTemp instruction: " + error);
                }
                break;

            case "setBluetooth":
                try {
                    console.debug("[DEBUG] Received setBluetooth instruction for: " + value);
                    simulationDataStore.update((sd) => {
                        sd.infotainment.phoneConnected = value;
                        return sd;
                    });
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setBluetooth instruction: " + error);
                }
                break;

            case "setMediaStatus":
                try {
                    console.debug("[DEBUG] Received emitAlert instruction for playstatus: " + value.playStatus + " skip: " + value.skipVal);
                    if (value.playStatus == "stopped") {
                        simulationDataStore.update((sd) => {
                            sd.infotainment.mediaPlaying = false;
                            return sd;
                        });
                    } else {
                        // If not stopped, then media _should_ be playing
                        simulationDataStore.update((sd) => {
                            sd.infotainment.mediaPlaying = true;
                            return sd;
                        });

                        // Fire a Play Status change event
                        simulationSendMessage({
                            "timestamp": Date.now(),
                            "name": "playMedia",
                            "category": "simulationevent",
                            "intendedTarget": "infotainment",
                            "tags": ["playstatus"],
                            "payload": {
                                "playStatus": value.playStatus
                            }
                        });

                        // If the instruction contains a skip, fire a media skip event
                        if (value.skipVal != 0) {
                            simulationSendMessage({
                                "timestamp": Date.now(),
                                "name": "skipMedia",
                                "category": "simulationevent",
                                "intendedTarget": "infotainment",
                                "tags": ["mediaskip"],
                                "payload": {
                                    "skip": value.skipVal
                                }
                            });
                        }
                    }
                } catch (error) {
                    console.error("[ERROR] Encountered an error while executing setMediaStatus instruction: " + error);
                }
                break;

            default:
                console.debug("[ERROR] Simulation received undocumented or invalid instruction!");
                break;
        }
    } catch (error) {
        console.error("[ERROR] An error occurred while attempting to handle an instruction: " + error);
    }
}

// --[ Exports ]--
export { simulationTick, simulationSendMessage, simulationRegisterMessageToApp };
