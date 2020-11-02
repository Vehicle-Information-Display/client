<script>
	// Imports
	import SimpleDash from './SimpleDash.svelte';
	//when mounted then do stuff function
	import { onMount } from "svelte";

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

	//instructions
	let instruction = "Ready?"

	//canvas stuff for simulation
	let canvas; //the canvas object
	let canvasContext; //the canvas context object
	let canvasDims = { //canvas dimensions
		w: 600, //width
		h: 600 //height
	};
  let times = []; //record the times of events. first one is simulation start
	let userDim = {
		w: 30, // width : 600/12....12 spaces across the board to move\
		h: 30 // height : for being square
	};

	//onMount function
	//Date.now into times for starting time of simulation
	onMount(() => {
		console.log("inside onMount function")
		drawCanvas();

	});

	//canvas functions
	let drawCanvas = () => {
		//draws the canvas and puts a black border and a white background
		canvas = document.getElementById("game");
		canvas.style.border = "1px solid black";
    canvasContext = canvas.getContext("2d");
		canvasContext.fillStyle = "white";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	}

	let drawIm = () => {
		//draws the car image in the bottom middle
		var img = document.getElementById("car");
		canvasContext.drawImage(img, (canvasDims.w/2)-(userDim.w/2), (canvasDims.h)-(userDim.h), userDim.w, userDim.h);
	}

	let start = () => {
		instruction = "Started at " + Date.now();
		document.getElementById("game").removeAttribute("hidden");
		document.getElementById("startButton").remove();
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

	<br><br>
	<!-- The instruction "bar" -->
	<h3>{instruction}</h3>

	<!-- Start the simulation button -->
	<button on:click={start} id="startButton">Start the Simulation</button>

	<!-- img to be used as the main user in the simulation in the canvas -->
	<img on:load={drawIm} id="car" hidden src="img/car.png">

	<!-- the canvas element -->
	<canvas
	hidden
  id="game"
  width={canvasDims.w}
  height={canvasDims.h}
	/>
	<!-- on:mousemove={start}  -->
</main>
