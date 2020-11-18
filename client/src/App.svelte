<script>
	// --[ Imports ]--
	import SimpleDash from './SimpleDash.svelte';
	import MiniGame from './MiniGame.svelte';

	// --[ App Props ]--
	let props = {
		"name": "Simple Dashboard",
		"dashboardValues": {
			"speed": 55,
			"rpm": 1500
		}
	}

	// --[ Global Simulation Setup ]--

	// A function to handle messages thrown by the simulation
	let messageCallback = (message) => {
		console.log("Received a message: " + message);
	}

	// Global Tick Count (Used for "global time")
	let globalTick = 0;

	// Tick function to be called every 500 milliseconds
	// All time-dependent calls should be registered here
	let tick = () => {
		console.log("Tick");
		globalTick++;	 // Increment Tick Counter
	}

	// Call tick every 500 milliseconds
	setInterval(tick, 500);

	// --[ Dashboard Tests ]--
	let incSpd = () => {
		console.log("Incrementing speed...");
		props.dashboardValues.speed += 1;
	}

	let incRPM = () => {
		console.log("Incrementing RPM...");
		props.dashboardValues.rpm += 1000;
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
	<SimpleDash bind:values={props.dashboardValues}/>
	<MiniGame />
</main>
