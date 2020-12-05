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
    import SteeringWheel from "./SteeringWheel.svelte";
    import SeatWC from "./SeatWarmer.svelte";
    import Outer from "./Outer.svelte";
    import FuelTape from './FuelTape.svelte';

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
        "value": values.rpm / 200
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
    .sitAware-container {
        grid-area: sitAware;
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
            "rpm symbols sitAware dNav"
            "rpm symbols sitAware dNav";
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
        grid-template-columns: 20% 10% 55% 8% 7%;
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
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 8000 4500"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xml:space="preserve"
                    xmlns:serif="http://www.serif.com/"
                    style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                    <g transform="matrix(4.16667,0,0,4.16667,0,0)">
                        <g transform="matrix(1,0,0,1,9.51171,69.9184)">
                            <g transform="matrix(1,0,0,1,35.8199,-45.4795)">
                                <g
                                    transform="matrix(690.027,0,0,690.027,328.158,761.181)">
                                    <path
                                        d="M0.051,-0.712L0.456,-0.712L0.456,-0.61L0.215,-0L0.101,-0L0.342,-0.61L0.153,-0.61L0.153,-0.507L0.051,-0.507L0.051,-0.712Z"
                                        style="fill-rule:nonzero;" />
                                </g>
                                <g
                                    transform="matrix(690.027,0,0,690.027,659.357,761.181)">
                                    <path
                                        d="M0.34,-0.507C0.338,-0.578 0.305,-0.614 0.24,-0.616C0.175,-0.614 0.141,-0.578 0.14,-0.507L0.14,-0.205C0.141,-0.133 0.175,-0.097 0.24,-0.096C0.305,-0.097 0.338,-0.133 0.34,-0.205L0.34,-0.507ZM0.038,-0.513C0.039,-0.579 0.06,-0.63 0.101,-0.665C0.14,-0.7 0.186,-0.718 0.24,-0.718C0.295,-0.718 0.342,-0.7 0.381,-0.665C0.42,-0.63 0.441,-0.579 0.442,-0.513L0.442,-0.199C0.441,-0.134 0.42,-0.083 0.381,-0.048C0.342,-0.013 0.295,0.005 0.24,0.006C0.186,0.005 0.14,-0.013 0.101,-0.048C0.06,-0.083 0.039,-0.134 0.038,-0.199L0.038,-0.513Z"
                                        style="fill-rule:nonzero;" />
                                </g>
                            </g>
                            <g
                                transform="matrix(0.346624,0,0,0.346624,928.186,455.901)">
                                <g
                                    transform="matrix(690.027,0,0,690.027,328.158,761.181)">
                                    <path
                                        d="M0.075,-0.712L0.177,-0.712L0.381,-0.248L0.581,-0.712L0.683,-0.712L0.683,-0L0.575,-0L0.575,-0.444L0.573,-0.444L0.424,-0.102L0.334,-0.102L0.185,-0.444L0.183,-0.444L0.183,-0L0.075,-0L0.075,-0.712Z"
                                        style="fill-rule:nonzero;" />
                                </g>
                                <g
                                    transform="matrix(690.027,0,0,690.027,851.069,761.181)">
                                    <path
                                        d="M0.183,-0.38L0.343,-0.38C0.383,-0.381 0.413,-0.393 0.433,-0.417C0.452,-0.44 0.462,-0.466 0.462,-0.495C0.462,-0.519 0.458,-0.539 0.45,-0.555C0.442,-0.57 0.431,-0.581 0.416,-0.59C0.394,-0.604 0.368,-0.611 0.339,-0.61L0.183,-0.61L0.183,-0.38ZM0.075,-0.712L0.333,-0.712C0.361,-0.712 0.388,-0.709 0.414,-0.704C0.44,-0.697 0.466,-0.683 0.493,-0.662C0.516,-0.646 0.534,-0.623 0.548,-0.594C0.563,-0.565 0.57,-0.531 0.57,-0.492C0.57,-0.439 0.551,-0.391 0.514,-0.348C0.476,-0.303 0.42,-0.279 0.347,-0.278L0.183,-0.278L0.183,-0L0.075,-0L0.075,-0.712Z"
                                        style="fill-rule:nonzero;" />
                                </g>
                                <g
                                    transform="matrix(690.027,0,0,690.027,1260.1,761.181)">
                                    <path
                                        d="M0.465,-0.311L0.183,-0.311L0.183,-0L0.075,-0L0.075,-0.712L0.183,-0.712L0.183,-0.407L0.465,-0.407L0.465,-0.712L0.573,-0.712L0.573,-0L0.465,-0L0.465,-0.311Z"
                                        style="fill-rule:nonzero;" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div class="sitAware-container">
                <fontSize>SA</fontSize>
            </div>
            <div class="dNav-container">
                <fontSize>NAV</fontSize>
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
            <fontSize>Nav</fontSize><br />
            <Outer on:message={handleComponentEvent} />
        </div>
        <div class="music-container">
            <div class="musicButtons-container">
                <MusicControls bind:mC={musicControls} />
            </div>
            <div class="musicType-container">SONG DETAILS......
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
