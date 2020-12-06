<script>
    import { simulationDataStore } from "./stores";

    // Properties
    export let props = {
        "messageCallback": undefined
    }

    // Global event cache store; passed by parent
    export let globalEventCache = [];

    // Handle a standard-format message
    export function handleMessage(message) {
        // [TODO] Implement instrumentation message handler

        // If the message is a simulation end message, prepare and send results to the server
        if (message.name == "majorEvent" && message.payload.eventValue == "end") {
            // Organize required data
            const url = $simulationDataStore.serverInfo.serverURL;
            const uid = $simulationDataStore.serverInfo.uid;
            const dashboardLayout = message.payload.scenarioState.layout;
            const instructions = [];

            // Event cache
            console.log(globalEventCache);

            // Send run records to server
            sendSimulationRun(url, uid, dashboardLayout, instructions, globalEventCache);
        }
    }

    // Handle a global simulation tick
    export function tick(globalTickTime) {
        // [TODO] Implement instrumentation tick handler
    }

    // Send all events to the server in the form of an entire simulation run
    function sendSimulationRun(url, uid, dashboardLayout, instructions, simulationEvents) {

        // Build the request body
        const body = {
            "type": "insertSimRun",
            "uid": uid,
            "dashboardLayout": dashboardLayout,
            "instructions": instructions,
            "simulationEvents": simulationEvents
        }

        // Send the request
        fetch(url, {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body)
        }).then(res => {

            // Get javascript object from returned string
            const parsed = res.json();

            // [FIXME] Remove this response logging in production
            console.log("[DEBUG] Sent data to server, got response: ");
            console.log(parsed);

            // [TODO] If response is success, clear the cache, otherwise, retry
        });
    }
</script>