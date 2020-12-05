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
    }

    // Handle a global simulation tick
    export function tick(globalTickTime) {
        // [TODO] Implement instrumentation tick handler
    }
</script>