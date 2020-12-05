// List of instructions to execute within the simulation
let instructions = new Map([
    [0, [{"instruction": "setSpeed", "value": "55"}, {"instruction": "setRPM", "value": "1200"}]],
    [5, [{"instruction": "setSpeed", "value": "65"}]],
    [6, [{"instruction": "setAlert", "value": "Testing alert system"}]],
    [10, [{"instruction": "setSpeed", "value": "75"}]],
    [11, [{"instruction": "setSpeed", "value": "76"}]],
    [12, [{"instruction": "setSpeed", "value": "77"}]],
    [13, [{"instruction": "setSpeed", "value": "78"}]],
    [14, [{"instruction": "setSpeed", "value": "79"}]],
    [15, [{"instruction": "setSpeed", "value": "80"}]],
]);

export { instructions as testScenario };
