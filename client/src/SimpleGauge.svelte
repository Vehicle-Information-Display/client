<script>
    export let props = {
        "name": "Unknown",
        "value": 0
    }
</script>

<style>
    * {
        font-family: Helvetica,serif;
    }

    svg {
        height: 50%;
        width: 50%;
    }

    .gauge-wrapper {
        height: 100%;
        width: 100%;
    }

    .gauge-face {
        stroke: #333;
        fill: white;
    }

    .minor {
        stroke: #999;
        stroke-width: 0.5;
    }

    .major {
        stroke: #333;
        stroke-width: 1;
    }

    .needle, .needle-counterweight {
        stroke: rgb(180,0,0);
    }

    .needle-counterweight {
        stroke-width: 3;
    }

    .center-pin {
        stroke-width: 0;
        background: #333333;
    }
</style>

<div class="gauge-wrapper">
    <svg viewBox='-50 -50 100 100'>
        <circle class='gauge-face' r='48'/>

        <!-- Marker Ticks -->
        {#each [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] as minute}
            <line
                    class='major'
                    y1='40'
                    y2='45'
                    transform='rotate({6 * minute})'
            />

            {#each [1, 2, 3, 4] as offset}
                <line
                        class='minor'
                        y1='42'
                        y2='45'
                        transform='rotate({6 * (minute + offset)})'
                />
            {/each}
        {/each}

        <!-- Needle -->
        <g transform='rotate({6 * (props.value - 25)})'>
            <line class='needle' y1='10' y2='-38'/>
            <line class='needle-counterweight' y1='10' y2='-20'/>
        </g>

        <circle r="5" class="center-pin"/>
    </svg>
    <!-- <p>{props.name}</p> -->
</div>