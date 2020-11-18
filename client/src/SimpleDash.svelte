<script>
    import SimpleGauge from './SimpleGauge.svelte';

    export let values = {
        "speed": 0,
        "engineRPM": 0
    }

    let speedometerProps = {}
    let tachometerProps = {}

    $: speedometerProps = {
        "name": "Speedometer",
        "value": values.speed / 2
    }

    $:tachometerProps = {
        "name": "Tachometer",
        "value": values.engineRPM / 200
    }
</script>

<style>
    .big-gauge-container {
        display: grid;
        grid-template-columns: repeat(2, 50%);
        width: 100%;
        height: 100%;
    }
</style>

<div class="big-gauge-container">
    <SimpleGauge bind:props={speedometerProps}/>
    <SimpleGauge bind:props={tachometerProps}/>
</div>
