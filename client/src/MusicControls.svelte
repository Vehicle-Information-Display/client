<script>
	import Volume from "./volumeSlider.svelte";
    export let mC = {
        status: "on",
    };
    let volume = 0;
</script>

<style>

	.volume {
		grid-area: volume;
        display: flex;
	}

    .back {
        grid-area: back;
    }

    .play {
        grid-area: play;
    }

    .pause {
        grid-area: pause;
    }

    .forward {
        grid-area: forward;
    }

    .buttonArea {
		padding-left: 3vw;
		padding-top: 0.5vh;
        display: grid;
        align-items: center;
        grid-auto-flow: column;
        grid-template-columns: 30% 15% 15% 15% 15%;
        grid-template-rows: 100%;
        grid-template-areas: "volume back play pause forward";
    }

    .buttonContainer{
        display: flex;
		justify-content: space-between;
    }

    svg {
       height: 5vh;
       width: 5vh;
       display:block;
       margin:auto;
    }
</style>

<div class = "image-wrapper">
    {#if mC.status == 'on'}
    <div class="buttonArea">
        <!-- <div class="buttonContainer"> -->
		<!-- --------------------------------------------------------------- -->
		<div class = "volume">
			<Volume/>
		</div>
		<!-- --------------------------------------------------------------- -->
        <div class="back">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="269 269 103 104" x="0px" y="0px"><defs><path d="M369.69 320C369.69 347.62 347.42 370.04 320 370.04C292.58 370.04 270.31 347.62 270.31 320C270.31 292.38 292.58 269.96 320 269.96C347.42 269.96 369.69 292.38 369.69 320Z" id="f1hZZexvk6"></path><path d="M348.39 344.49L304.38 321.77L348.39 295.51L348.39 344.49Z" id="a2hZ18tLf9"></path><path d="M317.16 295.51L317.16 344.49L304.38 344.49L304.38 295.51L317.16 295.51Z" id="c6JQHfHh2K"></path><path d="M317.16 295.51L317.16 344.49L304.38 344.49L304.38 295.51L317.16 295.51Z" id="d5vxNCjBMF"></path></defs><g><g><use xlink:href="#f1hZZexvk6" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#f1hZZexvk6" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="1"></use></g></g><g><use xlink:href="#a2hZ18tLf9" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#a2hZ18tLf9" opacity="1" fill-opacity="0" stroke="#240c22" stroke-width="1" stroke-opacity="1"></use></g></g><g><use xlink:href="#c6JQHfHh2K" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#c6JQHfHh2K" opacity="1" fill-opacity="0" stroke="#ffffff" stroke-width="1" stroke-opacity="1"></use></g></g><g><use xlink:href="#d5vxNCjBMF" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#d5vxNCjBMF" opacity="1" fill-opacity="0" stroke="#ffffff" stroke-width="1" stroke-opacity="1"></use></g></g></g></svg>
		
		</div>
        <div class="play">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="269 269 103 104" x="0px" y="0px"><defs><path d="M369.69 320C369.69 347.62 347.42 370.04 320 370.04C292.58 370.04 270.31 347.62 270.31 320C270.31 292.38 292.58 269.96 320 269.96C347.42 269.96 369.69 292.38 369.69 320Z" id="bxps3QtN"></path><path d="M304.38 344.49L348.39 321.77L304.38 295.51L304.38 344.49Z" id="cgAIVgrtZ"></path></defs><g><g><use xlink:href="#bxps3QtN" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#bxps3QtN" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="1"></use></g></g><g><use xlink:href="#cgAIVgrtZ" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#cgAIVgrtZ" opacity="1" fill-opacity="0" stroke="#240c22" stroke-width="1" stroke-opacity="1"></use></g></g></g></svg>
		</div>
        <div class="pause">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="269 269 103 104" x="0px" y="0px"><defs><path d="M369.69 320C369.69 347.62 347.42 370.04 320 370.04C292.58 370.04 270.31 347.62 270.31 320C270.31 292.38 292.58 269.96 320 269.96C347.42 269.96 369.69 292.38 369.69 320Z" id="bxps3QtN"></path><path d="M317.16 295.51L317.16 344.49L304.38 344.49L304.38 295.51L317.16 295.51Z" id="aCyhNbEvQ"></path><path d="M339.16 295.51L339.16 344.49L326.39 344.49L326.39 295.51L339.16 295.51Z" id="e1fjMkyXOs"></path></defs><g><g><use xlink:href="#bxps3QtN" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#bxps3QtN" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="1"></use></g></g><g><use xlink:href="#aCyhNbEvQ" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#aCyhNbEvQ" opacity="1" fill-opacity="0" stroke="#240c22" stroke-width="1" stroke-opacity="1"></use></g></g><g><use xlink:href="#e1fjMkyXOs" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#e1fjMkyXOs" opacity="1" fill-opacity="0" stroke="#240c22" stroke-width="1" stroke-opacity="1"></use></g></g></g></svg>
		</div>
        <div class="forward">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="269 269 103 104" x="0px" y="0px"><defs><path d="M369.69 320C369.69 347.62 347.42 370.04 320 370.04C292.58 370.04 270.31 347.62 270.31 320C270.31 292.38 292.58 269.96 320 269.96C347.42 269.96 369.69 292.38 369.69 320Z" id="bxps3QtN"></path><path d="M304.38 344.49L348.39 321.77L304.38 295.51L304.38 344.49Z" id="c32w2isr6"></path><path d="M348.39 293.44L348.39 342.42L335.62 342.42L335.62 293.44L348.39 293.44Z" id="aRMLsdqgR"></path></defs><g><g><use xlink:href="#bxps3QtN" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#bxps3QtN" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="1"></use></g></g><g><use xlink:href="#c32w2isr6" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#c32w2isr6" opacity="1" fill-opacity="0" stroke="#240c22" stroke-width="1" stroke-opacity="1"></use></g></g><g><use xlink:href="#aRMLsdqgR" opacity="1" fill="#ffffff" fill-opacity="1"></use><g><use xlink:href="#aRMLsdqgR" opacity="1" fill-opacity="0" stroke="#ffffff" stroke-width="1" stroke-opacity="1"></use></g></g></g></svg>
        </div>	
        </div>
<!-- </div> -->
	        
    {/if}
</div>
