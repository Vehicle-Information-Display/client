<script>
	// --[ Imports ]--
	import {simulationData, simulationTick, simulationSendMessage, simulationRegisterMessageToApp} from "./simulation";
	import SimpleDash from './SimpleDash.svelte';
	import MiniGame from './MiniGame.svelte';

	// --[ App Props ]--
	let props = {
		"name": "Simple Dashboard",
		"dashboardData": null
	}

	// --[ Global Simulation Setup ]--

	// Register a callback function to handle messages thrown by the simulation
	simulationRegisterMessageToApp((messageToApp) => {
		console.log("[DEBUG] Received a message from the simulation!");
		console.log(messageToApp);
	});

	// Global Tick Count (Used for "global time")
	let globalTickCount = 0;

	// Tick function to be called every 500 milliseconds
	// All time-dependent calls should be registered here
	let globalTick = () => {
		// Call simulation tick handler
		simulationTick(globalTickCount);

		// Increment tick counter
		globalTick++;
	}

	// Call tick every 500 milliseconds
	setInterval(globalTick, 500);

	// --[ Dashboard Tests ]--

	// Update properties when simulationData updates
	const unsubscribe = simulationData.subscribe(data => {
		props.dashboardData = data;
	});

	// Increment the speed
	let incSpd = () => {
		console.log("[DEBUG] Incrementing speed..." + props.dashboardValues.speed);
		// props.dashboardValues.speed += 1;
		let message = {
			"timestamp" : Date(),
			"name" : "Test",
			"category" : "simulation_instruction",
			"intendedTarget" : "simulation_core",
			"tags" : ["simulation_status_change"],
			"payload" : {
				"instruction": "setSpeed",
				"value": parseInt(props.dashboardValues.speed) + 1,
			}
		}

		// Send message to the simulation
		simulationSendMessage(message)
	}

	let incRPM = () => {
		console.log("[DEBUG] Incrementing RPM...");
		// props.dashboardValues.rpm += 1000;
		let message = {
			"timestamp" : Date(),
			"name" : "Test",
			"category" : "simulation_instruction",
			"intendedTarget" : "simulation_core",
			"tags" : ["simulation_status_change"],
			"payload" : {
				"instruction": "setRPM",
				"value": parseInt(props.dashboardValues.rpm) + 1,
			}
		}

		// Send message to the simulation
		simulationSendMessage(message)
	}
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		font-size: 4em;
		font-weight: 100;
	}

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
</main>
