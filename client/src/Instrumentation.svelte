<script>
    // Properties
    export let props = {
        "messageCallback": undefined
    }

    // Global event cache store; passed by parent
    export let globalEventCache = [];

    // Handle a standard-format message
    export function handleMessage(message) {
        // [TODO] Implement instrumentation message handler
        var actions = [];
        var temp = new Object();
        if(message.name == "vehicleright"){
            //console.log("Moved Right @ " + message.timestamp);
            temp["direction"] = "right";
            temp["time"] = message.timestamp;
            actions.push(temp);
            //console.log(actions);
        }
        else if(message.name == "vehicleleft"){
            //onsole.log("Moved Left @ " + message.timestamp);
            temp["direction"] = "left";
            temp["time"] = message.timestamp;
            actions.push(temp);
            //console.log(actions);
        }
        console.log(message);

    }

    // Handle a global simulation tick
    export function tick(globalTickTime) {
        // [TODO] Implement instrumentation tick handler
    }
</script>