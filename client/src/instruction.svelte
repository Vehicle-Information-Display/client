<script>
    export let instruction = {
		"status": "on"
    }

    document.addEventListener("keydown", function(event) {
        if (event.keyCode == 49) { //TURN LEFT
            document.getElementById("instr1").style.display = "block";
            document.getElementById("instr2").style.display = "none";
            document.getElementById("instr3").style.display = "none";
            document.addEventListener("keydown", function(event1) {
                if (document.getElementById("instr1").style.display == "block") {
                    if(event1.keyCode == 65 || event1.keyCode == 37){
                        console.log(document.getElementById("instr1").innerHTML);
                        console.log("Pressed A");
                    }
                }
            });
        }
        if (event.keyCode == 50) { //TURN RIGHT
            document.getElementById("instr1").style.display = "none";
            document.getElementById("instr2").style.display = "block";
            document.getElementById("instr3").style.display = "none";
            document.addEventListener("keydown", function(event1) {
                if (document.getElementById("instr2").style.display == "block") {
                    if(event1.keyCode == 68 || event1.keyCode == 39){
                        console.log(document.getElementById("instr2").innerHTML);
                        console.log("Pressed D");
                    }
                }
            });
        }
        if (event.keyCode == 51) { //SLOW DOWN
            document.getElementById("instr1").style.display = "none";
            document.getElementById("instr2").style.display = "none";
            document.getElementById("instr3").style.display = "block";
            document.addEventListener("keydown", function(event1) {
                if (document.getElementById("instr3").style.display == "block") {
                    if(event1.keyCode == 83 || event1.keyCode == 40){
                        console.log(document.getElementById("instr3").innerHTML);
                        console.log("Pressed S");
                    }
                }
            });
        }
    });

</script>

<style>

    .instruction-wrapper {
        text-align: center;
    }

    fontSize {
        font-size: 3vh;
    }
</style>

<div class="instruction-wrapper">
    {#if instruction.status == "on"}
    <!-- <fontSize id="instr" style="display: none;">THIS IS THE INSTRUCTION AREA 5%</fontSize> -->
    <fontSize id="instr1" style="display: none;">TURN LEFT</fontSize>
    <fontSize id="instr2" style="display: none;">TURN RIGHT</fontSize>
    <fontSize id="instr3" style="display: none;">SLOW DOWN</fontSize>
    {/if}
</div>