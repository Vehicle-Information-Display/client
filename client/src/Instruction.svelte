<script>
    import { afterUpdate } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';

    export let props = {
		"display": undefined,
        "currentInstruction": undefined
    }

    // Cache for last instruction for later reference
    let lastInstruction;

    // Set up animations
    const duration = 800;  // Default animation duration (with default value so CSS rule isn't dropped by browser)

    const colorTween = tweened(255, {
        duration: duration/2,
        easing: cubicOut
    });

    // Run every time a new instruction is passed
    function newInstruction() {
        // Check if the instruction is new
        if (props.currentInstruction != lastInstruction) {
            // Change background color to red by setting these to 0
            const original = $colorTween;
            $colorTween = 0;

            // Change back to original
            setTimeout(() => {
                $colorTween = original;
            }, duration / 2);
        }
    }

    // Handle changes after updates
    afterUpdate(() => {
        // If the instruction is new
        if (lastInstruction != props.currentInstruction) {
            // Call new instruction handler
            newInstruction();

            // Update the last updated instruction
            lastInstruction = props.currentInstruction
        }
    });

    // document.addEventListener("keydown", function(event) {
    //     if (event.keyCode == 49) { //TURN LEFT
    //         document.getElementById("instr1").style.display = "block";
    //         document.getElementById("instr2").style.display = "none";
    //         document.getElementById("instr3").style.display = "none";
    //         document.addEventListener("keydown", function(event1) {
    //             if (document.getElementById("instr1").style.display == "block") {
    //                 if(event1.keyCode == 65 || event1.keyCode == 37){
    //                     console.log(document.getElementById("instr1").innerHTML);
    //                     console.log("Pressed A");
    //                 }
    //             }
    //         });
    //     }
    //     if (event.keyCode == 50) { //TURN RIGHT
    //         document.getElementById("instr1").style.display = "none";
    //         document.getElementById("instr2").style.display = "block";
    //         document.getElementById("instr3").style.display = "none";
    //         document.addEventListener("keydown", function(event1) {
    //             if (document.getElementById("instr2").style.display == "block") {
    //                 if(event1.keyCode == 68 || event1.keyCode == 39){
    //                     console.log(document.getElementById("instr2").innerHTML);
    //                     console.log("Pressed D");
    //                 }
    //             }
    //         });
    //     }
    //     if (event.keyCode == 51) { //SLOW DOWN
    //         document.getElementById("instr1").style.display = "none";
    //         document.getElementById("instr2").style.display = "none";
    //         document.getElementById("instr3").style.display = "block";
    //         document.addEventListener("keydown", function(event1) {
    //             if (document.getElementById("instr3").style.display == "block") {
    //                 if(event1.keyCode == 83 || event1.keyCode == 40){
    //                     console.log(document.getElementById("instr3").innerHTML);
    //                     console.log("Pressed S");
    //                 }
    //             }
    //         });
    //     }
    // });

</script>

<style>
    .instruction-wrapper {
        text-align: center;
        height: 10vw;
        width: 100%;
        font-size: 3vh;
    }
</style>

<div
        class="instruction-wrapper"
        style="background-color: rgb(255, {$colorTween}, {$colorTween});">
    <b>Current Instruction: </b>
    {#if props.display}
        {props.currentInstruction}
    {:else}
        None
    {/if}
</div>