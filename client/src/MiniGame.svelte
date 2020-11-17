<script>
    //when mounted then do stuff function
    import { onMount } from "svelte";

    //instructions
    let instruction = "Ready?"

    //canvas stuff for minigame
    let canvas; //the canvas object
    let canvasContext; //the canvas context object
    let canvasDims = { //canvas dimensions
        w: 900, //width
        h: 600 //height
    };
    let widthSpaces = 12; //12 spaces across the board to move //columns in objMiniGameSimulation
    let heightSpaces = 10 //10 spaces of objects of height same as userDim.h
    let userDim = {
        w: canvasDims.w/12, // width
        h: canvasDims.h/10, // height
        currX: 0,
        currY: 0
    };
    //columns are widthSpaces, 0 are no object creation, 1 are object creation.
    //Rows spawn everytime space is available
    let objMiniGameSimulation = [
        [0,0,0,1,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0],
        [1,0,0,0,0,0,0,1,0,0,1,0],
        [0,0,1,0,1,0,0,1,0,0,0,0],
        [1,0,1,0,0,1,0,0,1,1,0,0],
        [0,0,1,0,1,0,0,0,1,1,0,1],
        [0,1,0,0,1,0,1,0,1,0,0,1],
    ];

    //simulation score and times variables
    let times = []; //record the times of events. first one is simulation start
    let score = 0; //score of the minigame //each time it is changed add it to the times array

    //objects of the items that will be displayed in the canvas
    class Obj {
        //creates new object with specified height and width
        constructor(height, width, x) {
            this.height = height;
            this.width = width;
            this.x = x;
            this.y = 0;
        }

        move(horizontal, vertical) {
            //clear current canvas of current object
            canvasContext.fillRect(this.x, this.y, this.width, this.height);

            //now draw the image based on the move specified in the values
            //x and y is on the top left. positive horizontal is right. positive vertical is down
            this.x += horizontal;
            this.y += vertical;
            canvasContext.fillRect(this.x, this.y, this.width, this.height);

            //check clash with user
            //if clash, then decrement score and add time of decrement
            //override object from canvas
            //delete object
            //otherwise if no clash then move on
            let clash = ((this.x > userDim.currX && this.x < userDim.currX+userDim.w)
                || (this.x+this.width > userDim.currX && this.x+this.width < userDim.currX+userDim.w))
                && (this.y+this.height < userDim.currY);
            if(clash) {
                score -= 1;
                var clashTime = Date.now();
                times.push({
                    "Event Name": "Clash",
                    "Time": clashTime
                });
                console.log(times['Event Name'] + ": " + times['Time']);
                return;
            }

            //if no clash then check if object reached the floor
            if(this.y >= canvasDims.h) {
                score += 1;
                var scoreAddition = Date.now();
                times.push({
                    "Event Name": "Scored Point",
                    "Time": scoreAddition
                });
                console.log(times['Event Name'] + ": " + times['Time']);
            }
        }
    }

    //onMount function
    //Date.now into times for starting time of simulation
    onMount(() => {
        console.log("inside onMount function")
        drawCanvas();
        document.addEventListener('keydown', function (event) {
            // console.log(event);
            if (event.key === 'd') {
                console.log("right");
            }
            if (event.key === 'a') {
                console.log("left")
            }
        });
        // setInterval()

    });

    //canvas functions
    let drawCanvas = () => {
        //draws the canvas and puts a black border and a white background
        canvas = document.getElementById("game");
        canvas.style.border = "1px solid black";
        canvasContext = canvas.getContext("2d");
        canvasContext.fillStyle = "white";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    let drawIm = () => {
        //draws the car image in the bottom middle
        const img = document.getElementById("car");
        userDim.currX = (canvasDims.w / 2) - (userDim.w / 2);
        userDim.currY = (canvasDims.h) - (userDim.h);
        canvasContext.drawImage(img, userDim.currX, userDim.currY, userDim.w, userDim.h);
    }

    let start = () => {
        var timeStarted = Date.now();
        times.push({
            "Event Name": "Started Game at",
            "Time": timeStarted
        });
        console.log(times['Event Name'] + ": " + times['Time']);
        instruction = "Started at " + timeStarted;
        document.getElementById("game").removeAttribute("hidden");
        document.getElementById("startButton").remove();
    }
</script>

<div>
    <br><br>
    <!-- The instruction "bar" -->
    <h3>{instruction}</h3>

    <!-- Start the simulation button -->
    <button on:click={start} id="startButton">Start the Simulation</button>

    <!-- img to be used as the main user in the simulation in the canvas -->
    <img on:load={drawIm} id="car" hidden src="img/car.png" alt="">

    <!-- the canvas element -->
    <canvas
            hidden
            id="game"
            width={canvasDims.w}
            height={canvasDims.h}></canvas>
    <!-- on:mousemove={start}  -->
    <p>{score}</p>
</div>
