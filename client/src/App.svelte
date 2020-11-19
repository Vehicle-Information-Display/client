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

	// --[ App Props ]--
	let canvas;
	let game = { status: "on" };
	let instruction = { status: "on" };

	let props = {
		"name": "Simple Dashboard",
		"dashboardData": null
	}

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
		simulationTick(globalTickCount);

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

    function handleMessage(event) {
        alert(event.detail.text);
    }
</script>

<style>

    main {
        z-index: -1;
        /* text-align: center;
        padding: 1em; */
        width: auto;
        height: auto;
        margin: 0 auto;
        /* border: 7px solid black; */
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: [gameRow-start] 45vh [gameRow-end instructionRow-start] 5vh [instructionRow-end dash-start] 50vh [dash-end];
        border-radius: 35px;
        overflow: hidden;
    }

    .game-container {
        z-index: 10;
        display: grid;
        grid-row: gameRow-start / gameRow-end instuctionRow-start;
        border: 7px solid lightgreen;
        border-radius: 25px;
        position: relative;
        grid-template-areas:
            "video video video video"
            "testButtons testButtons testButtons testButtons"
            "testButtons testButtons testButtons testButtons";
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
        position: relative;
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
	<h1>Now Testing: {props.name}</h1>
	<button on:click={incSpd}>Increment Speed</button>
	<button on:click={incRPM}>Increment RPM</button>
	<SimpleDash bind:values={props.dashboardData}/>
	<MiniGame />

    <div class="game-container">
        <div class="video-container">
            <Game bind:Game={game} />
        </div>
        <div class="testButtons-container">
            <button on:click={rotWhlLeft}>Turn Wheel Left</button>
            <button on:click={rotWhlRight}>Turn Wheel Right</button>
            <br>
            <button on:click={incRPM}>Increment RPM</button>
            <button on:click={incSpd()}>Increment Speed</button>
            <br>
            <button on:click={changeSeatWarmerLeft}>Left Seat Change</button>
            <button on:click={changeSeatWarmerRight}>Right Seat Change</button>
            <br>
            <button on:click={changeHazardLightStatus}>Hazard Lights</button>
        </div>
    </div>

    <div class="instruction-container">
        <Instruction bind:Instruction={instruction} />
    </div>
    <div class="dashArea-container">
        <SimpleDash bind:values={props.dashboardValues} />
    </div>
    <!-- <div class="message-container"> -->
    <!-- <Outer on:message={handleMessage}/> -->
    <!-- </div> -->
</main>
