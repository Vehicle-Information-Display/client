<script>
	import { onMount } from 'svelte';
	let date = new Date();

	$: hour = date.getHours();
	$: min = date.getMinutes();
	let dayOrNight = 'PM';
	let hourgreaterThanTwelve = 1;
	let minLessThanTen = 1;
	
	onMount( () => {
		const interval = setInterval(() => {
			date = new Date();
			dayOrNight = (hour >= 12) ? "PM" : "AM";
			hourgreaterThanTwelve = (hour > 12) ? hour-12 : hour;
			minLessThanTen = (min < 10) ? "0"+min : min;
		}, 1000);
	});
</script>

<style>
	section, .clockWrapper, .clockDisplay {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.clockDisplay {
		width: 100%;
		height: 100%;
		font-size: 4vh;
		background: black;
		border-radius: 15px;
		color: #ffffff;
		display:block;
		margin:auto;
	}
</style>

<section>
	<div id='' class='clockWrapper'>

		<p class='clockDisplay'> 
			{hourgreaterThanTwelve} : {minLessThanTen} {dayOrNight}
		</p>
	</div>
</section>







