<script>
    export let game = {
        "status": "on",
    };
</script>

<style>
    .game-wrapper {
        text-align: center;
    }

    fontSize {
        font-size: 3vh;
    }

    .video-wrapper {
        margin: auto;
        height: 89%;
        width: 99%;
        border: solid black;
        border-radius: 7px;
        position:relative;
    }

</style>

<div class="game-wrapper">
    {#if game.status == 'on'}
        <fontSize>THIS IS THE GAME AREA 45%<br /></fontSize>
        <div class = "video-wrapper">
            <iframe width=100% height=100% src="https://www.youtube.com/embed/5nkB_enli7M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    {/if}
</div>
