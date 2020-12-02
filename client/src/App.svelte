<script>
    // --[ Imports ]--
	import { onMount } from "svelte";
	import {
		simulationDataStore,
		simulationScenarioStore,
		simulationTick,
		simulationSendMessage,
		simulationRegisterMessageToApp,
	} from "./simulation";
	import SimpleDash from './SimpleDash.svelte';
	import Instruction from "./instruction.svelte";
	import Game from "./game.svelte";
	import MiniGame from './MiniGame.svelte';

	// --[ Scenario Imports ]--
	import { testScenario } from './scenarios/testScenario';

	// --[ Essential App Variables ]--

    // Create cache of events
    let eventCache = [];

    // [HACK] This is a workaround for passing messages to children
    let messageRecipients = [];

	// --[ App Props ]--
	let canvas;
	let game = { status: "on" };
	let instruction = { status: "on" };

	let props = {
		"name": "Simple Dashboard",
		"dashboardData": null,
        "minigameData": {
		    "canvasDimensions": {
		        "width": 800,   // [FIXME] INOP!
                "height": 400   // [FIXME] INOP!
            }
        }
	}

	// --[ Global Event Handling ]--

    // Handle standard-format events
    function handleMessage(message) {
	    // Handle a null or undefined event
        if (message === undefined || message === null) {
            console.error("[WARN] App event handler received an undefined event!");
            return;
        }

        // Add event to the cache
        eventCache.push(message);

        // Propagate events to all registered children
        messageRecipients.forEach((recipient) => {
            try {
                recipient.handleMessage(message);
            } catch (error) {
                console.error("[ERROR] Failed to call recipient event handler callback: " + error.message);
            }
        });
    }

    // Handle child-dispatched events
    function handleDispatchedEvent(event) {
	    if (event === undefined && event === null) {
            return;
        }

        // If the dispatched event is a message type
        if (event.type === "message") {
            handleMessage(event.detail);
        }
    }

    // Add keydown event listener
    document.addEventListener('keydown', (event) => {
        // Compatibility for Key Events (keyCode is deprecated)
        let keyID = null;
        if (event.key !== undefined) {
            keyID = event.key;
        } else if (event.keyIdentifier !== undefined) {
            keyID = event.keyIdentifier;
        } else {
            keyID = event.keyCode;
        }

        // Build message structure
        let message = {
            "timestamp": Date.now(),
            "name": "keydown",
            "category": "userevent",
            "intendedTarget": null,
            "tags": ["keyEvent"],
            "payload": {
                "keyID": keyID
            }
        }

        // Emit message
        handleMessage(message);
    });

	// Add keyup event listener
	document.addEventListener('keyup', (event) => {
        // Compatibility for Key Events (keyCode is deprecated)
        let keyID = null;
        if (event.key !== undefined) {
            keyID = event.key;
        } else if (event.keyIdentifier !== undefined) {
            keyID = event.keyIdentifier;
        } else {
            keyID = event.keyCode;
        }

        // Build message structure
        let message = {
            "timestamp": Date.now(),
            "name": "keyup",
            "category": "userevent",
            "intendedTarget": null,
            "tags": ["keyEvent"],
            "payload": {
                "keyID": keyID
            }
        }

        // Emit message
        handleMessage(message);
    });

	// --[ Global Simulation Setup ]--

	// Define the scenario to use within the simulation
	simulationScenarioStore.update((sc) => {
		return testScenario;
	});

	// Register a callback function to handle messages thrown by the simulation
	simulationRegisterMessageToApp((messageToApp) => {
		console.debug("[DEBUG] Received a message from the simulation!");
		console.debug(messageToApp);
	});

	// Global Tick Count (Used for "global time")
	let globalTickCount = 0;

	// Tick function to be called every 500 milliseconds
	// All time-dependent calls should be registered here
	let globalTick = () => {
		// Call simulation tick handler
        try {
		    simulationTick(globalTickCount);
        } catch (error) {
            console.error("[ERROR] Failed to call simulation tick callback: " + error.message);
        }


        // Propagate tick to all registered children
        messageRecipients.forEach((recipient) => {
            if (recipient.tick !== undefined) {
                try {
                    recipient.tick(globalTickCount);
                } catch (error) {
                    console.error("[ERROR] Failed to call recipient tick handler callback: " + error.message);
                }
            }
        });

		// Increment tick counter
		globalTickCount++;
	}

	// Call tick every 500 milliseconds
	setInterval(globalTick, 500);

	// --[ Dashboard Tests ]--

	// Update properties when simulationData updates
	const unsubscribe = simulationDataStore.subscribe(data => {
		props.dashboardData = data;
	});

	// Increment the speed
	let incSpd = () => {
		console.debug("[DEBUG] Incrementing speed..." + props.dashboardData.speed);
		// props.dashboardValues.speed += 1;
		let message = {
			"timestamp" : Date(),
			"name" : "Test",
			"category" : "simulation_instruction",
			"intendedTarget" : "simulation_core",
			"tags" : ["simulation_status_change"],
			"payload" : {
				"instruction": "setSpeed",
				"value": parseInt(props.dashboardData.speed) + 1,
			}
		}

		// Send message to the simulation
		simulationSendMessage(message)
	}

	let incRPM = () => {
		console.debug("[DEBUG] Incrementing RPM...");
		// props.dashboardValues.rpm += 1000;
		let message = {
			"timestamp" : Date(),
			"name" : "Test",
			"category" : "simulation_instruction",
			"intendedTarget" : "simulation_core",
			"tags" : ["simulation_status_change"],
			"payload" : {
				"instruction": "setRPM",
				"value": parseInt(props.dashboardData.rpm) + 1,
			}
		}

		// Send message to the simulation
		simulationSendMessage(message)
	}

    let rotWhlRight = () => {
        console.log("Turning Wheel Right...");
        props.dashboardValues.wheelRotation += 3;
        console.log(props.dashboardValues.wheelRotation);
    };

    let rotWhlLeft = () => {
        console.log("Turning Wheel Left...");
        props.dashboardValues.wheelRotation -= 3;
        console.log(props.dashboardValues.wheelRotation);
    };

    let changeSeatWarmerLeft = () => {
        if (props.dashboardValues.seatWarmerLeft == "warm") {
            props.dashboardValues.seatWarmerLeft = "off";
            console.log("Left Seat Changed from warm to cool");
        } else if (props.dashboardValues.seatWarmerLeft == "cool") {
            props.dashboardValues.seatWarmerLeft = "warm";
            console.log("Left Seat Changed from cool to warm");
        } else {
            props.dashboardValues.seatWarmerLeft = "cool";
            console.log("Left Seat Changed from off to cool");
        }
    };

    let changeSeatWarmerRight = () => {
        if (props.dashboardValues.seatWarmerRight == "warm") {
            props.dashboardValues.seatWarmerRight = "off";
            console.log("Right Seat Changed from warm to cool");
        } else if (props.dashboardValues.seatWarmerRight == "cool") {
            props.dashboardValues.seatWarmerRight = "warm";
            console.log("Right Seat Changed from cool to warm");
        } else {
            props.dashboardValues.seatWarmerRight = "cool";
            console.log("Right Seat Changed from off to cool");
        }
    };

    let changeHazardLightStatus = () => {
        if(props.dashboardValues.hazardLights == false){
            props.dashboardValues.hazardLights = true;
        } else{
            props.dashboardValues.hazardLights = false
        }
    }
