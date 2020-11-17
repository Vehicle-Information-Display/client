<script>
    export let instruction = {
		"status": "on"
    }
</script>

<style>

    .instruction-wrapper {
        text-align: center;
    }

    fontSize {
        font-size: 3vh;
    }
</style>

<div class="instruction-wrapper">
    {#if instruction.status == "on"}
    <fontSize>THIS IS THE INSTRUCTION AREA 5%</fontSize>
    {/if}
</div>