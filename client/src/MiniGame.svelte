<script>
    //when mounted then do stuff function
    import { onMount } from "svelte";

    // Get properties (all) from parent component
    export let props = {}

    // Allow parent components to call this component's event handler
    export function handleMessage(message) {
        // console.log("[DEBUG] MiniGame received an event");
        console.log(message);

        /* Handle Keydown event
         * [FIXME] Shouldn't be able to move while the simulation isn't going!
         * */
        if (message !== undefined &&
            message.name !== undefined &&
            message.name === "keydown") {

            // Get the value of the pressed key
            let key = message.payload.keyID;

            // Debug log
            // console.log("[DEBUG] Got keydown event with: " + key);

            // Handle different key events
            if (key === 'd') {
                console.log("[DEBUG] Moving Right");
                if (userDim.currX + canvasDims.w / widthSpaces < canvasDims.w - canvasDims.w / widthSpaces) {
                    moveIMG(userDim.currX, userDim.currY, userDim.w, userDim.h, canvasDims.w / widthSpaces, 0, "car");
                    userDim.currX += canvasDims.w / widthSpaces;
                    // console.log(userDim.currX);
                }
                checkClashFromUser();

                // [TODO] Emit message that the vehicle has moved to the right
            }

            else if (key === 'a') {
                console.log("[DEBUG] Moving Left");
                if (userDim.currX - canvasDims.w / widthSpaces > 0) {
                    moveIMG(userDim.currX, userDim.currY, userDim.w, userDim.h, -canvasDims.w / widthSpaces, 0, "car");
                    userDim.currX += -canvasDims.w / widthSpaces;
                    // console.log(userDim.currX);
                }
                checkClashFromUser();

                // [TODO] Emit message that the vehicle has moved to the right
            }
        }
    }

    // Allow global simulation tick to control minigame time
    export function tick(globalTickTime) {
        // [TODO] Implement minigame tick function
        console.log("[DEBUG] Minigame received tick!");
    }

    //canvas stuff for minigame
    let canvas; //the canvas object
    let canvasContext; //the canvas context object
    let canvasDims = { //canvas dimensions
        w: 800, //width
        h: 400 //height
    };
    let widthSpaces = 12; //12-1? spaces across the board to move //columns in objMiniGameSimulation
    let heightSpaces = 10 //10-1? spaces of objects of height same as userDim.h
    let userDim = {
        w: canvasDims.w/widthSpaces, // width
        h: canvasDims.h/heightSpaces, // height
        currX: 0,
        currY: 0
    };
    //columns are widthSpaces, 0 are no object creation, 1 are object creation.
    //Rows spawn everytime space is available
    //First IN Last OUT
    let objMiniGameSimulation = [
        [0,0,0,1,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,1,0,0,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,1,0,0,0,0],
        [1,0,1,0,0,1,0,0,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,1,0,0,0,1,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,0,1,0,1,0,0,1]
    ];
    let activeRow = 0;

    let intervalID;

    //simulation score and times variables
    let times = []; //record the times of events. first one is simulation start
    let score = 0; //score of the minigame //each time it is changed add it to the times array

    //record the time event and print it out
    function recordEvent(eventN, time) {
        times.push({
            "Event Name": eventN,
            "Time": time
        });
        console.log(times[times.length-1]['Event Name'] + ": " + times[times.length-1]['Time']);
    }

    //function to do clash calculation
    function clashCalculation(objx, objy, objWidth, objHeight) {
        return ((objx > userDim.currX && objx < userDim.currX+userDim.w)
            || (objx+objWidth > userDim.currX && objx+objWidth < userDim.currX+userDim.w))
            && (objy+objHeight >= userDim.currY);
    }

    //function to check the clash between user and any other object in ACTIVE rows
    //ACTIVE row is just the first row in the objMiniGameSimulation
    function checkClashFromUser() {
        for (let i = 0; i < widthSpaces; i++) {
            if(objMiniGameSimulation[activeRow][i] != null || objMiniGameSimulation[activeRow][i] !== 0) {
                var objRef = objMiniGameSimulation[0][i];
                //do clash calculations if hit is false
                if(!objRef.hit && !objRef.finished) {
                    let clash = clashCalculation(objRef.x, objRef.y, objRef.width, objRef.height);
                    if(clash) {
                        objRef.hit = true;
                        objRef.finished = true;
                        score -= 1;
                        recordEvent("Clash", Date.now());
                    }
                }
            }
        }
    }

    //objects of the items that will be displayed in the canvas
    class Obj {
        //creates new object with specified height and width
        constructor(height, width, x, y) {
            this.height = height;
            this.width = width;
            this.x = x;
            this.y = y;
            this.hit = false; //got hit
            this.finished = false; //finished out of the board
            this.originalY = y; //used to reset obj height
        }

        move(horizontal, vertical) {
            //set the image based on whether it was hit or not
            let img;
            if(this.hit) {
                img = "carHitObj";
            } else {
                img = "carObj";
            }

            //"move" the actual image
            moveIMG(this.x, this.y, this.width, this.height, horizontal, vertical, img);

            //still has to update the values
            this.x += horizontal;
            this.y += vertical;

            //check clash with user
            //if not hit then check if clash, then decrement score and add time of decrement
            //override object from canvas
            //delete object
            //otherwise if no clash then move on
            if(!this.hit && !this.finished) {
                // console.log("no hit calc");
                let clash = clashCalculation(this.x, this.y, this.width, this.height);
                if(clash) {
                    // console.log(this);
                    // console.log(userDim);
                    score -= 1;
                    this.hit = true;
                    this.finished = true;
                    recordEvent("Clash", Date.now());
                    return;
                }
            }

            //if no clash then check if object reached the floor
            if(this.y >= canvasDims.h && !this.finished) {
                // console.log(userDim);
                // console.log(this);
                score += 1;
                recordEvent("Scored Point", Date.now());
                this.finished = true;
            }
        }
    }

    //move img in the game
    function moveIMG(x, y, width, height, horizontal, vertical, imgID) {
        //get the image
        const img = document.getElementById(imgID);

        //clear current canvas of current object
        canvasContext.fillRect(x, y, width, height);

        //now draw the image based on the move specified in the values
        //x and y is on the top left. positive horizontal is right. positive vertical is down
        canvasContext.drawImage(img, x + horizontal, y + vertical, width, height);
    }

    function createObj() {
        for(let i = 0; i < objMiniGameSimulation.length; i++) {
            for(let j = 0; j < objMiniGameSimulation[i].length; j++) {
                if(objMiniGameSimulation[i][j] instanceof Obj) {
                    objMiniGameSimulation[i][j].y = objMiniGameSimulation[i][j].originalY;
                } else if(objMiniGameSimulation[i][j] === 1) {
                    objMiniGameSimulation[i][j] = new Obj(canvasDims.h/heightSpaces, canvasDims.w/widthSpaces, canvasDims.w/widthSpaces*j, -canvasDims.h/heightSpaces*i*2);
                }
            }
        }
    }

    //onMount function
    //Date.now into times for starting time of simulation
    onMount(() => {
        // console.log("inside onMount function")
        drawCanvas();

        // create objects
        createObj();

        // done
        console.log("done");
    });

    let interval = () => {
        for(let i = activeRow; i < objMiniGameSimulation.length; i++) {
            for(let j = 0; j < objMiniGameSimulation[i].length; j++) {
                // console.log(objMiniGameSimulation[i][j]);
                if(objMiniGameSimulation[i][j] instanceof Obj) {
                    objMiniGameSimulation[i][j].move(0, canvasDims.h/heightSpaces);
                    if(objMiniGameSimulation[i][j].finished === true) {
                        activeRow = i;

                    }
                }
            }
            if(activeRow === objMiniGameSimulation.length-1) {
                activeRow = 0;
                clearInterval(intervalID);
                createObj();
                intervalID = setInterval(interval, 1000);
            }
        }
    }

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
        userDim.currX = (canvasDims.w / 2) - (userDim.w/2);
        userDim.currY = (canvasDims.h) - (userDim.h);
        canvasContext.drawImage(img, userDim.currX, userDim.currY, userDim.w, userDim.h);
    }

    let start = () => {
        recordEvent("Started Game At", Date.now());
        intervalID = setInterval(interval, 1000);
        document.getElementById("game").removeAttribute("hidden");
        document.getElementById("startButton").remove();
    }
</script>

<style>
    .minigame-container {
        height: 100%;
        width: 100%;
        margin: auto;
    }
</style>

<div class="minigame-container">

    <!-- Start the simulation button -->
    <!-- [FIXME] This start button should be removed in favor of an all-encompassing simulation start button -->
    <button on:click={start} id="startButton">Start the MiniGame</button>

    <!-- img to be used as the main user in the simulation in the canvas -->
    <img on:load={drawIm} id="car" hidden src="img/car.png" width="0px" height="0px" alt="">
    <img id="carObj" hidden src="img/objcar.png" width="0px" height="0px" alt="">
    <img id="carHitObj" hidden src="img/hitcar.png" width="0px" height="0px" alt="">

    <!-- the canvas element -->
    <canvas
            hidden
            id="game"
            width={canvasDims.w}
            height={canvasDims.h}></canvas>
    <!-- on:mousemove={start}  -->
    <p>Score: {score}</p>
</div>
