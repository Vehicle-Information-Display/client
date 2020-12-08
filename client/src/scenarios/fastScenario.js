// List of instructions to execute within the simulation
let fastScenario = {
    instructions: new Map([
        [0, [{"instruction": "setSpeed", "value": "120"}, {"instruction": "setRPM", "value": "7500"}]],
        [0.5, [{"instruction": "setSpeed", "value": "0"}, {"instruction": "setRPM", "value": "0"}]],
        [1, [{"instruction": "emitInstruction", "value": "Testing"}]],
        [5, [{"instruction": "setSpeed", "value": "65"}, {"instruction": "setRPM", "value": "1200"}]],
        [6, [{"instruction": "setAlert", "value": "Testing alert system"}]],
        [10, [{"instruction": "setSpeed", "value": "75"}, {"instruction": "setRPM", "value": "4500"}]],
        [11, [{"instruction": "setSpeed", "value": "76"}, {"instruction": "setRPM", "value": "3000"}]],
        [12, [{"instruction": "setSpeed", "value": "77"}, {"instruction": "setRPM", "value": "3100"}]],
        [13, [{"instruction": "setSpeed", "value": "78"}, {"instruction": "setRPM", "value": "3200"}]],
        [14, [{"instruction": "setSpeed", "value": "79"}, {"instruction": "setRPM", "value": "3300"}]],
        [15, [{"instruction": "setSpeed", "value": "80"}, {"instruction": "setRPM", "value": "3500"}]],
        [51, [{"instruction": "emitMajorEvent", "value": "end"}]]
    ]),
    minigameBlocks: [
        [0,0,0,1,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,1,0,0,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,1,0,0,1,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,0,1,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,0,1,0,1,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,1,0,0,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,1,0,0,1,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,0,1,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,0,1,0,1,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,1,0,0,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,1,0,0,1,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,0,1,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,0,1,0,1,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,1,0,0,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,1,0,0,1,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,0,1,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,0,1,0,1,0,0,1]
    ]
};

export {fastScenario as fastScenario};
