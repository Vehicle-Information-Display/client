<script>
	// Imports
	import SimpleDash from './SimpleDash.svelte';

	// App Props
	let props = {
		"name": "Simple Dashboard",
		"dashboardValues": {
			"speed": 55,
			"rpm": 1500
		}
	}

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
</main>