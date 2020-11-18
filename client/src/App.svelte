<script>
    // Imports
    import SimpleDash from "./SimpleDash.svelte";
    import { onMount } from "svelte";
    import Game from "./game.svelte";
    import Instruction from "./instruction.svelte"

    import Outer from './Outer.svelte';

    // App Props
    let canvas;

    let game = { status: "on" };

    let instruction = { status: "on"};

    let props = {
        name: "Simple Dashboard",
        dashboardValues: {
            speed: 0,
            rpm: 0,
            wheelRotation: 0
        },
    };

    let incSpd = () => {
        console.log("Incrementing speed...");
        props.dashboardValues.speed += 1;
    };

    let decSpd = () => {
        console.log("Decrementing speed...");
        props.dashboardValues.speed -= 1;
    };

    let incRPM = () => {
        console.log("Incrementing RPM...");
        props.dashboardValues.rpm += 1000;
    };

    let decRPM = () => {
        console.log("Decrementing RPM...");
        props.dashboardValues.rpm -= 1000;
    };

    let rotWhlRight = () => {
        console.log("Turning Wheel Right...");
        props.dashboardValues.wheelRotation += 3;
    }

    let rotWhlLeft = () => {
        console.log("Turning Wheel Left...");
        props.dashboardValues.wheelRotation -= 3;
        console.log(props.dashboardValues.wheelRotation);
        
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
        width:auto;
        height:auto;
        margin: 0 auto;
        /* border: 7px solid black; */
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: [gameRow-start] 45vh [gameRow-end instructionRow-start] 5vh [instructionRow-end dash-start] 50vh [dash-end];
        border-radius: 35px;
        overflow:hidden;
    }

    .game-container {
        display: grid;
        grid-row: gameRow-start / gameRow-end instuctionRow-start;
        border: 7px solid lightgreen;
        border-radius: 25px;
        position:relative;
    }

    .instruction-container {
        display: grid;
        grid-row: gameRow-end instuctionRow-start / instructionRow-end dash-start;
        border: 7px solid skyblue;
        border-radius: 25px;
        position:relative;
    }

    .dashArea-container {
        display: grid;
        grid-row: instructionRow-end dash-start / dash-end;
        border: 7px solid black;
        border-radius: 25px;
        background-color: black;
        position:relative;
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
    <!-- <h1>Now Testing: {props.name}</h1> -->
    <!-- <button on:click={incSpd}>Increment Speed</button>
    <button on:click={decSpd}>Decrement Speed</button>
    <button on:click={incRPM}>Increment RPM</button>
    <button on:click={decRPM}>Decrement RPM</button> -->

    <div class="game-container">
        <Game bind:Game={game} />
        <button on:click={rotWhlRight}>Turn Wheel Right</button>
        <button on:click={rotWhlLeft}>Turn Wheel Left</button>
        <button on:click={incSpd}>Increment Speed</button>
        <button on:click={decSpd}>Decrement Speed</button>
    </div>

    <div class = "instruction-container">
        <Instruction bind:Instruction={instruction} />
    </div>
    <div class="dashArea-container">
        <SimpleDash bind:values={props.dashboardValues} />
        
    </div>
    <!-- <div class="message-container"> -->
        <!-- <Outer on:message={handleMessage}/> -->
    <!-- </div> -->
</main>
