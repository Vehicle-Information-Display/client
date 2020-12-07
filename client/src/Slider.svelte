<script context="module">
    let iframeApiReady = false;
    
    import { setContext, onMount } from "svelte";
    export function onPlayerReady(){};
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    window.onYouTubeIframeAPIReady = () =>
      window.dispatchEvent(new Event("iframeApiReady"));
  </script>

<script>
    import { tick } from 'svelte';
      import { createEventDispatcher } from 'svelte';
      import MusicScreen from './musicScreen.svelte';
      const dispatch = createEventDispatcher();
      export let min = 0;
      export let max = 100;
      export let step = 2;
      export let current = 3;

      let sliding = false;
      let slider;
      let scale;
      onMount(() => {
          scale = slider.clientWidth / (max / step);
          function handleResize() {
              scale = slider.clientWidth / (max / step);
          }
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
      })
      
      $: dispatch('change', { value: current });
  
      function handleMouseMove(e) {
          if (sliding) {
              const distance = e.clientX - slider.getBoundingClientRect().left
          const value = Math.round((distance / scale)) * step;
          current = Math.max(Math.min(value, max), min);
          player.setVolume(current*100);
          }
      }
   
      async function handleMouseDown(e) {
          sliding = true;
          
          const distance = e.clientX - slider.getBoundingClientRect().left
          const value = Math.round((distance / scale)) * step;
          current = value;
          player.setVolume(current*100);
      }
      
      function handleKeydown(e) {
          if (e.keyCode === 37 || e.keyCode === 40) {
              e.preventDefault();
              const nextValue = current - step;
              current = Math.max(nextValue, min);
          } else if (e.keyCode === 38 || e.keyCode === 39) {
              e.preventDefault();
              const nextValue = current + step;
              current = Math.min(nextValue, max);
          }
      }
  
      function handleMouseup(e) {
          sliding = false;
      }

      var videoIDs = [
        'S-Xm7s9eGxU',
        'tG35R8F2j8k',
        'QtHRyy5LODE',
        'Ao81ziiXHhs',
        'Xssze9dU47I',
        'bBTeAg5CFRA',
        '5xppdO2b2rc',
        'UWktRW128UA'
  
];

var player, currentVideoId = 0;

window.addEventListener("iframeApiReady", function(e) {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    playerVars: {
      controls: 1,
      showinfo: 0,
      rel: 0,
      showsearch: 0,
      iv_load_policy: 3,
      autoplay: 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
      });
});

function onPlayerReady(event) {
  event.target.loadVideoById(videoIDs[currentVideoId]);
    // bind events
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function() {
        player.playVideo();
    });

    var pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", function() {
        player.pauseVideo();
    });

    var next = document.getElementById("next");
    next.addEventListener("click", function() {
        player.nextVideo();
    });
    
    var pre = document.getElementById("previous");
    pre.addEventListener("click", function() {
        player.previousVideo();
    });

// var vol = document.getElementById("slider");
//     if("mouseup"){ // check if mouse down.
//         vol.addEventListener("mousemove", function(current) {
//         console.log("Hello");
//         player.setVolume(current);
//     });
// }   
    
    
     player.loadPlaylist( {
        playlist:videoIDs
    } );


}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    currentVideoId++;
    if (currentVideoId > videoIDs.length) {
        player.loadVideoById(videoIDs[currentVideoId]);
    }
  }
}
      
  </script>
  
  <style>
      .slider {
		position: relative;
		width: 90%;
		height: 30px;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	
	.rail {
		width: 100%;
		height: 8px;
		background-color: #eaeaea;
		border-radius: 8px;
		overflow: hidden;
	}
	
	.fill {
		width: 100%;
		height: 8px;
		background-color: #362b9c;
		transform-origin: left;
		transform: scaleX(0);
	}
	
	.ball {
		position: absolute;
		z-index: 2;
		top: calc(50% - 8.5px);
		left: -3px;
		width: 17px;
		height: 17px;
		border-radius: 50%;
		background-color: #9e67e6;
	}

    #play-button {
    }
  </style>
  
  <svelte:body
    on:mousemove={handleMouseMove}	 
   on:mouseup={handleMouseup}
   on:mouseleave={handleMouseup}
  />

  <div
           tabindex="0"
               aria-valuemax={max}
           aria-valuemin={min}
           aria-valuenow={current}
           aira-orientation="horizontal"
           role="slider"
           bind:this={slider} class="slider" id="slider" on:mousedown={handleMouseDown} on:keydown={handleKeydown} >
      <div class="rail">
          <div class="ball" style="left: calc({current / max * 100}% - 8.5px)">
          </div>
          <div class="fill" style="transform: scaleX({current / max})">
              
          </div>
      </div>
  </div>
  
  