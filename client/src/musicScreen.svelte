<script context="module">
  let iframeApiReady = false;
  
  import { setContext, onMount } from "svelte";
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () =>
    window.dispatchEvent(new Event("iframeApiReady"));
</script>

<script>
import { createEventDispatcher } from "svelte";
import { getContext } from "svelte";
const dispatch = createEventDispatcher();
export let props = {
        "myVolume": 0
    }
    

/**
 * Put your video IDs in this array
 */
 var videoIDs = [
  'tG35R8F2j8k',
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

    var stopButton = document.getElementById("stop-button");
    stopButton.addEventListener("click", function() {
        player.stopVideo();
    });
 var next = document.getElementById("next");
    next.addEventListener("click", function() {
        player.nextVideo();
    });
    
 var pre = document.getElementById("previous");
    pre.addEventListener("click", function() {
        player.previousVideo();
    });

var vol = document.getElementById("volume");
    vol.addEventListener("click", function() {
        player.setVolume(props.myVolume);
    });
    
     player.loadPlaylist( {
        playlist:videoIDs
    } );
    


}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    currentVideoId++;
    if (currentVideoId < videoIDs.length) {
      player.loadVideoById(videoIDs[currentVideoId]);
    }
  }
}

</script>

<style>
.buttons {
	position: relative;
	margin: 0 auto 20px auto;
	padding: 20px;
	float: left;
	display: block;
	background-color: #eee;
	border-radius: 4px;
}
.buttons:after {
	top: 100%;
	left: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(238, 238, 238, 0);
	border-top-color: #eee;
	border-width: 10px;
	margin-left: -10px;
}
.button {
	padding: 10px 20px;
	font-weight: bold;
	letter-spacing: 5px;
	outline: none;
	cursor: pointer;
	color: white;
	background-color: #7F8C8D;
	border: none;
	border-radius: 4px;
}
#play-button {
	background-color: #2ECC71;
}
#play-button:hover {
	background-color: #27AE60;
}
#pause-button {
	background-color: #E67E22;
}
#pause-button:hover {
	background-color: #D35400;
}
#stop-button {
	background-color: #E74C3C;
}
#stop-button:hover {
	background-color: #C0392B;
}
#pause-button,
#stop-button {
	margin-left: 15px;
}
iframe {
	margin: 0 auto;
	width: 0px;
	height: 0px;
	float: left;
	clear: both;
	display: block;
	background-color: #eee;
}
</style>


    <div id="player"></div>
        <div class="buttons">
		    <button class="button" id="play-button">PLAY</button>
		    <button class="button" id="pause-button">PAUSE</button>
		    <button class="button" id="previous">previous</button>
		    <button class="button" id="next">Next</button>
		    <button class="button" id="stop-button">STOP</button>
	    </div>
