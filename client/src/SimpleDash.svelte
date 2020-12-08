<script>
    import HalfGauge from "./HalfGauge.svelte";
    import SimpleGauge from "./SimpleGauge.svelte";
    import Clock from "./Clocks.svelte";
    import HazardLights from "./HazardLights.svelte";
    import TackySun from "./TackySun.svelte";
    import ClimateControl from "./ClimateControl.svelte";
    import CogWheel from "./Cogwheel.svelte";
    import Temperature from "./TempModule.svelte";
    import MusicControls from "./MusicControls.svelte";
    import MusicScreen from "./musicScreen.svelte";
    import SteeringWheel from "./SteeringWheel.svelte";
    import SeatWC from "./SeatWarmer.svelte";
    import Outer from "./Outer.svelte";
    import FuelTape from './FuelTape.svelte';
    import SimpleSpeedometer from './SimpleSpeedometer.svelte';

    export let values = {
        speed: 0,
        rpm: 0,
        wheelRotation: 0,
        seatWarmerLeft: "cool",
        seatWarmerRight: "cool",
        hazardLights: false,
    };

    export function handleMessage(message) {
        // [TODO] Implement message handler in SimpleDash
    }

    let speedometerProps = {};
    // let tachometerProps = {};
    // let testingProps = {};
    // let rpmProps = {};
    let wheelRotation = {};
    let seatWarmerLeft = {};
    let seatWarmerRight = {};
    let hazardLights = {};

    let tackySun = { status: "on" };
    let climateControl = { status: "on" };
    let cogWheel = { status: "on" };
    let musicControls = { status: "on" };

    $: speedometerProps = {
        name: "Speedometer",
        value: values.speed / 2,
    };

    $:tachometerProps = {
        "name": "Tachometer",
        "value": values.engineRPM / 200
    }

    // $: rpmProps = {
    //     name: "Tachometer",
    //     value: values.rpm / 200,
    // };

    $: wheelRotation = {
        status: "on",
        wheelRotation: values.wheelRotation,
    };

    $: seatWarmerLeft = {
        name: "seatWarmerLeft",
        status: values.seatWarmerLeft,
    };

    $: seatWarmerRight = {
        name: "seatWarmerRight",
        status: values.seatWarmerRight,
    };

    $: hazardLights = {
        status: values.hazardLights,
    };

    function handleComponentEvent(event) {
        alert(event.detail.text);
    }
</script>

<style>
    fontSize {
        font-size: 2vh;
        word-wrap: break-word;
    }

    /* wheel screen element */
    .textAlert-container {
        grid-area: textAlert;
        border: solid black;
        border-top-left-radius: 150px;
        border-top-right-radius: 150px;
        background-color: white;
    }

    /* wheel screen element */
    .rpm-container {
        grid-area: rpm;
        border: solid black;
        border-bottom-left-radius: 25px;
        background-color: white;
    }

    /* wheel screen element */
    .symbols-container {
        z-index: 1;
        height: 100%;
        width: 100%;
        word-wrap: break-word;
        grid-area: symbols;
        /* border: solid black;
        border-radius: 10px; */
        background-color: black;
    }

    /* wheel screen element */
    .mph-container {
        grid-area: mph;
        border: solid black;
        border-radius: 10px;
        background-color: white;
    }

    /* wheel screen element */
    .dNav-container {
        grid-area: dNav;
        border: solid black;
        border-bottom-right-radius: 25px;
        background-color: white;
    }

    /* wheel area element */
    .behindWheelScreen-container {
        /* border: solid white; */
        background-color: black;
        border-radius: 20px;
        text-align: center;
        display: grid;
        grid-area: screen;
        grid-template-columns: 24% 6% 35% 35%;
        grid-template-rows: 13% 22% 32.5% 32.5%;
        grid-template-areas:
            "textAlert textAlert textAlert textAlert"
            "rpm symbols mph dNav"
            "rpm symbols mph dNav"
            "rpm symbols mph dNav";
        margin: auto;
        width: 95%;
        height: auto;
    }

    /* wheel area element */
    .wheel-container {
        z-index: 100;  /* Wheel should be in front of everything */
        grid-area: wheel;
        text-align: center;
        /* border: solid black;
        border-radius: 25px; */
    }

    .empty-container {
        grid-area: empty;
        /* border: solid black;
        border-radius: 25px; */
    }

    .blankSpace1-container {
        grid-area: blank1;
        /* border: solid black;
        border-radius: 25px; */
    }

    .blankSpace2-container {
        grid-area: blank2;
        /* border: solid black;
        border-radius: 25px; */
    }

    /* all dash element */
    .wheelArea-container {
        /* border: solid black; */
        border-radius: 25px;
        display: flex;
        flex-direction: column;
    }

    /* options.info element */
    .mySettings-container {
        grid-area: mySettings;
        background-color: black;
        border-top-left-radius: 25px;
        text-align: center;
        padding-left: 20px;
        /* border-radius: 25px; */
    }

    /* options.info element */
    .myTime-container {
        grid-area: myTime;
        background-color: black;
        text-align: center;
        /* border-radius: 25px; */
    }

    /* options.info element */
    .myWeather-container {
        grid-area: myWeather;
        background-color: black;
        text-align: center;
        /* border-radius: 25px; */
    }

    /* options.info element */
    .myTemperature-container {
        grid-area: myTemperature;
        border-top-right-radius: 25px;
        background-color: black;
        text-align: center;
        /* border-radius: 25px; */
    }

    /* options.info element */
    .hazards-container {
        grid-area: hazards;
        background-color: black;
    }

    /* all dash element */
    .optionsInfo-container {
        text-align: center;
        display: grid;
        /* border: solid blue
        border-radius: 25px; */
        grid-area: optionsInfo;
        grid-auto-flow: column;
        grid-template-columns: 20% 10% 50% 9% 6%;
        grid-template-rows: 100%;
        grid-template-areas: "mySettings hazards myTime myWeather myTemperature";
    }

    /* all dash element */
    .nav-container {
        grid-area: nav;
        border: solid black;
        border-radius: 25px;
        background-color: white;
    }

    .musicButtons-container {
        grid-area: musicButtons;
        /* border: solid black; */
        border-radius: 25px;
        background-color: dodgerblue;
        border-color: darkslategray;
        border-radius: 25px;
    }

    .musicType-container {
        grid-area: type;
        border-bottom: solid black;
        /* border: solid black; */
        border-radius: 25px;
        background-color: aqua;
        border-color: darkslategray;
        border-radius: 25px;
    }

    /* all dash element */
    .music-container {
        display: grid;
        grid-area: music;
        /* border: solid black; */
        border-radius: 25px;
        /* background-color: white; */
        grid-template-columns: 20% 20% 20% 20% 20%;
        grid-template-rows: 38% 38% 24%;
        grid-template-areas:
            "type type type type type"
            "type type type type type"
            "musicButtons musicButtons musicButtons musicButtons musicButtons";
    }

    .leftSeatOption-container {
        grid-area: leftSeat;
        border-radius: 25px;
        border: solid black;
        background-color: white;
    }
    .rightSeatOption-container {
        grid-area: rightSeat;
        border-radius: 25px;
        border: solid black;
        background-color: white;
    }

    .climateChange-container {
        grid-area: climateChange;
        border-radius: 25px;
        border: solid black;
        background-color: white;
        text-align: center;
    }

    /* all dash element */
    .climateControl-container {
        display: grid;
        grid-area: climateControl;
        border: solid black;
        border-radius: 25px;
        background-color: black;
        grid-template-columns: 33% 34% 33%;
        grid-template-rows: 100%;
        grid-template-areas: "leftSeat climateChange rightSeat";
    }

    .gap-container {
        grid-area: gap;
        background-color: darkslategray;
        /* border-top: solid black; */
        /* border-color: darkslategray; */
        /* border-radius: 25px; */
    }

    .entertainment-container {
        z-index: 10;
        text-align: center;
        border: 4px solid silver;
        background-color: black;
        border-radius: 25px;
        grid-area: entertainment;
        display: grid;
        grid-template-columns: 35% 35% 30%;
        grid-template-rows: 15% 35% 25% 25%;
        grid-template-areas:
            "optionsInfo optionsInfo optionsInfo"
            "nav music music"
            "nav music music"
            "nav climateControl climateControl";
    }

    .allDash-container {
        text-align: center;
        display: grid;
        grid-template-columns: 35.5% 19.5% 45%;
        grid-template-rows: auto;
        grid-template-areas: "wheelArea gap entertainment";
    }
