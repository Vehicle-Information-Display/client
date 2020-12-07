<script>
    // --[ Core Imports ]--
	import {
		simulationTick,
		simulationSendMessage,
		simulationRegisterMessageToApp,
	} from "./simulation";
    import { globalEventCache, simulationDataStore, simulationScenarioStore } from "./stores";
    import Instrumentation from './Instrumentation.svelte';
	import Instruction from "./Instruction.svelte";
	import MiniGame from './MiniGame.svelte';
	import Modal from './Modal.svelte';

	// --[ Layout/Scenario Imports ]--
    import SimpleDash from './SimpleDash.svelte';

	// --[ Scenario Imports ]--
	import { testScenario } from './scenarios/testScenario';

	// --[ Essential App Variables ]--

    // [HACK] This is a workaround for passing messages to children
    let messageRecipients = [];

    // Will store the variable referencing the global tick interval caller
    let globalTickInterval;

    let simulationRunning = false;

    // --[ User Registration Handling ]--

    // By default, we want the user registration modal to show up above everything else
    let showUserRegModal = true;

    // By default, the spinner should be hidden
    let showSpinner = false;

    // Placeholder user info
    let userName = undefined;
    let userEmail = undefined;

    // Error messages
    let regError;

    // Function to actually run the registration
    function userRegister() {
        // Check for errors
        if (userName === undefined || userName === null || userName == "") {
            regError = "Name is not valid!";
            return;
        } else if (userEmail === undefined || userName === null || userEmail == "") {
            regError = "Email is not valid!";
            return;
        }

        // Show the spinner before the async call
        showSpinner = true;

        // Build the request body
        const body = {
            "type": "insertUser",
            "name": userName,
            "email": userEmail
        }

        // Make async call
        // Send the request
        fetch($simulationDataStore.serverInfo.serverURL, {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res => {
            // Get uid from the returned JSON object
            const uid = res.user_id;

            // [FIXME] Remove this response logging in production
            console.log("[DEBUG] Sent new user request to server, got uid: " + uid);

            // Update the UID in the simulation data store
            simulationDataStore.update(ex => {
                ex.serverInfo.uid = uid;
                return ex;
            });

            // Emit event notifying the completion of the registration flow
            handleMessage({
                "timestamp": Date.now(),
                "name": "userRegistrationComplete",
                "category": "userevent",
                "intendedTarget": "records",
                "tags": ["registration", "server"],
                "payload": {
                    "userId": uid
                }
            });

            // Hide the modal and spinner when done
            showSpinner = false;
            showUserRegModal = false;
        });
    }

	// --[ App Props ]--
	let props = {
		"name": "Simple Dashboard",
        "tickTime": 500,
        "instrumentationData": {
            "messageCallback": handleMessage
        },
        "minigameData": {
		    "tempRefreshTimer": 500,
		    "canvasDimensions": {
		        "width": 600,
                "height": 280
            }
        },
        "instructionData": {
		    "display": true,
		    "currentInstruction": "",
            "alertDuration": 1500
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

        // Cache the message
        try {
            globalEventCache.addMessage(message);
        } catch (error) {
            console.error("[ERROR] Error appending message to message cache:" + error.message);
        }

        // If the message is an instruction
        if (message.name == "emitInstruction") {
            props.instructionData.display = true;
            props.instructionData.currentInstruction = message.payload.instruction;
        }

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

    // --[ Global Event Listeners ]--

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

	// Register a callback function to handle messages thrown by the simulation
	simulationRegisterMessageToApp((messageToApp) => {
		console.debug("[DEBUG] Received a message from the simulation!");
		// console.debug(messageToApp);

		// Check if the simulation has finished
        if (messageToApp.name == "majorEvent" && messageToApp.payload.eventValue == "end") {
            console.debug("[DEBUG] RECEIVED END OF THE SIMULATION!");

            // Stop simulation tick
            clearInterval(globalTickInterval);

            /* Submit data to server
             * Note: This is done by emitting a message that is handled by the Instrumentation system
             */
            handleMessage({
                "timestamp": messageToApp.timestamp,
                "name": messageToApp.name,
                "category": messageToApp.category,
                "intendedTarget": "instrumentation",
                "payload": {
                    "eventValue": messageToApp.payload.eventValue,
                    "scenarioState": JSON.parse(JSON.stringify($simulationScenarioStore))  // [HACK] Just want to get a snapshot of state
                }
            });

            // Set the simulationRunning flag
            simulationRunning = false;

            // [FIXME] Remove this alert once a more elegant solution is implemented
            alert("You have completed this scenario. Please move onto the next one, if it exists.");
        }

        // In the general case, use the standard-format event handler
        else {
            handleMessage(messageToApp);
        }
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

    // Global Simulation Start
    function startSimulation() {
	    // Emit an event signalling the start of the simulation
        handleMessage({
            "timestamp": Date.now(),
            "name": "simulationStart",
            "category": "majorevent",
            "intendedTarget": null,
            "tags": ["App"],
            "payload": {}
        });

        // Start ticking in the simulation
        globalTickInterval = setInterval(globalTick, props.tickTime);

        // Hide the start button after starting simulation
        document.getElementById('startButton').style.display = "none";

        // Set the simulationRunning flag
        simulationRunning = true;
    }

    // --[ Scenario & Layouts Setup ]--

    // Define the scenario to use within the simulation
    // [TODO] The scenario should be hot-swappable!
    simulationScenarioStore.update((sc) => {
        return testScenario;
    });

	// Create a map of Layouts and their respective components
	const layouts = new Map([
        ["SimpleDash", SimpleDash]
    ]);

	// Specify which component should be used by grabbing the layout name from the scenario-specific store
    let selectedLayout = layouts.get($simulationScenarioStore.layout);
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
        border: 7px solid skyblue;
        border-radius: 25px;
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

<!-- User Registration Modal -->
{#if showUserRegModal}
    <Modal on:close="{() => showUserRegModal = false}">
        <h2 slot="header">Register</h2>

        <div>
            <input bind:value={userName} placeholder="Enter your name">
            <input bind:value={userEmail} placeholder="Enter your email">
        </div>

        <p>Thank you, {userName || 'stranger'}! Click the register button below when ready.</p>

        {#if regError}
            <p style="color: red; border: 1px solid red; padding: 1px;">{regError}</p>
        {/if}

        {#if showSpinner}
            <div>
                <img src="img/spinner.gif" height="100px" width="auto" alt="waiting...">
            </div>
        {/if}

        <button autofocus on:click={userRegister}>Register</button>
    </Modal>
{/if}

<!-- [TODO] Change the styles of the start button to be less amateurish -->
<button on:click={startSimulation} id="startButton">Start the Simulation</button>

<!-- Instrumentation Component: Contains no visible elements -->
<Instrumentation globalEventCache={$globalEventCache} bind:this={messageRecipients[0]} on:message={handleDispatchedEvent} bind:props={props.instrumentationData} />

<!-- Primary Dashboard UI Section -->
<main>
    <div class="dashArea-container">
        <svelte:component this={selectedLayout} bind:this={messageRecipients[1]} on:message={handleDispatchedEvent} bind:values={$simulationDataStore} />
    </div>
    <div class="game-container">
        <MiniGame bind:this={messageRecipients[2]} on:message={handleDispatchedEvent} bind:props={props.minigameData} />
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

    {#if props.instructionData.display}
        <div class="instruction-container">
            <Instruction on:message={handleDispatchedEvent} bind:props={props.instructionData} />
        </div>
    {/if}
<!--     <div class="message-container"> -->
<!--     <Outer on:message={handleDispatchedEvent}/> -->
<!--     </div> -->
</main>
