<script>
    //when mounted then do stuff function
    import { onMount, onDestroy, createEventDispatcher } from "svelte";

    // Import Current Scenario Information Store
    import { simulationScenarioStore } from "./stores";

    // Create event dispatcher
    const dispatch = createEventDispatcher();

    /* Get properties (all) from parent component
     * Note: For external message passing only
     */
    export let props = {}

    // Get simulation-specific data from the global current-scenario store
    let blockData;
    const unsubScenarioData = simulationScenarioStore.subscribe(value => {
        if (value !== undefined && value !== null) {
            blockData = value.minigameBlocks;
        }
    });
    onDestroy(unsubScenarioData);   // Avoid a memory leak

    // Allow parent components to call this component's event handler
    export function handleMessage(message) {
        // console.log("Minigame received message: ");
        // console.log(message);

        /* Handle Keydown event
         * [FIXME] Shouldn't be able to move while the simulation isn't going!
         * */
        if (message !== undefined &&
            message.name !== undefined &&
            message.name === "keydown") {

            // Get the value of the pressed key
            let key = message.payload.keyID;

            // Debug log
            // console.debug("[DEBUG] Got keydown event with: " + key);

            // Handle different key events
            if (key === 'd') {
                console.debug("[DEBUG] Moving Right");
                if (userDim.currX + canvasDims.w / widthSpaces < canvasDims.w - canvasDims.w / widthSpaces) {
                    moveIMG(userDim.currX, userDim.currY, userDim.w, userDim.h, canvasDims.w / widthSpaces, 0, "car");
                    userDim.currX += canvasDims.w / widthSpaces;
                    // console.log(userDim.currX);
                }
                checkClashFromUser();

                // Emit message that the vehicle has moved to the right
                dispatch('message', {
                    "timestamp": Date.now(),
                    "name": "vehicleright",
                    "category": "minigameevent",
                    "intendedTarget": "simulation",
                    "tags": ["vehicleMotion"],
                    "payload": {
                        "direction": "right"
                    }
                });
            }

            else if (key === 'a') {
                console.debug("[DEBUG] Moving Left");
                if (userDim.currX - canvasDims.w / widthSpaces > 0) {
                    moveIMG(userDim.currX, userDim.currY, userDim.w, userDim.h, -canvasDims.w / widthSpaces, 0, "car");
                    userDim.currX += -canvasDims.w / widthSpaces;
                    // console.log(userDim.currX);
                }
                checkClashFromUser();

                // Emit message that the vehicle has moved to the left
                dispatch('message', {
                    "timestamp": Date.now(),
                    "name": "vehicleleft",
                    "category": "minigameevent",
                    "intendedTarget": "simulation",
                    "tags": ["vehicleMotion"],
                    "payload": {
                        "direction": "left"
                    }
                });
            }
        }
    }

    /* Allow global simulation tick to control minigame time
     * Note: Tick should only start being called once the simulation
     * has started! Therefore, no start check is necessary.
     */
    export function tick(globalTickTime) {
        // Un-hide the simulation
        // [FIXME] This should probably be removed so the MiniGame window is always visible
        // [FIXME] This should also probably be handled by an event handler as it should only be called once!
        document.getElementById("game").removeAttribute("hidden");

        // Call interval function
        interval();
    }

    //canvas stuff for minigame
    let canvas; //the canvas object
    let canvasContext; //the canvas context object
    let canvasDims = { //canvas dimensions
        w: props.canvasDimensions.width,
        h: props.canvasDimensions.height
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
    let objMiniGameSimulation = blockData;
    let activeRow = 0;

    let intervalID;

    //simulation score and times variables
    let times = []; //record the times of events. first one is simulation start
    let score = 0; //score of the minigame //each time it is changed add it to the times array

    //record the time event and print it out
    function recordEvent(eventN, time, payload=null) {
        times.push({
            "Event Name": eventN,
            "Time": time
        });

        /* Emit message that the vehicle has moved to the left
         * Note: This basically treats the recordEvent function as a wrapper/shim for message dispatching
         */
        dispatch('message', {
            "timestamp": time,
            "name": eventN,
            "category": "minigameevent",
            "intendedTarget": null,
            "tags": [],
            "payload": payload
        });
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
                        recordEvent("vehicleClash", Date.now(), {"score": score.valueOf()});
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
                    recordEvent("vehicleClash", Date.now(), {"score": score.valueOf()});
                    return;
                }
            }

            //if no clash then check if object reached the floor
            if(this.y >= canvasDims.h && !this.finished) {
                // console.log(userDim);
                // console.log(this);
                score += 1;
                recordEvent("vehicleScore", Date.now(), {"score": score.valueOf()});
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
</script>

<style>
    .minigame-container {
        height: 100%;
        width: 100%;
        margin: auto;
    }
</style>

<div class="minigame-container">
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