</style>

<div class="allDash-container">
    <div class="wheelArea-container">
        <div class="behindWheelScreen-container">
            <div class="textAlert-container">{values.alertBar}</div>
            <div class="rpm-container">
                <fontSize>RPM</fontSize>
                <SimpleGauge bind:props={tachometerProps}/>
            </div>
            <div class="symbols-container">
                <FuelTape />
            </div>
            <div class="mph-container">
<!--                <div style="font-weight:900; font-size:72px; margin-top:15%" id="x"> </div>-->
                <SimpleSpeedometer bind:speed={values.speed} />
            </div>
            <div class="dNav-container">
                <img src="img/horNav.PNG" width="100%" height="100%" alt="">
            </div>
        </div>
        <div class="wheel-container">
            <SteeringWheel bind:sW={wheelRotation} />
        </div>
    </div>
    <div class="entertainment-container">
        <div class="optionsInfo-container">
            <div class="mySettings-container">
                <CogWheel bind:cW={cogWheel} />
            </div>
            <div class="hazards-container">
                <HazardLights bind:hL={hazardLights} />
            </div>
            <div class="myTime-container">
                <!-- <p style="color:white">Time</p> -->
                <Clock />
            </div>
            <div class="myWeather-container">
                <TackySun bind:tS={tackySun} />
            </div>
            <div class="myTemperature-container">
                <fontSize>
                    <!-- <p style="color:white">Temperature</p> -->
                    <Temperature />
                </fontSize>
            </div>
        </div>
        <div class="nav-container">
            <img src="img/vertNav.PNG" width="100%" height="100%" alt="">
        </div>
        <div class="music-container">
            <div class="musicButtons-container">
                <MusicControls bind:mC={musicControls} />
            </div>
            <div class="musicType-container">
                <!-- SONG DETAILS...... -->
                <MusicScreen/>
            </div>
            
        </div>
        <div class="climateControl-container">
            <div class="leftSeatOption-container">
                <SeatWC bind:seatWC={seatWarmerLeft} />
            </div>
            <div class="climateChange-container">
                <ClimateControl bind:cC={climateControl} />
            </div>
            <div class="rightSeatOption-container">
                <SeatWC bind:seatWC={seatWarmerRight} />
            </div>
        </div>
    </div>
    <div class="gap-container" />
</div>

<!-- <SimpleGauge bind:props={speedometerProps} /> -->
<!-- <SimpleGauge bind:props={tachometerProps}/>
<!-- <Clock /> -->
<!-- <HazardLights bind:hL={hazardLights} /> -->
