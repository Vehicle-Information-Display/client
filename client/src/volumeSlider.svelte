<script>
	import Slider from './Slider.svelte';

	let volume = 1;
</script>
<style>
	* {
		box-sizing: border-box;
	}
	
	
	.volume {
		width: 100px;
	}
	
	audio {
		visibility: hidden;
		opacity: 0;
	}
</style>


	<div class="volume">
		<Slider max={1} min={0} step={0.01} current={volume} on:change={e => volume = e.detail.value} />
	</div>
