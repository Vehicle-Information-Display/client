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
                if (event1.keyCode == 65) {
                    console.log("Pressed A");
                }
                else {
                    console.log("Didn't Press A");
                }
            });
        }
        if (event.keyCode == 50) { //TURN RIGHT
            document.getElementById("instr1").style.display = "none";
            document.getElementById("instr2").style.display = "block";
            document.getElementById("instr3").style.display = "none";
            setTimeout(function(){
                alert("Press D");
            }, 250);
        }
        if (event.keyCode == 51) { //SLOW DOWN
            document.getElementById("instr1").style.display = "none";
            document.getElementById("instr2").style.display = "none";
            document.getElementById("instr3").style.display = "block";
            setTimeout(function(){
                alert("Press S");
            }, 250);
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