</script>

<style>

    main {
        z-index: -1;
        /* text-align: center;
        padding: 1em; */
        width: auto;
        height: 100%;
        margin: 0 auto;
        /* border: 7px solid black; */
        display: flex;
        flex-direction: column-reverse;
        border-radius: 35px;
        overflow: hidden;
    }

    .game-container {
        z-index: 1;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        border: 7px solid lightgreen;
        border-radius: 25px;
    }

    .instruction-container {
        display: grid;
        grid-row: gameRow-end instuctionRow-start / instructionRow-end
            dash-start;
        border: 7px solid skyblue;
        border-radius: 25px;
        position: relative;
    }

    .dashArea-container {
        display: grid;
        grid-row: instructionRow-end dash-start / dash-end;
        border: solid black;
        border-radius: 25px;
        background-color: darkslategray;
    }

    .testButtons-container {
        grid-area: testButtons;
        justify-self: center;
    }

    .video-container{
        grid-area: video;
    }
    h1 {
        font-size: 4em;
        font-weight: 100;
    }
    /* .message-container {
        z-index: 3;
        position:"relative";
        text-align:"center";
    } */

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<main>
    <div class="dashArea-container">
        <SimpleDash bind:this={messageRecipients[0]} on:message={handleDispatchedEvent} bind:values={props.dashboardValues} />
    </div>
    <div class="game-container">
        <MiniGame bind:this={messageRecipients[1]} on:message={handleDispatchedEvent} bind:props={props.minigameData} />
<!--        <div class="testButtons-container">-->
<!--            <button on:click={rotWhlLeft}>Turn Wheel Left</button>-->
<!--            <button on:click={rotWhlRight}>Turn Wheel Right</button>-->
<!--            <br>-->
<!--            <button on:click={incRPM}>Increment RPM</button>-->
<!--            <button on:click={incSpd()}>Increment Speed</button>-->
<!--            <br>-->
<!--            <button on:click={changeSeatWarmerLeft}>Left Seat Change</button>-->
<!--            <button on:click={changeSeatWarmerRight}>Right Seat Change</button>-->
<!--            <br>-->
<!--            <button on:click={changeHazardLightStatus}>Hazard Lights</button>-->
<!--        </div>-->
    </div>

<!--    <div class="instruction-container">-->
<!--        <Instruction on:message={handleDispatchedEvent} bind:Instruction={instruction} />-->
<!--    </div>-->
    <!-- <div class="message-container"> -->
    <!-- <Outer on:message={handleDispatchedEvent}/> -->
    <!-- </div> -->
</main>
